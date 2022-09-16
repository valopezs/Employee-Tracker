INSERT INTO departments (name) 
VALUES
("Sales"),
("Technology"),
("Legal");

INSERT INTO roles (title, salary, dept_id) 
VALUES
("Sales Manager", "120000", 1),
("Sales Representative", "70000", 1),
("IT Manager", "130000", 2),
("Software Developer", "100000", 2),
("General Counsel", "140000", 3),
("Legal Assistant", "60000", 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
("Valeria","Lopez",1,null),
("Kristen","Vela",2,1),
("Jacob","Rubio",3,null),
("Daniela","Lopez",4,3),
("Sarah","Rusinko",5,null),
("Jack","Mett",6,5);
