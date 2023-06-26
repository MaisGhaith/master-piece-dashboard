CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
    deleted boolean DEFAULT false,
  image text NOT NULL
);



CREATE TABLE choices (
  id SERIAL PRIMARY KEY,
  choice VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  deleted BOOLEAN DEFAULT false,
  service_id INTEGER REFERENCES services(id) ON DELETE CASCADE
);

