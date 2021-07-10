const inquirer = require('inquirer')
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
function addComponent(component){
    var i=0;
      component.toLowerCase()=='department' ? i = 0 
    : component.toLowerCase() == 'role' ? i=1 
    : component.toLowerCase() == 'employee' ? i = 2 
    : console.log("ERROR! PLEASE TALK TO THE DATABASE ADMINISTRATOR, YOU SHOULDNT REACH THIS MESSAGE");

    inquirer.prompt(addComponentQuestion[i]).then(data => {
        if(i == 0){
            queryData.push(data.databaseAction)
            queryReturn(respond(queryData),'output')
        }
        if(i == 1){
           respond(data)
        }
        if(i == 2){
            respond(data)
        }
        setTimeout(function(){
            return initialPrompt()
        },2000)
    })
    
}
module.exports = { initialPrompt, recallPrompt }