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

const fs = require("fs");

class Polygon {
	constructor(shapeName, sideLength) {
		this.shapeName = shapeName;
		this.sideLength = sideLength;
	}

	perimeter() {
		return this.numberOfSides * this.sideLength;
	}

	area() {}

	print() {
		console.log(
			`A ${this.shapeName} with side length ${this.sideLength} u has a perimeter of ${this.perimeter()} u and an area of ${this.area()} u^2`,
		);
	}
}

class Triangle extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
		this.numberOfSides = 3;
	}

	area() {
		return (Math.sqrt(3) / 4) * this.sideLength ** 2;
	}
}

class Square extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
		this.numberOfSides = 4;
	}

	area() {
		return this.sideLength * this.sideLength;
	}
}

class Pentagon extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
		this.numberOfSides = 5;
	}

	area() {
		return 0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * this.sideLength ** 2;
	}
}

class Circle extends Polygon {
	constructor(shapeName, sideLength) {
		super(shapeName, sideLength);
	}

	perimeter() {
		return 2 * Math.PI * this.sideLength;
	}

	area() {
		return Math.PI * this.sideLength ** 2;
	}

	print() {
		console.log(`A ${this.shapeName} with radius ${this.sideLength} u has a perimeter of ${this.perimeter()} u and an area of ${this.area()} u^2`);
	}
}

function parseInputForShapes(inputFile) {
	/**
	 * Checks inputFile contents if each row is in the proper format
	 * If so, return the rows as an array of strings
	 * Otherwise, print an error */
	const checkValidInput = filename => {
		const fileContents = fs
			.readFileSync(`${__dirname}/${filename}`, "utf-8")
			.split("\n")
			.map(x => x.trim());
		for (let i = 0; i < fileContents.length; i++) {
			let row = fileContents[i];
			if (row.split(",").length != 2) {
				console.log("Error: Invalid input. Please check that each row of the file follows the format of: <NAME_OF_SHAPE>,<SIDE_LENGTH_RADIUS>");
				process.exit(1);
			}
		}
		return fileContents;
	};

	const rows = checkValidInput(inputFile);
	for (let row of rows) {
		let shape;
		const [shapeName, sideLength] = row.split(",");
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
