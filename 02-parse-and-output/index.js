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

console.log(input1.split("<"));

function parseAndOutput(str) {}

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
