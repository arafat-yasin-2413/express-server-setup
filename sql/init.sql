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
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    balance NUMERIC(10, 2) CHECK (balance >= 0)
);
-- drop table accounts;
--- INSERT Operations -------


-- Insert departments
INSERT INTO departments (name) 
VALUES ('CSE'), ('EEE'), ('ME');

SELECT * from departments;


-- Insert Students
INSERT INTO students (name, email, age, department_id)
VALUES 
('John', 'john@gmail.com', 20, 1),
('Alex', 'alex@gmail.com', 21, 1),
('Bob', 'bob@yahoo.com', 26, 2),
('Alice', 'alice@gmail.com', NULL, 2),
('Charlie', 'charlie@gmail.com', 19, NULL);

SELECT * from students;


-- Insert Users & Profiles (One-to-One)
INSERT INTO users (id, name, is_active, profile_data) 
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'David', true, '{"role": "admin", "theme": "dark"}');


INSERT INTO profiles (user_id, phone, salary, bio)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '+8801700000000', 45000.50, 'Software Engineer');



-- Insert Courses & Student Courses (Many-to-Many)
INSERT INTO courses (title) VALUES ('Database Systems'), ('Algorithms'), ('Circuit Analysis');

INSERT INTO student_courses (student_id, course_id) 
VALUES 
(1, 1), -- John -> Database
(1, 2), -- John -> Algorithms
(2, 1), -- Alex -> Database
(3, 3); -- Bob  -> Circuit Analysis


-- Insert Orders & Shipments (Composite Keys)
INSERT INTO orders (order_id, product_id) VALUES (101, 1), (101, 2);

INSERT INTO shipments (order_id, product_id, tracking_number) 
VALUES (101, 1, 'TRK-99001');


-- Insert Employees (Self Relationship)
INSERT INTO employees (name, manager_id) 
VALUES 
('Rahim (CEO)', NULL),
('Karim (Manager)', 1),
('Sajid (Developer)', 2);


-- Insert Accounts (Transaction testing)
INSERT INTO accounts (name, balance) 
VALUES ('Sender', 500.00), ('Receiver', 200.00);

-- Insert Accounts (Transaction testing)
INSERT INTO accounts (name, balance) 
VALUES ('Sender', 500.00), ('Receiver', 200.00);

------- SELECT, UPDATE, DELETE & FILTERING
-- Basic SELECT
SELECT * FROM students;

-- UPDATE
UPDATE students
SET age = 25
WHERE id = 1;

-- DELETE
DELETE FROM students
WHERE id = 5; -- Deletes Charlie

-- Filtering (WHERE & Operators)
SELECT * FROM students WHERE age > 20;

-- AND, OR, NOT, BETWEEN, IN, LIKE, ILIKE, IS NULL
SELECT * FROM students WHERE age BETWEEN 18 AND 25;

SELECT * FROM students WHERE age NOT BETWEEN 18 AND 25;

SELECT * FROM students WHERE name LIKE 'A%';         -- Starts with 'A'

SELECT * FROM students WHERE name LIKE '%x';         -- Ends with 'x'

SELECT * FROM students WHERE name LIKE '%li%';       -- Contains 'li'

SELECT * FROM students WHERE email ILIKE '%GMAIL%';  -- Case insensitive search

SELECT * FROM students WHERE id IN (1, 2, 5);

SELECT * FROM students WHERE id NOT IN (1, 2, 5);

SELECT * FROM students WHERE age IS NULL;

SELECT * FROM students WHERE age IS NOT NULL;



-- SORTING, LIMIT, OFFSET & ALIASES

-- Sorting & Aliases
SELECT 
    name AS student_name, 
    age AS student_age 
FROM students
ORDER BY age DESC;

-- Limit & Offset
SELECT * FROM students
ORDER BY id ASC
LIMIT 2 OFFSET 1;


-- AGGREGATE FUNCTIONS, GROUP BY & HAVING

-- Aggregate Functions
SELECT 
    COUNT(*) AS total_students,
    AVG(age) AS average_age,
    MAX(age) AS max_age,
    MIN(age) AS min_age,
    SUM(age) AS sum_of_ages
FROM students;

-- GROUP BY & HAVING
SELECT 
    department_id, 
    COUNT(*) AS total_students
FROM students
GROUP BY department_id
HAVING COUNT(*) >= 1;


-- JOINS

-- INNER JOIN
SELECT students.name AS student, departments.name AS department
FROM students
INNER JOIN departments ON students.department_id = departments.id;

-- LEFT JOIN
SELECT students.name AS student, departments.name AS department
FROM students
LEFT JOIN departments ON students.department_id = departments.id;

-- RIGHT JOIN
SELECT students.name AS student, departments.name AS department
FROM students
RIGHT JOIN departments ON students.department_id = departments.id;

-- FULL OUTER JOIN
SELECT students.name AS student, departments.name AS department
FROM students
FULL JOIN departments ON students.department_id = departments.id;

-- Self Join (Employees with Manager name)
SELECT 
    e.name AS employee_name, 
    m.name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;


-- INDEX, VIEW & TRANSACTIONS

-- INDEX Creation
CREATE INDEX idx_email ON students(email);

-- VIEW Creation
CREATE VIEW adult_students AS
SELECT id, name, email, age 
FROM students 
WHERE age >= 18;

-- Querying the View
SELECT * FROM adult_students;

-- TRANSACTION
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;

-- Check Accounts
SELECT * FROM accounts;