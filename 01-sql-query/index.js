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
SELECT name, student_id
  FROM student, application
  WHERE student.id = application.student_id

// Counting applications
COUNT(score) FROM application

// Sort by number_of_apps, then by name
ORDER BY number_of_apps DESC, name DESC