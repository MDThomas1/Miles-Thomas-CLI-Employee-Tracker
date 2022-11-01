const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'R3gg13@home',
      database: 'courses_db'
    },
    console.log(`Connected to the courses_db database.`)
);

function beginApp() {
    inquirer
    .prompt([
        {
            name: 'selections',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all roles',
                'Add a role',
                'View all departments',
                'Add a department',
                'View all employees',
                'Add an employee',
                'Update an employee role',
                'Exit the app',
            ]
        }
        .then((answers) => {
            switch (answers.selections) {
                case 'View all roles':
                    viewRoles()
                    break;
                case 'Add a role':
                    addRole()
                    break;
                case 'View all departments':
                    viewDepartments()
                    break;
                case 'Add a department':
                    addDepertment()
                    break;
                case 'View all employees':
                    viewEmployees()
                    break;
                case 'Add an employee':
                    addEmployee()
                    break;
                case 'Update an employee role':
                    updateEmployeeRole()
                default:
                    endApp()
                    break;
            }
        })
    ])

    function viewRoles() {}

    function addRole() {}

    function viewDepartments() {}

    function addDepertment() {}

    function viewEmployees() {}

    function addEmployee() {}

    function updateEmployeeRole() {}

    function endApp() {
        console.log('Exiting application. Thank you!')
        process.exit()
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

beginApp()
