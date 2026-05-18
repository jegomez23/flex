-- CREATE TABLE reservas_hotel (
--   id             serial PRIMARY KEY,
--   nombre_huesped text NOT NULL,       -- sin nombre no sabemos a quién asignar la habitación
--   email          text NOT NULL,       -- necesario para enviar la confirmación
--   fecha_entrada  timestamptz NOT NULL, -- sin fecha no hay reserva
--   fecha_salida   timestamptz NOT NULL, -- ídem
--   notas          text                  -- opcional: peticiones especiales, alergias... puede ser null
-- );

-- CREATE TABLE tareas (
--   id          serial PRIMARY KEY,
--   titulo      text NOT NULL,
--   completada  boolean NOT NULL DEFAULT false,
--   prioridad   text NOT NULL DEFAULT 'normal',
--   creado_en   timestamptz NOT NULL DEFAULT now()
-- );

-- INSERT INTO tareas (titulo) VALUES ('Estudiar triggers');

-- SELECT * FROM tareas;
-- -- id: 1, titulo: 'Estudiar triggers', completada: false, prioridad: 'normal', creado_en: [hora actual]

-- CREATE TABLE tickets_concierto (
--   id        serial PRIMARY KEY,
--   precio    numeric(8,2) NOT NULL CHECK (precio > 0),
--   categoria text NOT NULL CHECK (categoria IN ('general', 'vip', 'backstage')),
--   cantidad  int NOT NULL DEFAULT 1 CHECK (cantidad BETWEEN 1 AND 10)
-- );

-- Esto falla:

-- CREATE TABLE plazas_parking (
--   id      serial PRIMARY KEY,
--   numero  int NOT NULL,
--   planta  text NOT NULL CHECK (planta IN ('A', 'B', 'C')),
--   ocupada boolean NOT NULL DEFAULT false,
--   UNIQUE (numero, planta)   -- la combinación número+planta no puede repetirse
-- );

-- Esto está bien (misma planta A, distinto número):
-- INSERT INTO plazas_parking (numero, planta) VALUES (1, 'A');
-- INSERT INTO plazas_parking (numero, planta) VALUES (2, 'A');

-- -- Esto también está bien (mismo número, distinta planta):
-- INSERT INTO plazas_parking (numero, planta) VALUES (1, 'B');

-- -- Esto falla (número Y planta iguales):
-- INSERT INTO plazas_parking (numero, planta) VALUES (1, 'A');
-- -- ERROR: duplicate key value violates unique constraint



--   -- En un UPDATE puedes comparar el valor anterior y el nuevo:
-- CREATE OR REPLACE FUNCTION stock_limit()
-- RETURNS trigger
-- LANGUAGE plpgsql
-- AS $$
-- before update
--   IF stock < 0 THEN
--     RAISE exception 'Precio cambiado de % a %', OLD.precio, NEW.precio;
--   END IF;
--   RETURN NEW;
-- END;
-- $$; 
-- INSERT INTO storage.buckets (id, name, public) VALUES
--   ('articulos', 'articulos', true),
--   ('borradores', 'borradores', false);

-- INSERT INTO storage.buckets (id, name, public) VALUES
--   ('salas-vip', 'salas-vip', true);

CREATE EXTENSION IF NOT EXISTS btree_gist;


-- Hay pistas identificadas por número (1, 2, 3…) y tipo ('cubierta' o 'exterior'). Un número de pista solo puede existir una vez.
CREATE TABLE pistas (
  id     serial PRIMARY KEY,
  numero int NOT NULL UNIQUE,
  tipo   text NOT NULL CHECK (tipo IN ('cubierta', 'exterior'))
);

-- Los usuarios tienen nombre, email (único) y un nivel: 'principiante', 'intermedio' o 'avanzado'.

CREATE TABLE usuarios (
  id     serial PRIMARY KEY,
  nombre text NOT NULL,
  email  text NOT NULL UNIQUE,
  nivel  text NOT NULL DEFAULT 'principiante'
         CHECK (nivel IN ('principiante', 'intermedio', 'avanzado'))
);

-- Una reserva tiene usuario, pista, hora de inicio y fin, y estado: 'confirmada' o 'cancelada'.

create table reservas (
  id serial primary key,
  usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  pistas_id int not null references pistas(id),
   inicio     timestamptz NOT NULL,
  fin        timestamptz NOT NULL,
  estado     text NOT NULL DEFAULT 'confirmada'
             CHECK (estado IN ('confirmada', 'cancelada'))
)