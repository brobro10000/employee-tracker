const Department = require('../lib/Department')
const Role = require('../lib/Role')
const Employee = require('../lib/Employee')
test('create  object', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee).toBe(employee)
});
test('check id', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee1 = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())
    const employee2 = new Employee('3', role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee1.id).toBe(3)
    expect(employee2.id).toBe(3)
});
test('check name', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.name).toBe('R&D')
});

test('check title', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.title).toBe('Head')
});
test('check salary', () => {
    const department = new Department(1, 'R&D')
    const role1 = new Role(2, department.getName(), 'Head', "50000", department.getDepartmentId())
    const role2 = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const role3 = new Role(2, department.getName(), 'Head', "50000.01", department.getDepartmentId())
    const role4 = new Role(2, department.getName(), 'Head', 50000.01, department.getDepartmentId())
    const employee1 = new Employee(3, role1.getName(), role1.getTitle(), role1.getSalary(), role1.getDepartmentId(), 'John', 'Smith', role1.getId())
    const employee2 = new Employee(3, role2.getName(), role2.getTitle(), role2.getSalary(), role2.getDepartmentId(), 'John', 'Smith', role2.getId())
    const employee3 = new Employee(3, role3.getName(), role3.getTitle(), role3.getSalary(), role3.getDepartmentId(), 'John', 'Smith', role3.getId())
    const employee4 = new Employee(3, role4.getName(), role4.getTitle(), role4.getSalary(), role4.getDepartmentId(), 'John', 'Smith', role4.getId())
    expect(employee1.salary).toBe(50000)
    expect(employee2.salary).toBe(50000)
    expect(employee3.salary).toBe(50000.01)
    expect(employee4.salary).toBe(50000.01)
});
test('check department id', () => {
    const department1 = new Department(1, 'R&D')
    const department2 = new Department("1", 'R&D')
    const role1 = new Role(2, department1.getName(), 'Head', 50000, department1.getDepartmentId())
    const role2 = new Role(2, department2.getName(), 'Head', 50000, department2.getDepartmentId())
    const employee1 = new Employee(3, role1.getName(), role1.getTitle(), role1.getSalary(), role1.getDepartmentId(), 'John', 'Smith', role1.getId())
    const employee2 = new Employee(3, role2.getName(), role2.getTitle(), role2.getSalary(), role2.getDepartmentId(), 'John', 'Smith', role2.getId())
    expect(employee1.department_id).toBe(1)
    expect(employee2.department_id).toBe(1)
});
test('check first name', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.first_name).toBe('John')
});
test('check last name', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.last_name).toBe('Smith')
});
test('check role id name', () => {
    const department = new Department(1, 'R&D')
    const role1 = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const role2 = new Role("2", department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee1 = new Employee(3, role1.getName(), role1.getTitle(), role1.getSalary(), role1.getDepartmentId(), 'John', 'Smith', role1.getId())
    const employee2 = new Employee(3, role2.getName(), role2.getTitle(), role2.getSalary(), role2.getDepartmentId(), 'John', 'Smith', role2.getId())

    expect(employee1.role_id).toBe(2)
    expect(employee2.role_id).toBe(2)
});
test('check manager id', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee1 = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())
    const employee2 = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId(), '5')
    const employee3 = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId(), 5)

    expect(employee1.manager_id).toBe('NULL')
    expect(employee2.manager_id).toBe(5)
    expect(employee3.manager_id).toBe(5)
});

test('check empty ID', () => {
    let expectedErrorMessage = "ID must be a positive number"

    try {
        const department = new Department(1, 'R&D')
        const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
        const employee = new Employee('', role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative ID', () => {
    let expectedErrorMessage = "ID must be a positive number";

    try {
        const department = new Department(1, 'R&D')
        const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
        const employee = new Employee(-3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())
    } catch (error) {
        expectedError = error;
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty Name', () => {
    let expectedErrorMessage = "A name is required";

    try {
        const department = new Department(1,'')
        const role = new Role(2,department.getName(),'Head',50000,department.getDepartmentId())
        const employee = new Employee(3,role.getName(),role.getTitle(),role.getSalary(),role.getDepartmentId(),'John','Smith',role.getId())
    } catch (error) {
        expectedError = error;

    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty title', () => {
    let expectedErrorMessage = "A title is required";

    try {
        const department = new Department(1,'R&D')
        const role = new Role(2,department.getName(),'',50000,department.getDepartmentId())
        const employee = new Employee(3,role.getName(),role.getTitle(),role.getSalary(),role.getDepartmentId(),'John','Smith',role.getId())
    } catch (error) {
        expectedError = error;

    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty salary', () => {
    let expectedErrorMessage = "Salary must be a positive number"

    try {
        const department = new Department(1,'R&D')
        const role = new Role(2,department.getName(),'Head','',department.getDepartmentId())
        const employee = new Employee(3,role.getName(),role.getTitle(),role.getSalary(),role.getDepartmentId(),'John','Smith',role.getId())
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative salary', () => {
    let expectedErrorMessage = "Salary must be a positive number";

    try {
        const department = new Department(1,'R&D')
        const role = new Role(2,department.getName(),'Head',-50000,department.getDepartmentId())
        const employee = new Employee(3,role.getName(),role.getTitle(),role.getSalary(),role.getDepartmentId(),'John','Smith',role.getId())
    } catch (error) {
        expectedError = error;
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty first name', () => {
    let expectedErrorMessage = "A first name is required"

    try {
        const department = new Department(1,'R&D')
        const role = new Role(2,department.getName(),'Head',50000,department.getDepartmentId())
        const employee = new Employee(3,role.getName(),role.getTitle(),role.getSalary(),role.getDepartmentId(),'','Smith',role.getId())
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty last', () => {
    let expectedErrorMessage = "A last name is required"

    try {
        const department = new Department(1,'R&D')
        const role = new Role(2,department.getName(),'Head',50000,department.getDepartmentId())
        const employee = new Employee(3,role.getName(),role.getTitle(),role.getSalary(),role.getDepartmentId(),'John','',role.getId())
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty role ID', () => {
    let expectedErrorMessage = "Role Id must be a positive number"

    try {
        const employee = new Employee(3,'R&D','Head',50000,1,'John','Smith','')
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative role ID', () => {
    let expectedErrorMessage = "Role Id must be a positive number";

    try {
        const employee = new Employee(3,'R&D','Head',50000,1,'John','Smith',-1)
    } catch (error) {
        expectedError = error;
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative manager id', () => {
    let expectedErrorMessage = "Manager ID must be a positive number"

    try {
        const department = new Department(1,'R&D')
        const role = new Role(2,department.getName(),'Head',50000,department.getDepartmentId())
        const employee = new Employee(3,role.getName(),role.getTitle(),role.getSalary(),role.getDepartmentId(),'John','Smith',role.getId(), -1)
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});

test('check  getName', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.getName()).toBe('R&D')
});
test('check  getId', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.getId()).toBe(3)
});
test('check  getDepartmentId', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.getDepartmentId()).toBe(1)
});
test('check  getRoleId', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.getRoleId()).toBe(2)
});
test('check  getTitle', () => {
    const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())

    expect(employee.getTitle()).toBe('Head')
});
test('check  getSalary', () => {
   const department = new Department(1, 'R&D')
    const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
    const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())


    expect(employee.getSalary()).toBe(50000)
});
test('check  getFullName', () => {
    const department = new Department(1, 'R&D')
     const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
     const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())
 
 
     expect(employee.getFullName()).toBe('John Smith')
 });
 test('check  getFirstName', () => {
    const department = new Department(1, 'R&D')
     const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
     const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())
 
 
     expect(employee.getFirstName()).toBe('John')
 });
 test('check  getLastName', () => {
    const department = new Department(1, 'R&D')
     const role = new Role(2, department.getName(), 'Head', 50000, department.getDepartmentId())
     const employee = new Employee(3, role.getName(), role.getTitle(), role.getSalary(), role.getDepartmentId(), 'John', 'Smith', role.getId())
 
 
     expect(employee.getLastName()).toBe('Smith')
 });