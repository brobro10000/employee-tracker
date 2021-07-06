const Department = require('../lib/Department')

test('create department object', () => {
    const department = new Department(1,"R&D")

    expect(department).toBe(department)
});
test('create department object', () => {
    const department = new Department(1,"R&D")

    expect(department.name).toBe("R&D")
});
test('check id', () => {
    const department1 = new Department("1","R&D")
    const department2 = new Department(1,"R&D")
    expect(department1.id).toBe(1)
    expect(department2.id).toBe(1)
});
test('check empty ID', () => {
    let expectedErrorMessage = "ID must be a positive number"

    try {
        const department = new Department('',"R&D")
    } catch (error) {
        expectedError = error
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check negative ID', () => {
    let expectedErrorMessage = "ID must be a positive number";

    try {
        const department = new Department(-1,'R&D')
    } catch (error) {
        expectedError = error;
    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check empty Name', () => {
    let expectedErrorMessage = "A name is required";

    try {
        const department = new Department(5,'')
    } catch (error) {
        expectedError = error;

    }
    expect(expectedErrorMessage).toBe(expectedError.message)
});
test('check  getName', () => {
    const department = new Department(1,"R&D")

    expect(department.getName()).toBe('R&D')
});
test('check  getId', () => {
    const department = new Department(1,"R&D")

    expect(department.getId()).toBe(1)
});