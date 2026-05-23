// server.js
const fs = require('fs');
const express = require('express');
const app = express();

const FILE_PATH = './submissions.json';


if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
}

    app.use((req,res,next) => {
        console.log(`Received ${req.method} request for ${req.url}`);
        next();
    })

    app.get('/', (req,res) => {
        res.send('Welcome to the Home Page');
    })

    app.get('/contact', (req,res) => {
        res.send(`
            <h1>Contact</h1>
            <form method="POST" action="/contact">
                <label>Name: <input type="text" name="name" /></label>
                <button type="submit">Submit</button>
            </form>
            `)
    })


    app.use(express.urlencoded({ extended: false }));
    app.post('/contact', (req,res) => {
        const name = req.body.name;
            if (!name || name.trim() === '') {
                return res.send(`
                        <h1>Error</h1>
                        <p style="color: red;">Name is required. Please go back and fill in your name.</p>
                        <a href="/contact">Go Back</a>
                    `)
            }

            fs.readFile(FILE_PATH, 'utf8', (err,fileData) => {
                if(err){
                    return res.send('Server error: could not read file');
                }

                const submissions = JSON.parse(fileData);
                const newEntry = {
                    name: name.trim(),
                    submittedAt: new Date().toISOString()
                };
                submissions.push(newEntry);

                fs.writeFile(FILE_PATH, JSON.stringify(submissions,null,2), (err)   => {
                    if (err){
                        return res.send('Server error: could not save submission');
                    }
                    res.send(`
                        <h1>Submission Received!</h1>
                        <p>Thank you, <strong>${name.trim()}</strong>. Your name has been saved.</p>
                        <p>Submitted at: ${newEntry.submittedAt}</p>
                        <a href="/contact">Submit another</a>
                        `)
                })
            })

           
        })
        

    app.use((req,res) => {
        res.status(404).send('404 Not Found')
    }
    
    )

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});