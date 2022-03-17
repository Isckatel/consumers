class Consumer {
    #id = Number();
    #name = String();
    #type = Number();
    #number = Number();

    constructor(id, name, type, number) {
        if (typeof id !== 'number' 
            || id < 0 || id > 4294967295
            || !Number.isInteger(id) ) {
                id = -1;
        }
        if (typeof name !== 'string'
            || name.length > 255) {
                name = " ";
        }
        if (typeof type !== 'number' 
            || !Number.isInteger(type)
            || type !== 1 && type !== 2 ) {
                type = -1;
        }
        if (typeof number !== 'number' 
            || !Number.isInteger(number)
            || String(number).length !== 13) {
                number = -1;
        }
        this.#id = id;
        this.#name = name;
        this.#type = type;
        this.#number = number;
    }
    get id() {return this.#id;}
    set id(value) {
        if (typeof value == 'number' 
        && value >= 0 && value < 4294967295
        && Number.isInteger(value)) {
            this.#id = value;
        }    
    }
    get name() {return this.#name;}
    set name(value) {
        if (typeof value == 'string' 
        && value.length<=255) {
            this.#name = value;
        }    
    }
    get type() {return this.#type;}
    set type(value) {
        if (typeof value == 'number' 
        && (value == 1 || value == 2)
        && Number.isInteger(value)) {
            this.#type = value;
        }    
    }
    get number() {return this.#number;}
    set number(value) {
        if (typeof value == 'number' 
        && String(value).length == 13
        && Number.isInteger(value)) {
            this.#number = value;
        }    
    }
    isValid() {
        if (this.#id !== -1 && this.#name !== " " && this.#type !== -1 && this.#number !== -1) {
            return true;
        } else {
            return false;
        }
    }
}
export default  Consumer;