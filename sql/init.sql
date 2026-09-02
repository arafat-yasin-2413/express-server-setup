CREATE TABLE users (
    id INT,
    name TEXT NOT NULL,
    email TEXT UNIQUE
)

INSERT INTO users 
(id, name, email) 
values (111, 'Naimur', 'naimur@gmail.com')

select * from users