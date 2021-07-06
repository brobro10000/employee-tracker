const Role = require('../lib/Role')

test('create role object', () => {
    const role = new Role(1,"R&D", 'Head', 50000)

    expect(role.name).toBe("R&D")
});
test('check id', () => {
    const department1 = new Role(1,"R&D", 'Head', 50000)
    const department2 = new Role("1","R&D", 'Head', 50000)
    expect(department1.id).toBe(1)
    expect(department2.id).toBe(1)
});
test('check name', () => {
    const department = new Role(1,"R&D", 'Head', 50000)

    expect(department.name).toBe('R&D')
});

test('check title', () => {
    const department = new Role(1,"R&D", 'Head', 50000)

    expect(department.title).toBe('Head')
});
test('check salary', () => {
    const department1 = new Role(1,"R&D", 'Head', "50000")
    const department2 = new Role("1","R&D", 'Head', 50000)
    const department3 = new Role(1,"R&D", 'Head', "50000.01")
    const department4 = new Role("1","R&D", 'Head', 50000.01)
    expect(department1.salary).toBe(50000)
    expect(department2.salary).toBe(50000)
    expect(department3.salary).toBe(50000.01)
    expect(department4.salary).toBe(50000.01)
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
        const role = new Role(1,"R&D", 'Head', "")
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative salary', () => {
    let expectedErrorMessage = "Salary must be a positive number";

    try {
        const role = new Role(1,"R&D", 'Head', -50000)
    } catch (error) {
        expectedError = error;
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check  getName', () => {
    const role = new Role(1,"R&D", 'Head', 50000)

    expect(role.getName()).toBe('R&D')
});
test('check  getId', () => {
    const role = new Role(1,"R&D", 'Head', 50000)

    expect(role.getId()).toBe(1)
});
test('check  getTitle', () => {
    const role = new Role(1,"R&D", 'Head', 50000)

    expect(role.getTitle()).toBe('Head')
});
test('check  getSalary', () => {
    const role = new Role(1,"R&D", 'Head', 50000)

    expect(role.getSalary()).toBe(50000)
});