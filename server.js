const express = require('express');
const database = require('./data/connection');
const { databaseName, tables, initializeDatabase, dropExistingTables,
        createDepartmentTable, createRoleTable, createEmployeeTable } = require('./data/schemajs')
const {department_name , title, salary, department_id, first_name, last_name, role_id, manager_id, populateDepartment, populateRole,  populateEmployee, showQuery } = require('./data/seedsjs')

database.connect(err => {
  if (err) throw err;
  initializeDatabase(databaseName)
  dropExistingTables(tables)
  createDepartmentTable()
  createRoleTable()
  createEmployeeTable()
  populateDepartment(department_name)
  populateRole(title, salary, department_id)
  populateEmployee(first_name,last_name,role_id,manager_id)
  // showQuery('departments')
  // showQuery('roles')
  console.log('Database connected.');

});
