const inquirer = require('inquirer')
const { query } = require('../data/connection')
const database = require('../data/connection')
const { response, variableResponse, respond } = require('../data/query')
const { databaseName, tables, initializeDatabase, dropExistingTables, createAllTables, queryReturn } = require('../data/schemajs')
const { department_name, title, salary, department_id, first_name, last_name, role_id, manager_id, populateAllTables } = require('../data/seedsjs')
const choices = ['View All Employees', 'View All Departments', 'View All Roles', 'View All Employees by Department', 'View All Employees by Manager', 'View All Employees by Role',
    'Add Department','Add Role','Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Load Default Database', 'Exit Program']
const queryData = []
const initialQuestion = [
    {
        type: 'list',
        name: 'databaseAction',
        message: 'What would you like to do?',
        choices: choices
    }
]
const addComponentQuestion = [
[
    {
        type: 'input',
        name: 'databaseAction',
        message: 'Enter a Department Name',
        validate: departmentName => {
            if (departmentName) {
                return true;
            } else {
                console.log('Please Enter a Department Name')
                return false
            }
        }
    }
],
[
    {
        type: 'input',
        name: 'databaseAction',
        message: 'Enter a Role Name',
        validate: departmentName => {
            if (departmentName) {
                return true;
            } else {
                console.log('Please Enter a Role Name')
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role.',
        validate: roleSalary=> {
            if (parseFloat(roleSalary)) {
                return true;
            } else {
                console.log('Please Enter a valid Salary (EX: 500.00')
                return false
            }
        }
    }
],
[
    {
        type: 'input',
        name: 'databaseAction',
        message: 'Enter an Employee\'s First Name',
        validate: firstName => {
            if (firstName) {
                return true;
            } else {
                console.log('Please Enter an Employee\'s First Name')
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter an Employee\'s Last Name',
        validate: lastName => {
            if (lastName) {
                return true;
            } else {
                console.log('Please Enter an Employee\'s First Name')
                return false
            }
        }
    }
]
]

function exitProgram() {
    console.log("\nProgram will now exit")
    setTimeout(function () {
        console.log("\n-------------Exit Successful--------------\n")
    }, 1000)
    database.end()
}
function recreateDatabase() {
    setTimeout(function () {
        initializeDatabase(databaseName)
    }, 1500)

    setTimeout(function () {
        dropExistingTables(tables)
    }, 3000)
    setTimeout(function () {
        createAllTables()
    }, 4500)
    setTimeout(function () {
        populateAllTables(department_name, title, salary, department_id, first_name, last_name, role_id, manager_id)
    }, 6000)
    setTimeout(function () {
        console.log("Database Recreation Success\n")
    }, 7500)
    setTimeout(function () {
        initialPrompt()
    }, 9000)
}
function recallPrompt() {
    setTimeout(function () {
        initialPrompt()
    }, 2000)
}
function initialPrompt() {
    inquirer.prompt(initialQuestion).then(data => {
        for (var i = 0; i < choices.length; i++) {
            if (data.databaseAction == choices[i]) {
                if(choices[i].split(' ')[0] == 'Add')
                {
                    return addComponent(choices[i].split(' ')[1])
                }
                if (i == choices.length - 2) {
                    return recreateDatabase()
                } else if (i == choices.length - 1) {
                    return exitProgram()
                } else
                    queryReturn(response[i], 'output')
                return recallPrompt()
            }
        }
    })
}
function addComponent(component) {
    var i = 0;
    component.toLowerCase() == 'department' ? i = 0
        : component.toLowerCase() == 'role' ? i = 1
            : component.toLowerCase() == 'employee' ? i = 2
                : console.log("ERROR! PLEASE TALK TO THE DATABASE ADMINISTRATOR, YOU SHOULDNT REACH THIS MESSAGE");

    inquirer.prompt(addComponentQuestion[i]).then(passedData => {
        if (i == 0) {
            queryData.push(passedData.databaseAction)
            var variableResponse = `
            INSERT INTO departments (department_name)
            VALUES
            ('${queryData[0]}');`
            queryReturn(variableResponse, 'output')
            setTimeout(function () {
                queryReturn(response[1], 'output')
            }, 1000)
            recallPrompt()
        }
        if (i == 1) {
            var sql = `SELECT departments.department_name FROM departments;`
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
                    if (newRoleData) {
                        queryReturn(response[2], 'output')
                        recallPrompt()
                    }
                })
            });
        }
        if (i == 2) {
            var sql =
                `SELECT  e.manager_id AS "Manager ID", concat(m.first_name, ' ', m.last_name) AS "Manager", e.id AS Id, concat(e.first_name, ' ', e.last_name) AS Full_Name
           FROM employees e 
           LEFT JOIN employees m on e.manager_id = m.id
           ORDER BY e.id ASC;`
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
                        if(newEmployeeData){
                            queryReturn(response[0], 'output')
                            recallPrompt()
                        }
                    })
                })
            })
        }
    })
}
module.exports = { initialPrompt, recallPrompt }