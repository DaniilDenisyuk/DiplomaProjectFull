CREATE TABLE Movies (
  Id serial,
  Title varchar(127) NOT NULL,
  ReleaseYear SMALLINT NOT NULL,
  Format varchar(31) NOT NULL
);

ALTER TABLE
  Movies
ADD
  CONSTRAINT pkMovies PRIMARY KEY (Id);

CREATE UNIQUE INDEX akMovies ON Movies (Title, ReleaseYear);

CREATE TABLE Actors (
  Id serial,
  FirstName varchar(127) NOT NULL,
  LastName varchar(127) NOT NULL
);

ALTER TABLE
  Actors
ADD
  CONSTRAINT pkActors PRIMARY KEY (Id);

CREATE UNIQUE INDEX akActors ON Actors (FirstName, LastName);

CREATE TABLE ActorMovie (
  ActorId INTEGER NOT NULL,
  MovieId INTEGER NULL
);

ALTER TABLE
  ActorMovie
ADD
  CONSTRAINT pkActorMovie PRIMARY KEY (MovieId, ActorId);

ALTER TABLE
  ActorMovie
ADD
  CONSTRAINT fkActorMovieMovieId FOREIGN KEY (MovieId) REFERENCES Movies (Id) ON DELETE CASCADE;

ALTER TABLE
  ActorMovie
ADD
  CONSTRAINT fkActorMovieActorId FOREIGN KEY (ActorId) REFERENCES Actors (Id) ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION insertIfActorsIsNotExists(firstName VARCHAR, lastName VARCHAR) RETURNS INTEGER AS $$
DECLARE actorId INT;
BEGIN
SELECT
  Id INTO actorId
FROM
  Actors
WHERE
  Actors.FirstName = $1
  AND Actors.LastName = $2;
IF NOT FOUND THEN
INSERT INTO
  Actors (FirstName, LastName)
VALUES
  ($1, $2) RETURNING Id INTO STRICT actorId;
ELSE RETURN actorId;
END IF;
RETURN actorId;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION removeMovies(id INT) RETURNS INT AS $$
DELETE FROM
  Movies
WHERE
  id = $1
RETURNING id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION allMovies() RETURNS TABLE(
  id int,
  title varchar,
  releaseyear smallint,
  format varchar,
  stars varchar
) AS $$
SELECT
  m.*, STRING_AGG(a.FirstName || ' ' || a.LastName, ', ') as stars
FROM
  Movies AS m
  INNER JOIN ActorMovie AS am ON m.Id = am.MovieId
  INNER JOIN Actors AS a ON a.Id = am.ActorId
GROUP BY
  m.Id
ORDER BY
  m.Id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION createMovies(title VARCHAR, year SMALLINT, format VARCHAR, actors VARCHAR[]) RETURNS INTEGER AS $$
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

CREATE TABLE Users (
  Id serial,
  Email varchar(127),
  Password varchar NOT NULL,
  Username varchar(31),
  Role varchar(31) NOT NULL
);

ALTER TABLE
  Users
ADD
  CONSTRAINT pkUser PRIMARY KEY (Id);

CREATE UNIQUE INDEX akUserName ON Users (UserName);
CREATE UNIQUE INDEX akEmail ON Users (Email);

CREATE TABLE Profile (
  Id serial,
  UserId integer NOT NULL,
  Name varchar(127) NOT NULL,
  Gender varchar(31),
  Birthday varchar(31),
  City varchar(31)
);

ALTER TABLE
  Profile
ADD
  CONSTRAINT pkProfile PRIMARY KEY (Id);

CREATE UNIQUE INDEX akProfile ON Profile (UserId, Name, Gender, Birthday, City);
ALTER TABLE
  Profile
ADD
  CONSTRAINT fkProfileUserId FOREIGN KEY (UserId) REFERENCES Users (Id) ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION createUser(Email varchar, Password varchar, Username varchar, Role varchar) RETURNS INT AS $$
INSERT INTO
  Users (Email, Password, Username, Role) VALUES ($1, $2, $3, $4)
RETURNING id;
$$ LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION createProfile(Email varchar, Password varchar, Username varchar, Role varchar) RETURNS INT AS $$
-- INSERT INTO
--   Users (Email, Password, Username, Role) VALUES ($1, $2, $3, $4)
-- RETURNING id;
-- $$ LANGUAGE SQL;