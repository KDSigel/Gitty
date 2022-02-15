-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
-- put limit on post characters of 255

DROP TABLE IF EXISTS users, posts CASCADE;

CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL
    );

CREATE TABLE posts(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post VARCHAR(255) NOT NULL
);