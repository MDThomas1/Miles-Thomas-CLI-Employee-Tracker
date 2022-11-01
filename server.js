const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')
const { default: Choices } = require('inquirer/lib/objects/choices')

const app = express()
const PORT = process.env.PORT || 3001

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

    function endApp() {
        console.log('Exiting application. Thank you!')
        process.exit()
    }
}

beginApp()
