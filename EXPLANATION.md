## Design decisions

I decided to refactor the data normalization functionality into a separate helper in another file because it didn't seem to follow the single responsibility principle of the function, and furthermore the file manageEmployees, because it could throw errors related to parsing the JSON, which in many situations, is more complex than reading a local .json file (more likely an http call). This would help localize the error based on the file and specific function related to fixing the inputs. In addition, there could be more functionality added to this, such as fixing the odd value for Xavier's position: "janitor?", which goes more to the point of pulling this function out of the manageEmployees file.

## Running in test enviroment

```
yarn dev
```

* this will run the node environment using nodemon as shown in the following yarn script
  "dev"  : "yarn nodemon src/index.ts" <br>

## If I had more time

I don't have that strong of a strong background in typescript besides working with Angular front end components, so I spent a while goggling syntax  

First, I'd implement the tree creation method. If I were able to implement this easier I would have completed a lot of the other functionality besides the functions that required swapping of tree nodes

Secondly, I'd go for the low hanging fruit getters, such as:

* getBoss (simple search through employees by name and find the boss member variable for the TreeNode) -- this would be O(n) because it's a linear search
* getSubordinates (simple search through employees by name print of all the descendants O(n)

Third, I'd go for the hire and fire methods

* hire 
  * search via new hire's boss versus all the employees in the tree, top down O(n) then 
  * insert into the boss's descendants
* fire 
  * another linear search to find the employee to fire O(n), if the employee was not a boss, the fire function would exit, else 
  * randomly choose a replacement (using prebuilt random or one using a date/time function for a truer random) from the descendants, and then 
  * create temp TreeNode (employee),
    * copy over the "descendants" from the fired boss (excluding the newly promoted) and then
    * copy over the "fired" employee's boss to the replacement, then finally 
  * deleting the fired employee completely
* promote
  * linear search to find employee O(n)
  * create a temp employee (to be the new promoted employee)
  * create temp2 employee (for holding the "to be promoted" employee's descendants, if any) 
    * completely copy the "to be promoted" employee's data into temp2
    * copy over current boss's descendants (excluding promoted employee) into temp's descendants 
    * copy over current boss's boss into temp's boss
    * set current boss's boss to temp
    * set temp's name, salary, and job title to promoted employee's name, salary,...
    * set the old boss's descendants to temp2's descendants (old descendants for the promoted employee)
* demote
  * linear search to find employee O(n)
  * create temp employee and set values to that of the "to be demoted" employee
  * randomly choose someone to promote (using methods listed above)
  * create temp2 employee of the "to be promoted", only copying over the descendants
    * set temp's boss to the current boss's (person to be demoted) boss
    * set temp's descendants to the current boss's descendants (excluding the "to be promoted")
    * set temp's name, salary, and job title to promoted employee's name, salary,...
    * set old bosses descendants to temp2's descendants (old descendants for the promoted employee)

### Bonus -- duplicated functionality

The promote and demote functions. This could be replaced with a swap function with args(toBeDemoetd, toBePromoted)

