// server.js
const fs = require('fs');
const http = require('http');

const FILE_PATH = './submissions.json';


if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
}

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <h1>Contact</h1>
            <form method="POST" action="/contact">
                <label>Name: <input type="text" name="name" /></label>
                <button type="submit">Submit</button>
            </form>
        `);
    }

    if (url === '/contact' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {   
            const params = new URLSearchParams(body);
            const data = Object.fromEntries(params);
            const name = data.name;

            if (!name || name.trim() === '') {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                return res.end(`
                    <h1>Error</h1>
                    <p style="color: red;">Name is required. Please go back and fill in your name.</p>
                    <a href="/contact">Go Back</a>
                `);
            }

            fs.readFile(FILE_PATH, 'utf8', (err, fileData) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Server error: could not read file');
                }

                const submissions = JSON.parse(fileData);
                const newEntry = {
                    name: name.trim(),
                    submittedAt: new Date().toISOString()
                };
                submissions.push(newEntry);

                fs.writeFile(FILE_PATH, JSON.stringify(submissions, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        return res.end('Server error: could not save submission');
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`
                        <h1>Submission Received!</h1>
                        <p>Thank you, <strong>${name.trim()}</strong>. Your name has been saved.</p>
                        <p>Submitted at: ${newEntry.submittedAt}</p>
                        <a href="/contact">Submit another</a>
                    `);
                });
            });
        });

        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});