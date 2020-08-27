/*  Execute this file from the command line by typing:
 *    psql postgres < schema.sql
*/

DROP DATABASE IF EXISTS airbnb;

CREATE DATABASE airbnb;

\c airbnb;

CREATE TABLE IF NOT EXISTS residences (
  id SERIAL PRIMARY KEY,
  residence_name varchar(50),
  price INT,
  imageurl varchar(10)
);