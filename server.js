const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')

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
        {}
    ])
}
