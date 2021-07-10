// const { addDepartment } = require("../utils/prompts")
const inquirer = require("inquirer")
const { recallPrompt } = require("../utils/prompts")

const database = require("./connection")
const { queryReturn } = require("./schemajs")
const response = [
    `SELECT e.id as Id, e.first_name AS ' First Name ', e.last_name AS 'Last Name', title as Title, department_name AS Department, salary AS Salary, concat(m.first_name, ' ',m.last_name) AS Manager 
     FROM employees e 
     LEFT JOIN roles ON role_id = roles.id 
     LEFT JOIN departments on department_id = departments.id 
     LEFT JOIN employees m on e.manager_id = m.id;`,

    `SELECT departments.id AS Id, department_name AS Departments
     FROM departments`,

    `SELECT roles.id AS Id, title AS Title, department_name AS Department, salary as Salary
     FROM roles, departments
     WHERE department_id = departments.id`,

    `SELECT employees.id as Id, concat(first_name, ' ',last_name) AS "Full Name", department_name AS Department 
     FROM employees,roles, departments 
     WHERE department_id = departments.id 
     AND role_id = roles.id;`,

    `SELECT  e.manager_id AS "Manager ID", concat(m.first_name, ' ', m.last_name) AS "Manager", e.id AS Id, concat(e.first_name, ' ', e.last_name) AS "Full Name"
     FROM employees e 
     LEFT JOIN employees m on e.manager_id = m.id
     ORDER BY e.manager_id ASC;`,

    `SELECT  roles.id AS "Role Id", title AS Role, employees.id AS "Id", concat(first_name, ' ', last_name) AS "Full Name"
     FROM employees
     LEFT JOIN roles on employees.role_id = roles.id;`
]

module.exports = { response }