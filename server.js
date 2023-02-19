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
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"] 
      }
    ])
     .then((answer) => {
        switch (answer.startQuestions) {
            case "View All Departments":
                showAllDepartments();

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
        }
     });
}

//function to show all departments
function showAllDepartments() {
    const allDepartmentsArray = [];
    const query = "SELECT * FROM department";
    
    connection.query(query, function(err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            const departmentArray = [];

            departmentArray.push(result[i].id);
            departmentArray.push(result[i].department_name);

            console.log(departmentArray);

            allDepartmentArray.push(departmentArray);
        }
        console.log(allDepartmentsArray);

        console.log("\n\n\n");
        console.table(["ID", "Department Name"], allDepartmentsArray);
        console.log("\n\n\n");

        promptExit();
    })
};

//function to show all roles
function showAllRoles() {
    const allRolesArray = [];
    const query = "SELECT * FROM employee_role"; 

    connection.query(query, function(err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            const rolesArray = [];

            rolesArray.push(result[i].id);
            rolesArray.push(result[i].title);
            rolesArray.push(result[i].salary);
            rolesArray.push(result[i].department_id);
        }
        console.log(rolesArray);

        console.log("\n\n\n");
        console.table(["ID", "Title", "Salary", "Department Name"], allRolesArray);
        console.log("\n\n\n");

        promptExit();
    })
};

//function to show all the employees
function showAllEmployees() {
    const allEmployeeArray = [];
    const query = "SELECT employee.id, first_name, last_name, title, salary, department_name, manager_id FROM employee JOIN employee_role ON (employee.role_id = employee_role.id) JOIN department ON (department.id = role.department_id)";

    connection.query(query, function(err, result) {
        if (err) throw err;
    
        for (let i = 0; i < result.length; i++) {
            const employeeArray = [];

            employeeArray.push(result[i].id);
            employeeArray.push(result[i].first_name);
            employeeArray.push(result[i].last_name);
            employeeArray.push(result[i].title);
            employeeArray.push(result[i].salary);
            employeeArray.push(result[i].department_name);
            employeeArray.push(result[i].manager_id);

            console.log(employeeArray);        
    
            allEmployeeArray.push(employeeArray);
        }
        console.log(allEmployeeArray);

        console.log("\n\n\n");
        console.table(["ID", "First Name", "Last Name", "Role", "Salary", "Department"], allEmployeeArray);
        console.log("\n\n\n");

        promptExit();

});    
};

//function to add a department
function addDepartment () {
    inquirer.prompt(
        {
        type: "input",
        name: "departmentAdded",
        message: "What is your department name?"
    }).then(function (answer){
        connection.query("INSERT INTO department SET ?", { department_name: answer.department }), function (err) {
            if (err) throw err;
        };
        console.log("\n Department added to database! \n");
        
        promptExit();
    });
};

//function to add a role
function addRole() {

    connection.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "Please enter the title for this role"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "Please enter the salary amount for this role"
            },
            {
                type: "rawlist",
                name: "roleDepartment",
                message: "Please choose the department this role belongs to",
                choices: function () {
                    const choicesArray = [];

                    for (let i = 0; i < result.length; i++) {
                        choicesArray.push(result[i].department_name);
                    }
                    return choicesArray;
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM department WHERE ?", { department_name: answer.roleDepartment }, function (err, result) {
                if (err) throw err;

                connection.query("INSERT INTO employee_role SET ?", {
                    title: answer.roleTitle,
                    salary: parseInt(answer.roleSalary),
                    department_id: parseInt(result[0].id)
                });
                console.log ("\n Role added to database! \n");
                })
                
                promptExit();
        });
    });
};

//function to add employee to database
function addEmployee() {

    Connection.query("SELECT * FROM employee_role", function (err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Please enter the employee's first name"
            },
            {
                type: "input",
                name: "lastName",
                message: "Please enter the employee's last name"
            },
            {
                type: "rawlist",
                name: "role",
                message: "Please enter the employee's role",
                choices: function () {
                    const choicesArray = [];

                    for (let i = 0; i < result.length; i++) {
                        choicesArray.push(result[i].title);
                    }
                    return choicesArray;
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM employee_role WHERE ?", { title: answer.role }, function (err, result) {
                if (err) throw err;

                connection.query("INSERT INTO employee SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: result[0].id
                });
                console.log ("\n Employee added to database! \n");
            })

            promptExit ();
        });
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
            connection.end();
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