/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.resumes
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    email CHARACTER VARYING NOT NULL,
    phone CHARACTER VARYING NOT NULL,
    resume CHARACTER VARYING NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);