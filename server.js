const express = require('express');
const database = require('./data/connection');
const { databaseName, tables, initializeDatabase, dropExistingTables,
        createAllTables} = require('./data/schemajs')
const {department_name, title, salary, department_id, 
  first_name, last_name, role_id, manager_id, populateAllTables, showQuery } = require('./data/seedsjs')
database.connect(err => {
  if (err) throw err;
  initializeDatabase(databaseName)
  dropExistingTables(tables)
  createAllTables()
  populateAllTables(department_name,title,salary,department_id,first_name,last_name,role_id,manager_id)
  showQuery('departments')
  showQuery('roles')
  showQuery('employees')
  console.log('Database connected.');
});
