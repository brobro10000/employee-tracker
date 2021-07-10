const inquirer = require('inquirer')
const { queryReturn } = require('../data/schemajs')

const initialQuestion = [
    {
        type: 'list',
        name: 'databaseAction',
        message: 'What would you like to do?',
        choices: ['View All Employees','View All Employees by Department', 'View All Employees by Manager',
        'Add Employee','Remove Employee','Update Employee Role', 'Update Employee Manager','View All Roles','Add Role','Remove Role']
    }
]
function recallPrompt(){
    setTimeout(function (){
        initialPrompt()
    },2000)
}
function initialPrompt(){
flag = 1;
if(flag == 1){
    // console.log("\n Use arrow keys to display menu (UP OR DOWN)")
}
inquirer.prompt(initialQuestion).then(data=> {
    console.log(data.databaseAction)
    if(data.databaseAction == 'View All Employees'){
        console.log("\n")
        queryReturn(`SELECT e.id as Id, e.first_name AS ' First Name ', e.last_name AS 'Last Name', title as Title, department_name AS Department, salary AS Salary, concat(m.first_name, ' ',m.last_name) AS Manager 
                     FROM employees e 
                     LEFT JOIN roles ON role_id = roles.id 
                     LEFT JOIN departments on department_id = departments.id 
                     LEFT JOIN employees m on e.manager_id = m.id;`,'output')
        recallPrompt()
    }
    if(data.databaseAction == 'View All Employees by Department'){
        console.log('\n')
        queryReturn(`SELECT employees.id as Id, concat(first_name, ' ',last_name) AS "Full Name", department_name AS Department 
        FROM employees,roles, departments 
        WHERE department_id = departments.id 
        AND role_id = roles.id;`,'output')
        recallPrompt()
    }
    if(data.databaseAction == 'View All Employees by Manager'){
        console.log("\n")
        queryReturn(`SELECT  e.manager_id AS "Manager ID", concat(m.first_name, ' ', m.last_name) AS "Manager", e.id AS Id, concat(e.first_name, ' ', e.last_name) AS "Full Name"
                     FROM employees e 
                     LEFT JOIN employees m on e.manager_id = m.id
                     ORDER BY e.manager_id ASC;`, 'output')   
        recallPrompt()
    }
})
}
module.exports = {initialPrompt}
