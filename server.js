//Imports and requirements
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
    console.log('Connected to the tracker_db database.')
);

runApp();

//function to initialize application
function runApp () {

//inquirer prompts
inquirer
    .prompt([
      { 
        type: 'list',
        name: 'starterQuestion',
        message: "What would you lke to do? (Use arrow keys)",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"], 
      },
    ])
    .then((answer) => {
        console.log(answer);
        userInput(answer);
    })
};

//switch function
function userInput(answer) {
    const userChoice = answer.starterQuestion;
        switch (userChoice) {
            case "View All Departments":
                showAllDepartments();
                break;

            case "View All Roles":
                showAllRoles();
                break;

            case "View All Employees":
                showAllEmployees();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;
            
            default:
                console.log("You must select an option!");
            runApp();
        }
};


//function to show all departments
function showAllDepartments() {
    db.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        printTable(res);
        promptExit();
    })
};

//function to show all roles
function showAllRoles() {
    db.query(`SELECT * FROM employee_role`, function (err, res) {
        if (err) throw err;
        printTable(res);
        promptExit();
    });
};

//function to show all the employees
function showAllEmployees() {
    db.query(`SELECT * FROM employee`, function (err, res) {
        if (err) throw err;
        printTable(res);
        promptExit();
});    
};

//function to add a department
function addDepartment () {
    inquirer.prompt(
        {
        type: "input",
        name: "department_name",
        message: "What is your department name?"
    }).then(({ department_name }) => {
        db.query(
            `INSERT INTO department (department_name) VALUES (?)`, [department_name], 
            function (err) {
                if (err) throw err;
                console.log("Department added to database!");
            })
    })
};

//function to add a role
function addRole() {

    db.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                name: "department_id",
                message: "Please enter the Department ID that corresponds to this role"
            },
            {
                type: "input",
                name: "title",
                message: "Please enter the title for this role"
            },
            {
                type: "input",
                name: "salary",
                message: "Please enter the salary for this role"
            }
        ]).then(({ department_id, title, salary }) => 
        db.query(
            `INSERT INTO employee_role (department_id, title, salary) VALUES (?,?,?)`, 
            [department_id, title, salary], 
            function (err) {
                if (err) throw err;
                console.log("Role added to database!");
                promptExit();
            }));   
    });
};

//function to add employee to database
function addEmployee() {

    db.query("SELECT * FROM employee_role", function (err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Please enter the employee's first name"
            },
            {
                type: "input",
                name: "last_name",
                message: "Please enter the employee's last name"
            },
            {
                type: "input",
                name: "role_id",
                message: "Please enter the employee's Role ID"
            },
            {
                type: "input",
                name: "manager_id",
                message: "Please enter the employee's Manager ID"
            }
        ]).then(({ department_id, title, salary }) => 
        db.query(
            `INSERT INTO employee (last_name, first_name, role_id, manager_id) VALUES (?,?,?,?)`, 
            [last_name, first_name, role_id, manager_id], 
            function (err) {
                if (err) throw err;
                console.log("Employee added to database!");
                promptExit();
            })); 
    });
};

//function to update employee
function updateRole() {
    
};

//function to quit or continue
function promptExit() {
    inquirer.prompt({
        type: "list",
        name: "exitPrompt",
        message: "Would you like to perform another action or exit?",
        choices: ["Run Again", "Exit"]
    }).then(function (answer) {
        if (answer.exitPrompt === "Run Again") {
            runApp();
        } else {
            console.log("Enjoy the rest of your day!")
            db.end();
        };
    });
};

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});