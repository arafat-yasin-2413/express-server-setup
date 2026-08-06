-- CREATE TABLE users (
--     id INT,
--     name TEXT NOT NULL,
--     email TEXT UNIQUE
-- )

-- INSERT INTO users 
-- (id, name, email) 
-- values (111, 'Naimur', 'naimur@gmail.com')

-- select * from users


-- drop table users


---------------------- class 3 -----------------------------

-- At first creating tables

-- departments table
create table departments (
    id serial primary key,
    name text not null unique
);

-- students table
create table students (
    id serial primary key,
    name text not null,
    email varchar(100) unique,
    age int check (age >= 0),
    department_id int,
    created_at timestamp default NOW(),
    foreign key (department_id) references departments(id) on delete set null on update cascade
);