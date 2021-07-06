const Department = require('./Department')
const Role = require('./Role')
const arr = []
class Employee extends Role {
    constructor(id, name, title, salary, department_id, first_name, last_name, role_id, manager_id){
        super(id,name,title,salary,department_id)
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = parseInt(role_id);
        this.manager_id = parseInt(manager_id);
        if (typeof this.first_name !== 'string' || this.first_name == "") {
            throw new Error("A first name is required");
        };
        if (typeof this.last_name !== 'string' || this.last_name == "") {
            throw new Error("A last name is required");
        };
        if (typeof this.role_id !== 'number' || this.role_id < 0 || isNaN(this.role_id) == true) {
            throw new Error("Role Id must be a positive number");
        };
        if (this.manager_id < 0) {
            throw new Error("Manager ID must be a positive number");
        };
        if (isNaN(this.manager_id) == true) {
           this.manager_id = 'NULL'
        };
    }
    getFullName(){
        let output = this.first_name + " " + this.last_name
        return output
    }
    getFirstName(){
        return this.first_name
    }
    getLastName(){
        return this.last_name
    }
}
let test0 = new Department(5,'R&D')
let test1 = new Role(9,test0.getName(),'Head',50000, test0.getDepartmentId())
let test2 = new Employee(1,test1.getName(),test1.getTitle(),test1.getSalary(),test1.getDepartmentId(),'James','Monroe',test1.getRoleId())
arr.push(test0)
arr.push(test1)
arr.push(test2)
// let test2 = new Employee('1','test','test2',1,5)
console.log(test0)//?
console.log(arr)

module.exports = Employee;