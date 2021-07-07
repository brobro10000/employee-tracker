const express = require('express');
const database = require('./data/connection');
const { databaseName, tables, initializeDatabase, dropExistingTables,
        createDepartmentTable, createRoleTable, createEmployeeTable } = require('./data/schemajs')


database.connect(err => {
  if (err) throw err;
  initializeDatabase(databaseName)
  dropExistingTables(tables)
  createDepartmentTable()
  createRoleTable()
  createEmployeeTable()
  console.log('Database connected.');

});
