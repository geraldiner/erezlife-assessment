/**
 * NOTES
 * SQL query to list student id, name, and number of applications the student has
 * -- report 0 for student with no applications
 * List students by number of applications, then alphabetically by name
 *
 * PLAN
 * SQL is a query language so I'm not sure what that means about using it with JavaScript-
 * If it's just the query that would be used in a bigger project, I can look up the rules/syntax to figure it out
 *
 * QUESTIONS
 * ?? Should it even be saved in a JavaScript file?\
 * ?? Is the sort by number of apps ascending or descending? Same for alphabetically by name?
 */

/**
 * PSEUDOCODE
 * student_id = can be found in the application table
 * name = Use student_id from application table to match the id from the student table and get the name
 * number_of_apps = Count the number of rows in the application table that are the same student_id. If none, report 0.
 * List should be sorted by number_of_apps, then by name
 */

// Get student_id and name from the two tables
// https://www.tutorialspoint.com/sql/sql-select-query.htm
SELECT student_id, name
  FROM student, application
  WHERE student.id = application.student_id

// Counting applications
// https://www.tutorialspoint.com/sql/sql-expressions.htm
COUNT(score) AS number_of_apps FROM application

// Sort by number_of_apps, then by name
// https://www.tutorialspoint.com/sql/sql-order-by.htm
ORDER BY number_of_apps DESC, name ASC

// Display student with no apps as 0 ??
// https://stackoverflow.com/questions/14793057/how-to-include-zero-0-results-in-count-aggregate
// https://www.tutorialspoint.com/sql/sql-left-joins.htm
// From the explanation of LEFT JOIN- will return all rows from the left table (student) even if there are no matches in the right table (application). Usually will display "NULL" but because of COUNT(), it will display 0 instead.
// ON is what they're being matched on- the id in the student table is the same as the student_id in the application table
SELECT student.id, name, COUNT(application.student_id) AS "number_of_apps" FROM student
	LEFT JOIN application ON student.id = application.student_id
GROUP BY student.id
ORDER BY number_of_apps DESC, name ASC

/* 
student
+----+--------------+----------------+
| id | name         | address        |
+----+--------------+----------------+
|  1 | John         |  Apple St      |
|  2 | Regine       |  Banana Rd     |
|  3 | Maddex       |  Coconut Creek | 
|  4 | Jean         |  Dandelion Dr  |
|  5 | Elixandrea   |  Eggland Blvd  | 
+----+--------------+----------------+

application
+----+----------+---------------+
| id | score    | student_id    |
+----+----------+---------------+
|  1 | 79       |  2            |
|  2 | 64       |  1            |
|  3 | 64       |  3            | 
|  4 | 57       |  2            |
|  5 | 67       |  3            | 
|  6 | 73       |  5            | 
|  7 | 94       |  3            |
+----+----------+---------------+

expected output from query
+----+--------------+----------------+
| id | name         | number_of_apps |
+----+--------------+----------------+
|  3 | Maddex       |  Apple St      |
|  2 | Regine       |  Banana Rd     |
|  5 | Elixandrea   |  Coconut Creek | 
|  1 | John         |  Dandelion Dr  |
|  4 | Jean         |  Eggland Blvd  | 
+----+--------------+----------------+
*/