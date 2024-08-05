CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombreGithub VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    correo VARCHAR(255) NOT NULL
);

