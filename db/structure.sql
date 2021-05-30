CREATE TABLE Users (
  id serial,
  username varchar(31),
  phone varchar(31),
  first_name varchar(31) NOT NULL,
  last_name varchar(31),
  email varchar(31),
  password varchar,
  orders_count integer default 0,
  role varchar(31) default 'user'
);
ALTER TABLE
  Users
ADD
  CONSTRAINT pk_users_id PRIMARY KEY (id);
CREATE UNIQUE INDEX ak_users_username ON Users (username);
CREATE UNIQUE INDEX ak_users_email ON Users (email);
CREATE UNIQUE INDEX ak_users_phone ON Users (phone);

CREATE TABLE User_Address (
  user_id integer NOT NULL,
  city varchar(31),
  street varchar(31),
  house varchar(31),
  door varchar(31)
);
ALTER TABLE
  User_Address
ADD
  CONSTRAINT pk_user_address_user_id PRIMARY KEY (user_id),
ADD
  CONSTRAINT fk_User_Address_user_id FOREIGN KEY (user_id)
  REFERENCES Users (id) ON DELETE CASCADE;

CREATE TABLE Orders (
  id serial,
  user_id integer,
  customer_name varchar(31),
  customer_phone varchar(31),
  order_date date NOT NULL default current_date,
  order_price float NOT NULL,
  status varchar(31) default 'pending'
);
ALTER TABLE
  Orders
ADD
  CONSTRAINT fk_Orders_user_id FOREIGN KEY (user_id)
  REFERENCES Users (id) ON DELETE CASCADE,
ADD
  CONSTRAINT pk_orders_id PRIMARY KEY (id);
CREATE INDEX ak_orders_user_id ON Orders (user_id);

CREATE TABLE MenuItems (
  id serial,
  name varchar(31) NOT NULL,
  category varchar(31) NOT NULL,
  volume varchar(31),
  energy varchar(31),
  weight varchar(31),
  description varchar(255),
  price float NOT NULL,
  available boolean default true,
  orders_count integer default 0
);
ALTER TABLE
  MenuItems
ADD
  CONSTRAINT pk_menuitems_id PRIMARY KEY (id);
CREATE INDEX ak_menuitems_category ON MenuItems (category);
CREATE INDEX ak_menuitems_name ON MenuItems (name);

CREATE TABLE Item_Image (
  item_id integer NOT NULL,
  img varchar(127) NOT NULL,
  img_order integer default 0
);
ALTER TABLE
  Item_Image
ADD
  CONSTRAINT fk_item_image_item_id FOREIGN KEY (item_id)
  REFERENCES MenuItems (id) ON DELETE CASCADE;
CREATE INDEX ak_item_image_item_id ON Item_Image (item_id);

CREATE TABLE User_Item (
  user_id integer NOT NULL,
  item_id integer NOT NULL
);
ALTER TABLE
  User_Item
ADD
  CONSTRAINT fk_User_Item_user_id FOREIGN KEY (user_id)
  REFERENCES Users (id) ON DELETE CASCADE,
ADD
  CONSTRAINT fk_User_Item_item_id FOREIGN KEY (item_id)
  REFERENCES MenuItems (id) ON DELETE CASCADE;
CREATE INDEX ak_user_item_user_id ON User_Item (user_id);

-- CREATE TABLE Ingredients (
--   id serial,
--   name varchar(31) NOT NULL,
--   img_src varchar(127) NOT NULL
-- );
-- CREATE INDEX ak_name ON Ingredients (name);

-- CREATE TABLE Item_Ingredient (
--   item_id integer NOT NULL,
--   ingredient_id integer NOT NULL
-- );
-- ALTER TABLE
--   Item_Ingredient
-- ADD
--   CONSTRAINT fk_Item_Ingredient_item_id FOREIGN KEY (item_id)
--   REFERENCES MenuItems (id) ON DELETE CASCADE;
-- ALTER TABLE
--   Item_Ingredient
-- ADD
--   CONSTRAINT fk_Item_Ingredient_ingredient_id FOREIGN KEY (ingredient_id)
--   REFERENCES Ingredients (id) ON DELETE CASCADE;
-- CREATE INDEX ak_item_id ON Item_Ingredient (item_id);

-- CREATE TABLE Set_Roll (
--   set_id integer NOT NULL,
--   roll_id integer NOT NULL
-- )
-- ALTER TABLE
--   Set_Roll
-- ADD
--   CONSTRAINT fk_Set_Roll_set_id FOREIGN KEY (set_id)
--   REFERENCES MenuItems (id) ON DELETE CASCADE;
-- ALTER TABLE
--   Set_Roll
-- ADD
--   CONSTRAINT fk_Set_Roll_roll_id FOREIGN KEY (roll_id)
--   REFERENCES MenuItems (id) ON DELETE CASCADE;
-- CREATE INDEX ak_set_id ON Set_Roll (set_id);

CREATE TABLE Order_Item (
  order_id integer NOT NULL,
  item_id integer NOT NULL,
  item_count integer default 1
);
ALTER TABLE
  Order_Item
ADD
  CONSTRAINT fk_Order_Item_order_id FOREIGN KEY (order_id)
  REFERENCES Orders (id) ON DELETE CASCADE,
ADD
  CONSTRAINT fk_Order_Item_item_id FOREIGN KEY (item_id)
  REFERENCES MenuItems (id) ON DELETE CASCADE;
CREATE INDEX ak_order_item_order_id ON Order_Item (order_id);

CREATE OR REPLACE FUNCTION getMenu() RETURNS TABLE(
  id integer,
  name varchar(31),
  category varchar(31),
  volume varchar(31),
  energy varchar(31),
  weight varchar(31),
  description varchar(255),
  price float,
  available varchar,
  imgs varchar array
) AS $$
SELECT
  id, name, category, volume, energy, weight, description, price, available, ARRAY_AGG(ii.img ORDER by ii.img_order ASC) as imgs
FROM
  MenuItems AS mi
  LEFT JOIN Item_Image AS ii ON mi.id = ii.item_id
WHERE
  mi.available = true
GROUP BY
  mi.id
ORDER BY
  mi.orders_count ASC;
$$ LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION insertIfActorsIsNotExists(firstName VARCHAR, lastName VARCHAR) RETURNS INTEGER AS $$
-- DECLARE actorId INT;
-- BEGIN
-- SELECT
--   Id INTO actorId
-- FROM
--   Actors
-- WHERE
--   Actors.FirstName = $1
--   AND Actors.LastName = $2;
-- IF NOT FOUND THEN
-- INSERT INTO
--   Actors (FirstName, LastName)
-- VALUES
--   ($1, $2) RETURNING Id INTO STRICT actorId;
-- ELSE RETURN actorId;
-- END IF;
-- RETURN actorId;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION createOrder(title VARCHAR, year SMALLINT, format VARCHAR, actors VARCHAR[]) RETURNS INTEGER AS $$
DECLARE retMovieId INT;
DECLARE retActorId INT;
DECLARE actor VARCHAR;
DECLARE actorName VARCHAR[];
BEGIN
  INSERT INTO Movies (title, releaseyear, format) VALUES ($1,$2,$3) RETURNING id INTO STRICT retMovieId;
  FOREACH actor IN ARRAY actors
  LOOP
    actorName = string_to_array(actor, '');
    SELECT insertIfActorsIsNotExists(actorName[1], COALESCE(actorName[2],' ')) INTO STRICT retActorId;
    INSERT INTO ActorMovie (MovieId, ActorId) VALUES (retMovieId, retActorId);
  END LOOP;
RETURN retMovieId;
END;
$$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION createUser(Email varchar, Password varchar, Username varchar, Role varchar) RETURNS INT AS $$
-- INSERT INTO
--   Users (Email, Password, Username, Role) VALUES ($1, $2, $3, $4)
-- RETURNING id;
-- $$ LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION createProfile(Email varchar, Password varchar, Username varchar, Role varchar) RETURNS INT AS $$
-- INSERT INTO
--   Users (Email, Password, Username, Role) VALUES ($1, $2, $3, $4)
-- RETURNING id;
-- $$ LANGUAGE SQL;