const Department = require('./Department')
class Role extends Department {
    constructor(id, name, title, salary, department_id) {
        super(id, name)
        this.role_id = parseInt(id)
        this.title = title;
        this.salary = parseFloat(salary)
        this.department_id = parseInt(department_id);
        if (typeof this.title !== 'string' || this.title == "") {
            throw new Error("A title is required");
        };
        if (typeof this.salary !== 'number' || this.salary < 0 || isNaN(this.salary) == true) {
            throw new Error("Salary must be a positive number");
        };
    }
    getRoleId(){
        return this.role_id;
    }
    getTitle(){
        return this.title;
    }
    getSalary() {
        return this.salary;
    }
}

module.exports = Role