

class Department {
    constructor(id,name) {
        this.id = parseInt(id);
        this.name = name;
        if (typeof this.id !== 'number' || this.id < 0 || isNaN(this.id) == true) {
            throw new Error("ID must be a positive number");
        };
        if (typeof this.name !== 'string' || this.name == "") {
            throw new Error("A name is required");
        };
    }
    getId() {
        return this.id;
    };

    getName() {
        return this.name;
    };
}

module.exports = Department