export class Product {
    name: string;
    price: number;
    quantity: number;
    description: string;
    constructor(name: string, price: number, quantity: number, description: string) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    };
    [index: string]: string | number;
}
declare global {
    interface String {
        contains(searchString: string, position: number): boolean;
        starts(pattern: string): boolean;
        ends(pattern: string): boolean;
    }
    interface Number {
        ['>'](value: number): boolean;
        ['<'](value: number): boolean;
        ['<='](value: number): boolean;
        ['>='](value: number): boolean;
        ['='](value: number): boolean;
    }
}
String.prototype.contains = String.prototype.includes;
String.prototype.starts = String.prototype.startsWith;
String.prototype.ends = String.prototype.endsWith;
Number.prototype['>'] = function(value) {
    return this > value;
}
Number.prototype['<'] = function(value) {
    return this < value;
}
Number.prototype['='] = function(value) {
    return this == value;
}
Number.prototype['<='] = function(value) {
    return this <= value;
}
Number.prototype['>='] = function(value) {
    return this >= value;
}

export function filter(arr: Array<Product>, str: string): Array<Product> {
    const strArr = str.split('&');
    const props = strArr.map(item => ({
        ops: item.split(/(-|>=?|<=?|=)/).filter((v) => v && /[^-]/.test(v))
    }));

    const newArr = arr.filter(value => {
        for (let prop of props) {
            if (prop.ops[1].contains('=', 0) || prop.ops[1].contains('>', 0) || prop.ops[1].contains('<', 0)) {
                if (!eval(`value.${prop.ops[0]}['${prop.ops[1]}'](prop.ops[2])`))
                    return false;
            }
            else {
                if (!eval(`value.${prop.ops[0]}.${prop.ops[1]}(prop.ops[2])`))
                    return false;
            }
        }
        return true;
    })
    return newArr;
}
