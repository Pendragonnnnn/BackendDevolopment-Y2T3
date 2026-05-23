// server.js
import express from  'express';
import courses from "./course.js";
import logger from "./logger.js"
import auth from "./auth.js"
import validateQuery from './validateQuery.js';


const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.use(logger);
app.use(auth);

app.get('/departments/:dept/courses', validateQuery ,(req, res) => {
    const { dept } = req.params;
    const { level, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    const {min, max} = req.validatedCredits;

    const result = courses.filter((c) => {
        if (c.department.toLowerCase() !== dept.toLowerCase()){
            return false;
        }
        if (level && c.level.toLowerCase() !== level.toLowerCase()){
            return false;
        }
        if((!isNaN(min)) && c.credits < min){
            return false;
        }
        if((!isNaN(max)) && c.credits > max){
            return false;
        }
        if(semester && c.semester.toLowerCase() !== semester.toLowerCase()){
            return false;
        }
        if(instructor && !c.instructor.toLowerCase().includes(instructor.toLowerCase())){
            return false;
        }
        return true;
    })

    if (result.length === 0){
        return res.status(404).send("No matching course")
    }

    return res.status(200).json({
        department: dept.toUpperCase(),
        count: result.length,
        courses: result,
    })

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
