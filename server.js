//Imports and requirements
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlendcoded({ extended: false}));
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
        name: 'starterQuestions',
        message: "What would you lke to do? (Use arrow keys)",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"] 
      }
    ])
     .then((answer) => {
        switch (answer.startQuestions) {
            case "View All Employees":
                showAllEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            case "View All Roles":
                viewRole();
                break;

            case "Add Role":
                addRole();
                break;

            case "View All Departments":
                viewDepartments();

            case "Add Department":
                addDepartment();
                break;
        }
     });
}

function showAllEmployees() {
    const employeeArray = [];
}


//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});