const Department = require('../lib/Department')
const Role = require('../lib/Role')

test('check id', () => {
    const role1 = new Role(1,"R&D", 'Head', 50000)
    const role2 = new Role("1","R&D", 'Head', 50000)
    expect(role1.id).toBe(1)
    expect(role2.id).toBe(1)
});
test('check name', () => {
    const role = new Role(1,"R&D", 'Head', 50000)

    expect(role.name).toBe('R&D')
});

test('check title', () => {
    const role = new Role(1,"R&D", 'Head', 50000)

    expect(role.title).toBe('Head')
});
test('check salary', () => {
    const role1 = new Role(1,"R&D", 'Head', "50000",1)
    const role2 = new Role("1","R&D", 'Head', 50000,1)
    const role3 = new Role(1,"R&D", 'Head', "50000.01",1)
    const role4 = new Role("1","R&D", 'Head', 50000.01,1)
    expect(role1.salary).toBe(50000)
    expect(role2.salary).toBe(50000)
    expect(role3.salary).toBe(50000.01)
    expect(role4.salary).toBe(50000.01)
});
test('check department id', () => {
    const department1 = new Department(2,"R&D")
    const department2 = new Department("2","R&D")
    const role1 = new Role(1,"R&D", 'Head', 50000, department1.getDepartmentId())
    const role2 = new Role("1","R&D", 'Head', 50000, department2.getDepartmentId())
    expect(role1.department_id).toBe(2)
    expect(role2.department_id).toBe(2)
});
test('check empty ID', () => {
    let expectedErrorMessage = "ID must be a positive number"

    try {
        const role = new Role('',"R&D", 'Head', 50000)
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative ID', () => {
    let expectedErrorMessage = "ID must be a positive number";

    try {
        const role = new Role(-1,"R&D", 'Head', 50000)
    } catch (error) {
        expectedError = error;
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty Name', () => {
    let expectedErrorMessage = "A name is required";

    try {
        const role = new Role(1,"", 'Head', 50000)
    } catch (error) {
        expectedError = error;

    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty title', () => {
    let expectedErrorMessage = "A title is required";

    try {
        const role = new Role(1,"R&D", '', 50000)
    } catch (error) {
        expectedError = error;

    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty salary', () => {
    let expectedErrorMessage = "Salary must be a positive number"

    try {
        const role = new Role(1,"R&D", 'Head', '')
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative salary', () => {
    let expectedErrorMessage = "Salary must be a positive number";

    try {
        const role = new Role(1,'R&D','Head',-50000)
    } catch (error) {
        expectedError = error;
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check  getName', () => {
    const department = new Department(1,"R&D")
    const role = new Role(1,department.getName(), 'Head', 50000,department.getDepartmentId())

    expect(role.getName()).toBe('R&D')
});
test('check  getId', () => {
    const department = new Department(2,"R&D")
    const role = new Role(1,department.getName(), 'Head', 50000,department.getDepartmentId())

    expect(role.getId()).toBe(1)
});
test('check  getDepartmentId', () => {
    const department = new Department(2,"R&D")
    const role = new Role(1,department.getName(), 'Head', 50000,department.getDepartmentId())

    expect(role.getDepartmentId()).toBe(2)
});
test('check  getRoleId', () => {
    const department = new Department(1,"R&D")
    const role = new Role(1,department.getName(), 'Head', 50000,department.getDepartmentId())

    expect(role.getRoleId()).toBe(1)
});
test('check  getTitle', () => {
    const department = new Department(1,"R&D")
    const role = new Role(1,department.getName(), 'Head', 50000,department.getDepartmentId())

    expect(role.getTitle()).toBe('Head')
});
test('check  getSalary', () => {
    const department = new Department(1,"R&D")
    const role = new Role(1,department.getName(), 'Head', 50000, department.getDepartmentId())

    expect(role.getSalary()).toBe(50000)
});