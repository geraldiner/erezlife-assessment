/**
 * NOTES
 * Input: raw string of basic html
 * No parsing library
 * Output: html structure with indentented levels
 * No need to handle singleton, self-closing tags
 * If the html is not valid, print an error
 *
 * PLAN
 * @param: <string> input - string of html
 *
 * @return: void - outputs formatted html, print error
 *
 * QUESTIONS
 * ?? Is it meant to output to the console or a file an .html file?
 * ?? What kind of error should be produced?
 * ?? Will every tag in the string be valid? ie. either be <> or </>
 */

/**
 * PSEUDOCODE
 * Follow the same logic from the other problem, but first we have to make sure it's valid
 * Separate function for determining if the string is valid
 * -- If using the code from the other problem, I need to get it in list form- What's the best delimiter to split on? "><" but we don't want to get rid of them completely so we can differentiate the opening tags from the closing tags
 * If it is valid parse and print (use code from other problem)
 * Otherwise print Error message
 */

/*---- TEST CASES ---*/
const input1 = "<html><body><div><a></a></div></body></html>";
const input2 = "<html><body><div></a></body></html>";
const input3 = "<html><body><div><a></div></a>";

function parseAndOutput(str) {
	const checkValidInput = input => {
		let tags = input
			.split("<")
			.filter(x => x !== "")
			.map(a => "<" + a);

		const createPairsMap = tagsList => {
			let map = {};
			for (let tag of tagsList) {
				if (!map.hasOwnProperty(tag) && !Object.values(map).includes(tag)) {
					map[tag] = tag[0] + "/" + tag.slice(1);
				}
			}
			return map;
		};
		let pairs = createPairsMap(tags);
		let stack = [];
		for (let i = 0; i < tags.length; i++) {
			if (pairs[tags[i]]) {
				stack.push(tags[i]);
			} else {
				let temp = stack.pop();
				if (tags[i] !== pairs[temp]) {
					return new Error("Invalid input. Please check that there are no missing tags and/or the tags are not mismatched.");
				}
			}
		}
		if (stack.length === 0) {
			return Object.keys(pairs);
		} else {
			return new Error("Invalid input. Please check that there are no missing tags and/or the tags are not mismatched.");
		}
	};

	try {
		const tags = checkValidInput(str);
		console.log(recursiveParseAndOutput(tags));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

function recursiveParseAndOutput(list, result = "", stack = []) {
	if (list.length === 0) return "";

	if (list.length === 1) {
		let last = list.shift();
		stack.push(last);
		let lastRepeatNum = stack.indexOf(last);
		result += `${"\t".repeat(lastRepeatNum)}${last}\n`;
		while (stack.length > 0) {
			let temp = stack.pop();
			let tempRepeatNum = stack.length;
			result += `${"\t".repeat(tempRepeatNum)}${temp[0] + "/" + temp.slice(1)}\n`;
		}
		return result;
	} else {
		let letter = list.shift();
		stack.push(letter);
		let repeatNum = stack.indexOf(letter);
		result += `${"\t".repeat(repeatNum)}${letter}\n`;
		return recursiveParseAndOutput(list, result, stack);
	}
}

parseAndOutput(input1);
/* Expected output
<html>
	<body>
		<div>
			<a></a>
		</div>
	</body>
</html>
*/

parseAndOutput(input2);
/* Expected output
  Error: Invalid input. Please check that there are no missing tags and/or the tags are not mismatched.
*/
parseAndOutput(input3);
/* Expected output
  Error: Invalid input. Please check that there are no missing tags and/or the tags are not mismatched.
*/
