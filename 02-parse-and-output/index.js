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
 * ?? Will every tag in the string be valid? ie. either be <> or </>? Will the string every look like <html><div>a</div></html>?
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
	// Helper function to check if the given string is valid, ie. tags are matched
	const checkValidInput = input => {
		// Split on "<" to avoid accidentally losing the "/", which are needed to check if the closing tags are valid
		// CON: Results in one empty string, so need to filter it out and put the "<" back on the string afterwards
		// ?? Is there a better way to do this?
		let tags = input
			.split("<")
			.filter(x => x !== "")
			.map(a => "<" + a);

		// Helper function to create a map of the given tags, where the opening tag is the key and the closing tag is the value - this will help in checking if the string is valid in terms of tags matching
		// ?? Is it best practice to have a helper function in a helper function? At least in this example, I don't expect to use this function anywhere else.
		const createPairsMap = tagsList => {
			let map = {};
			for (let tag of tagsList) {
				if (!map.hasOwnProperty(tag) && !Object.values(map).includes(tag)) {
					map[tag] = tag[0] + "/" + tag.slice(1);
				}
			}
			return map;
		};

		// Check if the string is valid
		// Using the pairs map and a stack, go through the original list of tags
		// If the current tag (tags[i]) has a value in pairs (pairs[tags[i]), that means it's an opening tag and add this to the stack to keep track of the open tags so far.
		// If it doesn't, it could be a closing tag, so check that it's a closing tag for the open tag that was last seen (temp)
		// If the current tag is not equal to the closing tag value of temp (pairs[temp]), return an Error
		let pairs = createPairsMap(tags);
		let stack = [];
		for (let i = 0; i < tags.length; i++) {
			if (pairs[tags[i]]) {
				stack.push(tags[i]);
			} else {
				let temp = stack.pop();
				if (tags[i] !== pairs[temp]) {
					throw new Error("Invalid input. Please check that there are no missing tags and/or the tags are not mismatched.");
				}
			}
		}
		// If it gets through the for loop, check that the stack is empty (stack.length === 0), which means all opening tags had closing tags in the right place. If so, return the keys of the pairs map (list to be used in the recursiveParseAndOutput function from 03-recursive-output).
		// Otherwise, return an Error
		if (stack.length === 0) {
			return Object.keys(pairs);
		} else {
			throw new Error("Invalid input. Please check that there are no missing tags and/or the tags are not mismatched.");
		}
	};

	const tags = checkValidInput(str);
	console.log(recursiveParseAndOutput(tags));
}

function recursiveParseAndOutput(list, result = "", stack = []) {
	if (list.length === 0) return result;

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
