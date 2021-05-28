CREATE TABLE Users (
  id serial,
  username varchar(31),
  phone varchar(31) NOT NULL,
  first_name varchar(31) NOT NULL,
  last_name varchar(31),
  email varchar(31) NOT NULL,
  password varchar NOT NULL,
  orders_count integer default,
  role varchar(31) NOT NULL,
);
CREATE UNIQUE INDEX ak_username ON Users (username);
CREATE UNIQUE INDEX ak_email ON Users (email);

CREATE TABLE UserAddress (
  user_id integer,
  city varchar(31),
  street varchar(31),
  house varchar(31),
  door varchar(31)
)
ALTER TABLE
  UserAddress
ADD
  CONSTRAINT fk_UserAddress_user_id FOREIGN KEY (user_id)
  REFERENCES Users (id) ON DELETE CASCADE
AND ADD
  CONSTRAINT pk_UserAddress PRIMARY KEY (user_id)


CREATE TABLE Orders (
  id serial,
  user_id integer NOT NULL,
  order_date date NOT NULL default current_date,
  order_price integer NOT NULL
);
ALTER TABLE
  Orders
ADD
  CONSTRAINT fk_Orders_user_id FOREIGN KEY (user_id)
  REFERENCES Users (id) ON DELETE CASCADE;
CREATE INDEX ak_user_id ON Orders (user_id);

CREATE TABLE MenuItems (
  id serial,
  name varchar(31) NOT NULL,
  category varchar(31) NOT NULL,
  img_src varchar(127),
  volume varchar(31) NOT NULL,
  energy varchar(31),
  weight varchar(31),
  description varchar(255),
  price integer NOT NULL,
  orders_count integer default,
);
CREATE INDEX ak_category ON MenuItems (category);
CREATE INDEX ak_name ON MenuItems (name);

CREATE TABLE Ingredients (
  id serial,
  name varchar(31) NOT NULL,
  img_src varchar(127) NOT NULL,
);
CREATE INDEX ak_name ON Ingredients (name);

CREATE TABLE Item_Ingredient (
  item_id integer NOT NULL,
  ingredient_id integer NOT NULL
);
ALTER TABLE
  Item_Ingredient
ADD
  CONSTRAINT fk_Item_Ingredient_item_id FOREIGN KEY (item_id)
  REFERENCES MenuItems (id) ON DELETE CASCADE;
ALTER TABLE
  Item_Ingredient
ADD
  CONSTRAINT fk_Item_Ingredient_ingredient_id FOREIGN KEY (ingredient_id)
  REFERENCES Ingredients (id) ON DELETE CASCADE;
CREATE INDEX ak_item_id ON Item_Ingredient (item_id);

CREATE TABLE Set_Roll (
  set_id integer NOT NULL,
  roll_id integer NOT NULL
)
ALTER TABLE
  Set_Roll
ADD
  CONSTRAINT fk_Set_Roll_set_id FOREIGN KEY (set_id)
  REFERENCES MenuItems (id) ON DELETE CASCADE;
ALTER TABLE
  Set_Roll
ADD
  CONSTRAINT fk_Set_Roll_roll_id FOREIGN KEY (roll_id)
  REFERENCES MenuItems (id) ON DELETE CASCADE;
CREATE INDEX ak_set_id ON Set_Roll (set_id);

CREATE TABLE Order_Item (
  order_id integer NOT NULL,
  item_id integer NOT NULL
);
ALTER TABLE
  Order_Item
ADD
  CONSTRAINT fk_Order_Item_order_id FOREIGN KEY (order_id)
  REFERENCES Order (id) ON DELETE CASCADE;
ALTER TABLE
  Order_Item
ADD
  CONSTRAINT fk_Order_Item_item_id FOREIGN KEY (item_id)
  REFERENCES MenuItems (id) ON DELETE CASCADE;
CREATE INDEX ak_order_id ON Order_Item (order_id);


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

-- CREATE OR REPLACE FUNCTION allMovies() RETURNS TABLE(
--   id int,
--   title varchar,
--   releaseyear smallint,
--   format varchar,
--   stars varchar
-- ) AS $$
-- SELECT
--   m.*, STRING_AGG(a.FirstName || ' ' || a.LastName, ', ') as stars
-- FROM
--   Movies AS m
--   INNER JOIN ActorMovie AS am ON m.Id = am.MovieId
--   INNER JOIN Actors AS a ON a.Id = am.ActorId
-- GROUP BY
--   m.Id
-- ORDER BY
--   m.Id;
-- $$ LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION createMovies(title VARCHAR, year SMALLINT, format VARCHAR, actors VARCHAR[]) RETURNS INTEGER AS $$
-- DECLARE retMovieId INT;
-- DECLARE retActorId INT;
-- DECLARE actor VARCHAR;
-- DECLARE actorName VARCHAR[];
-- BEGIN
--   INSERT INTO Movies (title, releaseyear, format) VALUES ($1,$2,$3) RETURNING id INTO STRICT retMovieId;
--   FOREACH actor IN ARRAY actors
--   LOOP
--     actorName = string_to_array(actor, '');
--     SELECT insertIfActorsIsNotExists(actorName[1], COALESCE(actorName[2],' ')) INTO STRICT retActorId;
--     INSERT INTO ActorMovie (MovieId, ActorId) VALUES (retMovieId, retActorId);
--   END LOOP;
-- RETURN retMovieId;
-- END;
-- $$ LANGUAGE plpgsql;

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