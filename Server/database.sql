CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
    deleted boolean DEFAULT false,
  image text NOT NULL
);
