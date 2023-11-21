create table employees(
	employee_id serial primary key,
	name varchar(100),
	date_of_birth date,
	monthly_salary int
);

insert into employees(name, date_of_birth, monthly_salary)
values
('John Doe', '1990-05-15', 5000),
    ('Jane Smith', '1985-08-22', 6000),
    ('Robert Johnson', '1982-03-10', 7500),
    ('Emily Davis', '1995-11-28', 5500),
    ('Michael Brown', '1988-07-03', 7000);
	
select * from employees;