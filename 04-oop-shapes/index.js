/**
 * NOTES
 * OOP approach
 * Reads a CSV file - input.csv
 * Each row should contain two columns: [name of shape],[side length/radius]
 * Outputs text describing the perimeter and area of each shape, otherwise an error if input is invalid
 *
 * Should accept: triangle, square, pentagon, circle
 *
 * Sample data:
 * triangle,3.5
 * circle,2
 *
 * Sample output:
 * A triangule with side length 3.5 u has a perimeter of 10.5 u and an area of 5.30 u^2
 * A circle with radius 2 u has a perimeter of 12.57 u and an area of 12.57 u^2
 *
 * Create separate CSV file where each ro represents a different test case the program can handle
 *
 * PLAN
 * @param: <string> inputFile - CSV filename being fed to the program
 *
 * @return: void - outputs a statement about perimeter, area per shape; otherwise an error if input is invalid
 *
 * QUESTIONS
 * ?? What kind of error should be thrown when invalid input is found? And does that mean the processing should end there? Or should each valid row of data still be printed? Should it check that the entire input file is valid first?
 * -- Based on the wording "an error if the input data is invalid" I'm assuming it should check the entire input file is valid first.
 * ?? I'm assuming it should round to 2 decimal places and follow standard rounding rules (i.e. no Math.floor or Math.ceil).
 * ?? What happens when a side length/radius is 0? (If that's even possible) What happens with really big numbers?
 */

/**
 * PSEUDOCODE
 * Polygon class
 * - constructor takes shape name and side length to set properties to those given args
 *
 * perimeter - will vary based on shape
 *
 * area - will vary based on shape
 *
 * print - only circle is different, uses radius instead of side length
 *
 * Triangle
 * set numberOfSides to 3
 * rewrite area, perimeter methods
 *
 * Square
 * set numberOfSides to 4
 * rewrite area, perimeter methods
 *
 * Pentagon
 * set numberOfSides to 5
 * rewrite area, perimeter methods
 *
 * Circle
 * rewrite area, perimeter, print methods
 *
 * 1) check if input file is valid- line by line check that the row can be split by a comma and the first part is a string, the second part is a number
 * -- print error otherwise
 * 2) go through each shape line by line:
 * -- create Shape -- switch statement for each of the 4 shapes
 * -- print info
 */

// FileSystem package to work with csv files
const fs = require("fs");

// Parent Polygon class with initial constructor, methods
// Among the four necessary shapes, perimeter is calculated the same way and the output statement uses the same wording for 3 of them (circle is oddball)
// However, they have different area calculations, so that is specified in the child classes themselves
// There is also a round method, which helps to round the numbers to 2 decimal places
// -- BUG: Rounds 5.3044 to 5.3 instead of 5.30
// ?? Is it best practice to leave a method undefined the way area() is?
class Polygon {
	constructor(shapeName, sideLength) {
		this.shapeName = shapeName;
		this.sideLength = sideLength;
	}

	// Calculates and returns the perimeter for the polygon
	perimeter() {
		return this.round(this.numberOfSides * this.sideLength);
	}

	// Calculates and returns the area for the polygon
	area() {}

	// Prints a statement describing the polygon and its side length, perimeter, and area
	print() {
		console.log(
			`A ${this.shapeName} with side length ${this.sideLength} u has a perimeter of ${this.perimeter()} u and an area of ${this.area()} u^2`,
		);
	}

	// Rounds and returns the given num to 2 decimal points
	round(num) {
		return +num.toFixed(2);
	}
}

// Triangle class is based on the Polygon class, but the area method is defined here. On initialization, after using the parent constructor, also adds a numberOfSides property since the perimeter calculation relies on the number of sides.
class Triangle extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
		this.numberOfSides = 3;
	}

	area() {
		return this.round((Math.sqrt(3) / 4) * this.sideLength ** 2);
	}
}

// Square class is based on the Polygon class, but the area method is defined here. On initialization, after using the parent constructor, also adds a numberOfSides property since the perimeter calculation relies on the number of sides.
class Square extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
		this.numberOfSides = 4;
	}

	area() {
		return this.round(this.sideLength * this.sideLength);
	}
}

// Pentagon class is based on the Polygon class, but the area method is defined here. On initialization, after using the parent constructor, also adds a numberOfSides property since the perimeter calculation relies on the number of sides.
class Pentagon extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
		this.numberOfSides = 5;
	}

	area() {
		return this.round(0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * this.sideLength ** 2);
	}
}

// Circle class is based on the Polygon class, but all the methods are (re)defined here.
class Circle extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
	}

	perimeter() {
		return this.round(2 * Math.PI * this.sideLength);
	}

	area() {
		return this.round(Math.PI * this.sideLength ** 2);
	}

	print() {
		console.log(`A ${this.shapeName} with radius ${this.sideLength} u has a perimeter of ${this.perimeter()} u and an area of ${this.area()} u^2`);
	}
}

function parseInputForShapes(inputFile) {
	/**
	 * Helper function to check if each row of the inputFile in the proper format
	 * If so, return the rows as an array of strings
	 * Otherwise, throw an error */
	const checkValidInput = filename => {
		// Reads the fule, splits it by each new line (to get the rows), and trims any extra whitespace on either side. fileContents is now an array of strings (rows of the csv)
		const fileContents = fs
			.readFileSync(`${__dirname}/${filename}`, "utf-8")
			.split("\n")
			.map(x => x.trim());
		// Goes through each row of the fileContents list to check that it is in the proper format: <NAME_OF_SHAPE>,<SIDE_LENGTH_RADIUS>
		// Splits on the comma (csv), and the resulting array should have a length of 2
		// If not, throw an Error
		// ?? Should it have additional checks if the first part is a string/shape name and the second part is a number?
		for (let i = 0; i < fileContents.length; i++) {
			let row = fileContents[i];
			if (row.split(",").length != 2) {
				throw new Error("Error: Invalid input. Please check that each row of the file follows the format of: <NAME_OF_SHAPE>,<SIDE_LENGTH_RADIUS>");
			}
		}
		// If it makes it through the for loop without the error, return fileContents
		return fileContents;
	};
	// Go through each row and split on the comma to get the info as separate pieces of info.
	// Create a shape based on the shapeName and pass the sideLength for the constructor
	const rows = checkValidInput(inputFile);
	for (let row of rows) {
		let shape;
		// Destructure the resulting array from the split
		const [shapeName, sideLength] = row.split(",");
		// Switch statement based on the four types of shapes expected, use toLowerCase() just in case there's weird casing in the csv
		switch (shapeName.toLowerCase()) {
			case "triangle":
				shape = new Triangle(shapeName, sideLength);
				break;
			case "square":
				shape = new Square(shapeName, sideLength);
				break;
			case "pentagon":
				shape = new Pentagon(shapeName, sideLength);
				break;
			case "circle":
				shape = new Circle(shapeName, sideLength);
				break;
			default:
				// Since the switch statement needs a default, use the Polygon parent class
				// ?? But as mentioned above, the area method isn't defined in the Polygon parent, so what happens if something like "hexagon" is passed?
				shape = new Polygon(shapeName, sideLength);
				break;
		}
		shape.print();
	}
}

/*---- TEST CASES ---*/
parseInputForShapes("input1.csv");
/* Expected output
A triangle with side length 3.5 u has a perimeter of 10.5 u and an area of 5.30 u^2
A circle with radius 2 u has a perimeter of 12.57 u and an area of 12.57 u^2
A square with side length 4 u has a perimeter of 16 u and an area of 16 u^2
A pentagon with side length 4.75 u has a perimeter of 23.75 u and an area of 38.82 u^2
*/

parseInputForShapes("input2.csv");
/* Expected output
  Error: Invalid input. Please check that each row of the file follows the format of: [name of shape],[side length/radius]
*/
