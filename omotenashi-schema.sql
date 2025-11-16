CREATE TABLE IF NOT EXISTS users (

id INT AUTO_INCREMENT PRIMARY KEY,

username VARCHAR(100) NOT NULL UNIQUE,

email VARCHAR(255) NOT NULL UNIQUE,

password VARCHAR(255) NOT NULL,

avatar_url TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE IF NOT EXISTS posts (

id INT AUTO_INCREMENT PRIMARY KEY,

user_id INT NOT NULL,

title VARCHAR(255) NOT NULL,

content TEXT NOT NULL,

type ENUM('blog', 'historias_inspiran', 'necesitas_omotenashi') DEFAULT 'blog',

location VARCHAR(255),

image_url TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (user_id) REFERENCES users(id)

);


CREATE TABLE IF NOT EXISTS comments (

id INT AUTO_INCREMENT PRIMARY KEY,

post_id INT NOT NULL,

user_id INT NOT NULL,

content TEXT NOT NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (post_id) REFERENCES posts(id),

FOREIGN KEY (user_id) REFERENCES users(id)

);


CREATE TABLE IF NOT EXISTS likes (

id INT AUTO_INCREMENT PRIMARY KEY,

post_id INT NOT NULL,

user_id INT NOT NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (post_id) REFERENCES posts(id),

FOREIGN KEY (user_id) REFERENCES users(id),

UNIQUE KEY unique_like (post_id, user_id)

);

CREATE TABLE IF NOT EXISTS omotenashi_evaluaciones (

id INT AUTO_INCREMENT PRIMARY KEY,

tipo ENUM('persona', 'empresa') NOT NULL,

nombre VARCHAR(255),

correo VARCHAR(255),

profesion VARCHAR(255),

empresa VARCHAR(255),

correo_empresa VARCHAR(255),

sector VARCHAR(100),

empleados VARCHAR(50),

pais VARCHAR(100),

ciudad VARCHAR(100),

respuestas TEXT,

igo_scores TEXT,

cso DECIMAL(5,2),

leyenda TEXT,

fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- Tabla para los datos del mapa de percepción global

CREATE TABLE IF NOT EXISTS paises_percepcion (

id INT AUTO_INCREMENT PRIMARY KEY,

country_code VARCHAR(10) UNIQUE NOT NULL, -- Código ISO 3166-1 numérico (ej. '170' para Colombia)

country_name VARCHAR(100) NOT NULL,

score DECIMAL(3, 1) NOT NULL, -- Puntuación de percepción (ej. 8.2)

source VARCHAR(255) NOT NULL, -- Fuente del dato (ej. "Twitter: 150 tweets")

data_count INT NOT NULL, -- Cantidad de datos usados para el score (ej. 150)

updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);


-- Insertar algunos datos iniciales para la tabla de paises_percepcion

-- Usamos INSERT IGNORE para no insertar si ya existen registros con el mismo country_code

INSERT IGNORE INTO paises_percepcion (country_code, country_name, score, source, data_count) VALUES

('170', 'Colombia', 8.2, 'Twitter: 150 tweets', 150),

('840', 'United States', 6.5, 'Google Places: 200 reseñas', 200),

('392', 'Japan', 9.0, 'Trustpilot: 50 reseñas', 50),

('076', 'Brazil', 3.5, 'Twitter: 100 tweets', 100),

('250', 'France', 7.8, 'TripAdvisor: 80 reseñas', 80),

('276', 'Germany', 8.5, 'Encuestas Internas: 120 respuestas', 120),

('356', 'India', 5.2, 'Redes Sociales: 300 interacciones', 300),

('724', 'Spain', 7.1, 'Booking.com: 180 opiniones', 180);



-- Tabla para los contadores de estadísticas del sitio

-- Diseñada para tener una única fila con los contadores globales

CREATE TABLE IF NOT EXISTS estadisticas_sitio (

id INT PRIMARY KEY DEFAULT 1, -- Usamos id=1 para asegurar que solo haya una fila

home_page_visits BIGINT DEFAULT 0,

calcula_omotenashi_interactions BIGINT DEFAULT 0,

certificates_delivered BIGINT DEFAULT 0,

last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);


-- Insertar una fila inicial para las estadísticas si no existe

INSERT IGNORE INTO estadisticas_sitio (id, home_page_visits, calcula_omotenashi_interactions, certificates_delivered) VALUES

(1, 1000, 500, 150);


-- Asegurarse de que el ID siempre sea 1 para mantener una única fila

-- Esta restricción ayuda a mantener la integridad de la tabla como un contador global

ALTER TABLE estadisticas_sitio ADD CONSTRAINT single_row_check CHECK (id = 1); 