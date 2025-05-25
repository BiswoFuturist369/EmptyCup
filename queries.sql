CREATE TABLE designers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  stars INTEGER NOT NULL,
  description TEXT,
  projects INTEGER,
  years INTEGER,
  price TEXT,
  phone1 TEXT,
  phone2 TEXT
);

INSERT INTO designers (name, stars, description, projects, years, price, phone1, phone2) VALUES
('Epic Designs', 4, 'Passionate team of designers working out of Bangalore with 4 years of experience.', 57, 8, '$$', '+91-984532853', '+91-984532854'),
('Studio D3', 5, 'Boutique design studio specializing in urban interiors.', 43, 6, '$$$', '+91-994532853', '+91-994532854');


