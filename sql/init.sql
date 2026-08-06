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


-- users table
create table users (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    is_active boolean default TRUE,
    profile_data JSONB
);

-- profiles table
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY,
    phone VARCHAR(20),
    salary NUMERIC(10,2),
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- courses table
create table courses (
    id serial primary key,
    title varchar(100) not null
);

-- student_courses table (Junction table with composite primary key)
create table student_courses (
    student_id int,
    course_id int,
    enrolled_date date default CURRENT_DATE,
    
    primary key (student_id, course_id),
    foreign key (student_id) references students(id) on delete cascade,
    foreign key (course_id) references courses(id) on delete cascade 
);

-- orders table
create table orders (
    order_id int,
    product_id int,
    primary key (order_id, product_id)
);

-- create shipments table
create table shipments (
    shipment_id serial primary key,
    order_id int,
    product_id int,
    tracking_number text,
    foreign key (order_id, product_id) references orders(order_id, product_id)
);


-- create employees table
create table employees (
    id serial primary key,
    name text not null,
    manager_id int,
    foreign key (manager_id) references employees(id)
);


-- creates accounts table
create table accounts (
    id serial primary key,
    name text not null,
    manager_id int , 
    foreign key (manager_id) references employees(id)
)









