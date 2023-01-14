/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.admin
(
    id SERIAL PRIMARY KEY,
    username CHARACTER VARYING NOT NULL,
    address CHARACTER VARYING,
    authority CHARACTER VARYING NOT NULL,
    phone_no CHARACTER VARYING,
    email CHARACTER VARYING NOT NULL UNIQUE,
    password CHARACTER VARYING NOT NULL,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.upload
(
    id SERIAL PRIMARY KEY,
    file CHARACTER VARYING NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.user
(
    id SERIAL PRIMARY KEY,
    username CHARACTER VARYING NOT NULL,
    address CHARACTER VARYING,
    authority CHARACTER VARYING NOT NULL,
    phone_no CHARACTER VARYING,
    email CHARACTER VARYING NOT NULL UNIQUE,
    password CHARACTER VARYING NOT NULL,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

