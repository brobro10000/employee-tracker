INSERT INTO departments (department_name)
VALUES
    ('R&D'),
    ('Retail'),
    ('Executive');

INSERT INTO roles (title,salary,department_id)
VALUES
    ('Lead Researcher', 155500, 1),
    ('Associate Reasearcher', 85999,1),
    ('University Student', 20000,1),
    ('Store Manager', 75000, 2),
    ('Cashier', 30000, 2),
    ('Stock Person', 20000,2),
    ('CEO', 250000, 3),
    ('Secretary', 50000,3),
    ('Mail Person', 25000,3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Gayle', 'Aarens', 1, NULL),
    ('Porcius', 'Arias', 2, 1),
    ('Gul', 'Oliver', 2, 1),
    ('Rameses', 'Cecil', 3, 3),
    ('Tybalt', 'Ferrero', 3, 4),
    ('Sante', 'Beringer', 3, 4),
    ('Magni', 'Radclyffe', 4, NULL),
    ('Gislenus', 'McCrae', 5, 7),
    ('Albena', 'Kahler', 5, 7),
    ('Stiina', 'Piatek', 6, 8),
    ('Nadeem', 'Fierro', 6, 10),
    ('Patricia', 'Pretorius', 6, 10),
    ('Lina', 'Tolkien', 7, NULL),
    ('Valter', 'Vidovic', 8, 13),
    ('Broos', 'Tobias', 8, 13),
    ('Murali', 'Janowski', 9, 15),
    ('Vahit', 'Stasiuk', 9, 15),
    ('Prakash', 'Maric', 9, 15);   
