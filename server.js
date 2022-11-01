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
      database: 'company_db'
    },
    console.log(`Connected to the company database.`)
);

function beginApp() {
    inquirer
    .prompt([
        {
            name: 'selections',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all roles', new inquirer.Separator(),
                'Add a role', new inquirer.Separator(),
                'View all departments', new inquirer.Separator(),
                'Add a department', new inquirer.Separator(),
                'View all employees', new inquirer.Separator(),
                'Add an employee', new inquirer.Separator(),
                'Update an employee role', new inquirer.Separator(),
                'Exit the app', new inquirer.Separator(),
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

    function viewRoles() {
        db.query('SELECT * FROM roles')

        beginApp()
    }

    function addRole() {}

    function viewDepartments() {
        db.query('SELECT * FROM departments')

        beginApp()
    }

    function addDepertment() {}

    function viewEmployees() {
        db.query()

        beginApp()
    }

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
