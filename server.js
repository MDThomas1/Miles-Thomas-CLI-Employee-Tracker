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
    }
);

/*app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/

function beginApp() {

function homeScreen() {

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
    ])
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
                break;
            case 'Exit the app':
                endApp()
                break;
        }
    })
}    

    function viewRoles() {
        db.query(`SELECT roles.title AS Title, roles.salary AS Salary, departments.name as Department
        FROM roles
        INNER JOIN departments ON roles.department_id = departments.id;`, function (err, results) {
            console.log(results)
            homeScreen()
        })
    }

    function addRole() {
        const departmentList = db.query(`SELECT name FROM departments;`)
        inquirer 
        .prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'What is the name of your new role?'
            },
            {
                name: 'roleDepartment',
                type: 'list',
                message: 'What department does your new role belong to?',
                choices: departmentList
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'What salary does your new role make?'
            }
        ])
        .then((answers) => {
            const selectedDepartment = db.query(`SELECT id FROM departments WHERE name = ${answers.roleDepartment};`)
            db.query(`INSERT INTO roles (title, salary, department_id)
            VALUES (${answers.roleName}, ${answers.roleSalary}, ${selectedDepartment});`)
            homeScreen()
        })
    }

    function viewDepartments() {
        db.query('SELECT name FROM departments AS Departments;', function (err, results) {
            console.log(results)
            homeScreen()
        })
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
            db.query(`INSERT INTO departments (name) 
            VALUES (${answers.departmentName});`)
            homeScreen()
        })
    }

    function viewEmployees() {
        db.query(`SELECT employee.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Role, roles.salary AS Salary 
        FROM employees
        INNER JOIN roles ON employees.role_id = roles.id;`, function (err, results) {
            console.log(results)
            homeScreen()
        })
    }

    function addEmployee() {
        const roleList = db.query(`SELECT title FROM roles;`)
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
                message: "What role does the new employee have?",
                choices: roleList
            }
        ])
        .then((answers) => {
            const selectedRole = db.query(`SELECT id FROM roles WHERE title = ${answers.employeeRole};`);
            db.query(`INSERT INTO employees (first_name, last_name, role_id)
            VALUES (${answers.employeeFirstName}, ${answers.employeeLastName}, ${selectedRole});`);
            homeScreen()
        })
    }

    function updateEmployeeRole() {
        const employeeNameList = db.query(`SELECT CONCAT(first_name, " ", last_name FROM employees);`)
        const roleList = db.query(`SELECT title FROM roles;`)
        inquirer 
        .prompt([
            {
                name: 'employeeName',
                type: 'list',
                message: 'What is the name of the employee you wish to edit?',
                choices: employeeNameList
            },
            {
                name: 'newEmployeeRole',
                type: 'list',
                message: 'Which role does the employee now fulfill?',
                choices: roleList

            }
        ])
        .then((answers) => {
            const newRole = db.query(`SELECT id FROM roles WHERE title = ${answers.newEmployeeRole};`)
            db.query(`UPDATE employees SET role_id = ${newRole} 
            WHERE CONCAT(first_name, " ", last_name) = ${answers.employeeName};`)
            homeScreen()
        })
    }

    function endApp() {
        console.log('Exiting application. Thank you!')
    }

    homeScreen()
}



beginApp()
