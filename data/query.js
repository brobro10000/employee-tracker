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
function respond(queryData) {
    var variableResponse = [
        `INSERT INTO departments (department_name)
        VALUES
        ('${queryData[0]}');`,

        `SELECT departments.department_name FROM departments;`,

        `SELECT  e.manager_id AS "Manager ID", concat(m.first_name, ' ', m.last_name) AS "Manager", e.id AS Id, concat(e.first_name, ' ', e.last_name) AS Full_Name
        FROM employees e 
        LEFT JOIN employees m on e.manager_id = m.id
        ORDER BY e.id ASC;`
    ]
    if (queryData.length == 1)
        return variableResponse[0]
    if (queryData.salary)
        newRole(variableResponse[1], queryData)
    if (queryData.last_name)
        newEmployee(variableResponse[2], queryData)
}

function newRole(sql, passedData) {
     database.query(sql, function (err, results) {
             if (err)
                 throw err
             var departments = []
             results.forEach(element => {
                 departments.push(element.department_name)
             })
             const rolePrompt = [
                 {
                     type: 'list',
                     name: 'department',
                     message: 'What is the department of the new role.',
                     choices: departments
                 }
             ]
             inquirer.prompt(rolePrompt).then(data => {
                 const newRoleData = `INSERT INTO roles (title,salary,department_id)
            VALUES
            ('${passedData.databaseAction}',${passedData.salary},${departments.indexOf(data.department) + 1})`
                 queryReturn(newRoleData, 'output')
             })
         });
}
function newEmployee(sql, passedData) {
    database.query(sql, function (err, results) {
        if (err) throw err;
        var employeeManager = ["None"]
        results.forEach(element => {
            employeeManager.push(element.Full_Name)
        })
        sql = 'SELECT roles.id, title FROM roles'
        database.query(sql, function (err, results) {
            var roles = []
            results.forEach(element => {
                roles.push(element.title)
            })
            console.table(roles, employeeManager)
            const employeePrompt =
                [
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the role of the new employee',
                        choices: roles
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the manager of the new employee',
                        choices: employeeManager
                    }
                ]
            inquirer.prompt(employeePrompt).then(data => {
                console.log(passedData.databaseAction, passedData.last_name, roles.indexOf(data.role), employeeManager.indexOf(data.manager))
                if (data.manager == 'None')
                    var newEmployeeData =
                        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES
            ('${passedData.databaseAction}','${passedData.last_name}',${roles.indexOf(data.role) + 1},NULL)`
                else
                    var newEmployeeData =
                        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES
            ('${passedData.databaseAction}','${passedData.last_name}',${roles.indexOf(data.role) + 1},${employeeManager.indexOf(data.manager)})`
                queryReturn(newEmployeeData, 'output')
            })
        })

    })
}

module.exports = { response, respond }