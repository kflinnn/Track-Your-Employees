INSERT INTO department (id, department_name)
VALUES  (01, "Sales"),
        (02, "Engineering"),
        (03, "Finance"),
        (04, "Legal");



INSERT INTO employee_role (id, title, salary, department_id)
VALUES  (001, "Sales Lead", 100000, 001),
        (002, "Salesperson", 80000, 001),
        (003, "Lead Engineer", 150000, 002),
        (004, "Software Engineer", 120000, 002),
        (005, "Account Manager", 160000, 003),
        (006, "Accountant", 125000, 003),
        (007, "Legal Team Lead", 250000, 004),
        (008, "Lawyer", 190000, 004);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (0001, "John", "Doe", 001, NULL),
        (0002, "Mike", "Chan", 002, 0001),
        (0003, "Ashley", "Rodriguez", 003, NULL),
        (0004, "Kevin", "Tupik", 004, 0003),
        (0005, "Kunal", "Singh", 005, NULL),
        (0006, "Malia", "Brown", 006, 0005),
        (0007, "Sarah", "Lourd", 007, NULL),
        (0008, "Tom", "Allen", 008, 0007);