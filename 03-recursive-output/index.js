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

function recursiveParseAndOutput(list, result = "", stack = []) {
	if (list.length === 0) return "";

	if (list.length === 1) {
		let last = list.shift();
		stack.push(last);
		let lastRepeatNum = stack.indexOf(last);
		result += `${"\t".repeat(lastRepeatNum)}<${last}>\n`;
		while (stack.length > 0) {
			let temp = stack.pop();
			let tempRepeatNum = stack.length;
			result += `${"\t".repeat(tempRepeatNum)}</${temp}>\n`;
		}
		return result;
	} else {
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
