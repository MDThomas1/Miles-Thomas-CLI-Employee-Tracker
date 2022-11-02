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

    function addRole() {
        inquirer 
        .prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'What is the name of your new role?'
            },
            {
                name: 'roleDepartment',
                type: 'input',
                message: 'What department does your new role belong to?'
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'What salary does your new role make?'
            }
        ])
        .then((answers) => {
            db.query(`INSERT INTO roles (id, title, salary, department_id)
            VALUES (${answers.roleName}, ${answers.roleSalary}, ${answers.roleDepartment})`)
        })

        beginApp()
    }

    function viewDepartments() {
        db.query('SELECT * FROM departments')

        beginApp()
    }

    function addDepertment() {
        inquirer 
        .prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'What is the name of your new department?'
            }
        ])
        .then((answers) => {
            db.query(`INSERT INTO departments (id, name) 
            VALUES (${answers.departmentName});`)
        })

        beginApp()
    }

    function viewEmployees() {
        db.query('SELECT * FROM employees')

        beginApp()
    }

    function addEmployee() {
        inquirer 
        .prompt([
            {
                name: 'employeeFirstName',
                type: 'input',
                message: "What is your new employee's first name?"
            },
            {
                name: 'employeeLastName',
                type: 'imput',
                message: "What is your new employee's last name?"
            },
            {
                name: 'employeeRole',
                type: 'list',
                message: "What role does the new employee have?"
            }
        ])
        .then((answers) => {
            db.query(``)
        })

        beginApp()
    }

    function updateEmployeeRole() {
        inquirer 
        .prompt([
            {
                name: 'employeeFirstName',
                type: 'list',
                message: 'What is the first name of the employee you wish to edit?'
            },
            {
                name: 'employeeLastName',
                type: 'list',
                message: 'What is the last name of the employee you wish to edit?'
            },
            {
                name: 'newEmployeeRole',
                type: 'list',
                message: 'Which role does the employee now fulfill?'
            }
        ])
        .then((answers) => {})

        beginApp()
    }

    function endApp() {
        console.log('Exiting application. Thank you!')
        process.exit()
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

beginApp()
