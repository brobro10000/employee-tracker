//Requires all functions for programs
const inquirer = require('inquirer')
const database = require('../data/connection')
const { response } = require('../data/query')
const { databaseName, tables, initializeDatabase, dropExistingTables, createAllTables, queryReturn } = require('../data/schemajs')
const { department_name, title, salary, department_id, first_name, last_name, role_id, manager_id, populateAllTables } = require('../data/seedsjs')

//Array for initial prompt and edit roles
const choices = ['View All Employees', 'View All Departments', 'View All Roles', 'View All Employees by Department', 'View All Employees by Manager', 'View All Employees by Role',
    'Add Department', 'Add Role', 'Add Employee', 'Update Employee', 'Show Department Budget', 'Load Default Database', 'Exit Program']
const edit = ['Edit Manager', 'Edit Role']

//first inq prompt question
const initialQuestion =
    [
        {
            type: 'list',
            name: 'databaseAction',
            message: 'What would you like to do?',
            choices: choices
        }
    ]

//Specific questions pertaining to adding a department/role/employe in array of an array object
const addComponentQuestion =
    [
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
                validate: roleSalary => {
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

//Initial prompt that is called throughout program after action complete
function initialPrompt() {
    inquirer.prompt(initialQuestion).then(data => {
        //loop to check value of user choice against array
        for (var i = 0; i < choices.length; i++) {
            if (data.databaseAction == choices[i]) {
                //based on word at specific index performs action
                if (choices[i].split(' ')[0] == 'Add') {
                    return addComponent(choices[i].split(' ')[1])
                }
                if (choices[i].split(' ')[0] == 'Show') {
                    return showDepartmentBudget()
                }
                if (choices[i].split(' ')[0] == 'Update') {
                    return editComponent()
                }
                //rebuilds database to default , exit program or displays the chart
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

//uses passed value of split word from choicecs to determine if we are adding a department role or employee to add
function addComponent(component) {

    var i = 0;
    //changes value of i to match value
    component.toLowerCase() == 'department' ? i = 0
        : component.toLowerCase() == 'role' ? i = 1
            : component.toLowerCase() == 'employee' ? i = 2
                : console.log("ERROR! PLEASE TALK TO THE DATABASE ADMINISTRATOR, YOU SHOULDNT REACH THIS MESSAGE");

    inquirer.prompt(addComponentQuestion[i]).then(passedData => {
        //based on i will add department role or employee
        if (i == 0) {
            var sql = `
            INSERT INTO departments (department_name)
            VALUES
            ('${passedData.databaseAction}');`

            queryReturn(sql, 'return')
            queryReturn(response[1], 'output')

            return recallPrompt()
        }
        if (i == 1) {
            var sql = `SELECT departments.department_name FROM departments;`
            database.query(sql, function (err, results) {
                if (err) throw err
                //populates department array with all departments currently in the database
                var departments = []
                results.forEach(element => departments.push(element.department_name))
                //assigns array to the choices for user to select from existing departmetns
                const rolePrompt =
                    [
                        {
                            type: 'list',
                            name: 'department',
                            message: 'What is the department of the new role.',
                            choices: departments
                        }
                    ]

                inquirer.prompt(rolePrompt).then(data => {
                    //passes value into newRoleData and performs action, followed by outputing the table from predetermined responses
                    const newRoleData = `
                    INSERT INTO roles (title,salary,department_id)
                    VALUES
                    ('${passedData.databaseAction}',${passedData.salary},${departments.indexOf(data.department) + 1})`

                    queryReturn(newRoleData, 'return')
                    queryReturn(response[2], 'output')

                    return recallPrompt()

                })
            });
        }

        if (i == 2) {
            var sql = `
                SELECT  e.manager_id AS "Manager ID", concat(m.first_name, ' ', m.last_name) AS "Manager", e.id AS Id, concat(e.first_name, ' ', e.last_name) AS Full_Name
                FROM employees e 
                LEFT JOIN employees m on e.manager_id = m.id
                ORDER BY e.id ASC;`
            database.query(sql, function (err, results) {
                if (err) throw err;
                //populates the first and last name into employeeManager with index 0 being none
                var employeeManager = ["None"]
                results.forEach(element => employeeManager.push(element.Full_Name))

                sql = 'SELECT roles.id, title FROM roles'
                database.query(sql, function (err, results) {
                    if (err) throw err;
                    //populates roles with roles from database
                    var roles = []  
                    results.forEach(element => roles.push(element.title))
                    //passes value into choices
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
                        //checks if the user has selected none, if so, no manager will be assigned, otherwise the manager is assigned. Performas action and returns table output
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

                        queryReturn(newEmployeeData, 'return')
                        queryReturn(response[0], 'output')

                        return recallPrompt()
                    })
                })
            })
        }
    })
}

function editComponent() {

    var sql = `SELECT concat(first_name, ' ', last_name) AS Full_Name
              FROM employees`
    database.query(sql, function (err, results) {
        if (err) throw err;
        //passes full name of employee into employee array
        const employee = []
        results.forEach(element => employee.push(element.Full_Name))
        //passes value into choices
        const editComponentQuestion =
            [
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to edit.',
                    choices: employee
                },
                {
                    type: 'list',
                    name: 'edit',
                    message: 'What is part of the employee would you like to edit.',
                    choices: edit
                }
            ]

        inquirer.prompt(editComponentQuestion).then(data => {
            //saves index of the users chosen employee
            var employeeIndex = employee.indexOf(data.employee)
            //based on index value of user selection, will edit Manager or Role
            if (data.edit.split(' ')[1] == "Manager") {
                //assigns user selected employee with 'None' for user to select no manager, passes array in choices
                employee[employee.indexOf(data.employee)] = 'None'
                const editManager =
                {
                    type: 'list',
                    name: 'employeeManager',
                    message: 'Which employee is the new Manager.',
                    choices: employee,
                }
                
                inquirer.prompt(editManager).then(managerData => {
                    //If user selects none, assigns null otherwise assigns user choice, performs action then outputs predetermined response
                    if (managerData.employeeManager == 'None') {
                        sql = `UPDATE employees
                       SET manager_id = NULL
                       WHERE employees.id = ${employeeIndex + 1}`
                    } else {
                        sql = `UPDATE employees
                       SET manager_id = ${employee.indexOf(managerData.employeeManager) + 1}
                       WHERE employees.id = ${employeeIndex + 1}`
                    }

                    queryReturn(sql, 'return')
                    queryReturn(response[4], 'output')

                    return recallPrompt()
                })
            } else if (data.edit.split(' ')[1] == "Role") {
                sql = `SELECT title
                       FROM roles`
                database.query(sql, function (err, results) {
                    if (err) throw err;
                    //populates titles array with existing titles.
                    const title = []
                    results.forEach(element => title.push(element.title))
                    //passes value into choices
                    const editRole =
                    {
                        type: 'list',
                        name: 'employeeRole',
                        message: 'What is the employees new role.',
                        choices: title
                    }
                    inquirer.prompt(editRole).then(roleData => {
                    //assings index of role+1 at employee index+1, performas action then returns output
                        sql = `UPDATE employees
                        SET role_id = ${title.indexOf(roleData.employeeRole) + 1}
                        WHERE employees.id = ${employeeIndex + 1}`
                        
                        queryReturn(sql, 'return')
                        queryReturn(response[5], 'output')
                        return recallPrompt()
                    })
                });

            }

        })
    });
}
function showDepartmentBudget() {

    var sql = `SELECT departments.department_name FROM departments;`
    database.query(sql, function (err, results) {
        if (err) throw err
        //Populates department array then passes it into choices
        var departments = []
        results.forEach(element => departments.push(element.department_name))

        const budgetPrompt =
            [
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select a Department to view its budget.',
                    choices: departments
                }
            ]

        inquirer.prompt(budgetPrompt).then(data => {
            //consolidates all employees salary and sums it up displaying a single value table with sum of all employees
            sql =
                `SELECT department_name AS Department , SUM(salary) AS "Total Budget"
            FROM roles,departments,employees
            WHERE department_id = ${departments.indexOf(data.department) + 1}
            AND role_id = roles.id
            AND department_name = "${departments[departments.indexOf(data.department)]}";`

            queryReturn(sql, 'output')

            return recallPrompt()
        })
    })
}

//Sets database to default from seeds.js values using functions form seedsjs.js, timeout between each action to simulate an exhaustive repopulation process (theatrics)
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
//exits program
function exitProgram() {
    console.log("\nProgram will now exit")

    setTimeout(function () {
        console.log("\n-------------Exit Successful--------------\n")
    }, 1000)

    database.end()
}
//delay between recalling prompts to prevent overlay and race conditions. Will always lose the race.
function recallPrompt() {
    setTimeout(function () {
        initialPrompt()
    }, 2000)
}
module.exports = { initialPrompt, recallPrompt }