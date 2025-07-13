
-- SQL Schema for Student Management

CREATE SCHEMA IF NOT EXISTS school;

CREATE TABLE IF NOT EXISTS school.students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER,
    parent_id INTEGER,
    CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES school.students(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS school.marks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    score INTEGER NOT NULL,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES school.students(id) ON DELETE CASCADE
);
