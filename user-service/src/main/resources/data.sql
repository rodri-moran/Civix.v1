INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Admin',
           'Principal',
           'admin@gmail.com',
           '$2a$12$HTTnhnHsMJGmEps6slPoaeoGZKD2u5Tof/hIplXBbNowCacICzHFW', -- hash de admin123
           'ADMIN',
           CURRENT_DATE,
           '3510000000',
           'Calle Falsa 123'
       );

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Rodrigo',
           'Moran',
           'email@gmail.com',
           '$2a$12$g0FLy8DQN.mLvf/D6bfXcOGE/SXE.OrnkFq7vGxc9elpa2C0.dByS',
           'CIUDADANO',
           CURRENT_DATE,
           '3510000000',
           'Calle Falsa 123'
       );

-- CUADRILLAS (RESPONSABLES)

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Juan',
           'Perez',
           'juan.perez@civix.com',
           '$2a$12$g0FLy8DQN.mLvf/D6bfXcOGE/SXE.OrnkFq7vGxc9elpa2C0.dByS', -- mismo hash
           'CUADRILLA',
           CURRENT_DATE,
           '3511111111',
           'Base Municipal'
       );

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Maria',
           'Gomez',
           'maria.gomez@civix.com',
           '$2a$12$g0FLy8DQN.mLvf/D6bfXcOGE/SXE.OrnkFq7vGxc9elpa2C0.dByS',
           'CUADRILLA',
           CURRENT_DATE,
           '3512222222',
           'Base Municipal'
       );

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Carlos',
           'Lopez',
           'carlos.lopez@civix.com',
           '$2a$12$g0FLy8DQN.mLvf/D6bfXcOGE/SXE.OrnkFq7vGxc9elpa2C0.dByS',
           'CUADRILLA',
           CURRENT_DATE,
           '3513333333',
           'Base Municipal'
       );

