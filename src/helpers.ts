import employeesObject from './employees.json'

/** 
 * searches through employees and looks for names that contain '@' char and grabs the word before the @ and makes it the name 
 * @returns {void}
 * 
 * Referenced these tutorials
 * split tutorial:         https://www.tutorialspoint.com/typescript/typescript_string_split.htm
 * changing case of name:  https://bobbyhadz.com/blog/typescript-string-capitalize-first-letter
* */ 

export function noralizeDataNames() {
    console.log("Normalizing JSON file...")
    employeesObject.employees.forEach(e => {
        if (e.name.includes('@')) {
            let line: string[] = e.name.split("@", 1);
            let newName: string = line[0];  // grab parts of word before @ symbol
            // capitalize first letter and lower case rest of first name
            newName = newName.charAt(0).toUpperCase() + newName.slice(1).toLowerCase();
            e.name = newName;
        }
    });
}