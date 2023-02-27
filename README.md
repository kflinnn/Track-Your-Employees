# Track-Your-Employees

## Purpose

A command-line application to manage a company's employee database.

When the user is prompted with the options: view all departments, view all roles, view all employees, adda department, add a role, add an employee, and update an employee role. When they choose to view all departments they are then presented with a formatted table showing department names and department ids. When they choose to view all roles they are presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees they are presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to. When they choose to add a department they are prompted to enter the name of the department and that department is added to the database. When they choose to add a role they are prompted to enter the name, salary, and department for the role and that role is added to the database. When I choose to add an employee they are prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database. When they choose to update an employee role they are then prompted to select an employee to update and their new role and this information is updated in the database. This was achieved by using node.js and the npms: Inquirer, MySql2, console-table-printer. 

## Examples

Schema.sql:

![Screen Shot 2023-02-27 at 1 51 24 PM](https://user-images.githubusercontent.com/116764540/221655982-f6d29400-00f4-4f3b-85df-9016811eba1e.png)


Seeds.sql:

![Screen Shot 2023-02-27 at 1 52 08 PM](https://user-images.githubusercontent.com/116764540/221656127-9fa5b96e-53ec-46df-9aaa-642b173b592e.png)


Initial Prompt Code with Inquirer:

![Screen Shot 2023-02-27 at 1 53 12 PM](https://user-images.githubusercontent.com/116764540/221656348-e6c57e1d-3efd-451b-a764-4453c03ab11e.png)


MySQL2 Queries:

![Screen Shot 2023-02-27 at 1 54 31 PM](https://user-images.githubusercontent.com/116764540/221656577-2152809e-f9d2-4d74-bf1c-57eb57577a54.png)

![Screen Shot 2023-02-27 at 1 55 00 PM](https://user-images.githubusercontent.com/116764540/221656661-bfe10488-30a4-4cbb-9fea-16fba154a834.png)

## License

MIT License

Copyright (c) 2022 Kelley Flinn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Technologies Used

Language: JavaScript

NPM: Inquirer

NPM: MySQL2

NPM: Console-Table-Printer

## Link to Video Demo

https://drive.google.com/file/d/1coBRUBaji_3oxal11-Rlx8L6gSwhVJQ3/view
