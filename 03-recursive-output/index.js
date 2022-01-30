/**
 * NOTES
 * Input: array of letters (not necessarily strings- or are they?)
 * Output: structured like html (indented levels), but not necessarily
 * Very similar to the pervious question, but in an array and done recursively
 *
 * PLAN
 * @param: <array> list - of letters
 *
 * @return: void - outputs formatted html-like structure (indented levels)
 *
 * QUESTIONS
 * ?? Is it correct to assume that the letters in the array are strings?
 * ?? How should an empty list be handled? Returns an empty string? Or gives an error?
 */

/**
 * PSEUDOCODE
 * Base cases:
 * Empty list => empty string
 * 1 letter => <a></a>
 *
 * Default case:
 * 2+ letters =>
 * Call 1:
 * -- input: ["a", "b"]
 * -- result:  <a>\n (comes from calling the letter from the start of the list)
 * -- ?? How do we remember what it was so we can add the closing tag at the end? Maybe a dictionary? Or a stack to keep track of what's already been called?
 * -- Ex: pairs {
 *  "<a>": "</a>"
 * }
 * -- Ex: stack: ["a"]
 * Call 2:
 * -- input: ["b"] - will go to the base case of one letter, but it needs to be indented, so maybe we need to check if the result is already empty?
 * The number of tabs is related to the index of the letter in the original list- so maybe we preserve that list? Make a copy and use that for subsequent calls
 * -- result: <a>\n\t<b>\n\t</b></a>
 * -- stack: ["a"]
 */

/**
 * @param: list - list of letters
 * @param: result - string for the final output
 * @stack: list - list of letters that have already been added to result
 *
 * @return: result - final string output
 */
function recursiveParseAndOutput(list, result = "", stack = []) {
	// If there are no letters in the list, return result, which is initialized as an empty string if not passed as an argument
	if (list.length === 0) return result;

	// Base case: 1 letter in list, start adding closing tags with n number of tabs (where n is the index of the letter in stack, eg. a is the first letter, which is added to the stack first and has an index of 0, so there should be 0 tabs on the opening and closing tags)
	if (list.length === 1) {
		// last letter in the list
		let last = list.shift();
		// add it to the current stack
		stack.push(last);
		// get the index of last in the stack, to be used for tabs
		let lastRepeatNum = stack.indexOf(last);
		// add the closing tag for the last letter in the list
		result += `${"\t".repeat(lastRepeatNum)}<${last}>\n`;
		// add the closing tags for the rest of the letters in the list
		while (stack.length > 0) {
			let temp = stack.pop();
			let tempRepeatNum = stack.length;
			result += `${"\t".repeat(tempRepeatNum)}</${temp}>\n`;
		}
		return result;
	} else {
		// Default case: 2+ letters in the list, add the opening tag for the current letter with a certain amount of tabs, add it to the stack to keep track of all the letters so far, and call the function again with the new list, result, stack.
		let letter = list.shift();
		stack.push(letter);
		let repeatNum = stack.indexOf(letter);
		result += `${"\t".repeat(repeatNum)}<${letter}>\n`;
		return recursiveParseAndOutput(list, result, stack);
	}
}

/*---- TEST CASES ---*/
const input_empty = [];
const input_single = ["a"];
const input_two = ["a", "b"];
const input1 = ["a", "b", "c", "d", "e", "f"];

console.log(recursiveParseAndOutput(input_empty));
/* Expected output
(empty string)
*/

console.log(recursiveParseAndOutput(input_single));
/* Expected output
<a>
</a>
*/

console.log(recursiveParseAndOutput(input_two));
/* Expected output
<a>
	<b>
  </b>
</a>
*/

console.log(recursiveParseAndOutput(input1));
/* Expected output
<a>
	<b>
		<c>
			<d>
				<e>
					<f>
          </f>
				</e>
			</d>
		</c>
	</b>
</a>
*/
