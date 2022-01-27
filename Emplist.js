import fs from 'fs';
import http, { createServer } from 'http';
import { parse } from 'querystring';
const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url == '/') {
        let data = fs.readFileSync('Home.html');
        let list = fs.readFileSync('details.txt');
        res.write(`${data} ${list}
        </tbody>
        </table>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        </body>
        </html>`);
        res.end()
    }
    else if (req.method === 'GET' && req.url == '/form') {
        let data = fs.readFileSync('Form2.html');
        res.write(data);
        res.end()
    }
    else if (req.method === 'POST') {
        let body = ''
        req.on('data', (data) => {
            body = parse(data.toString())
            fs.appendFile('details.txt', `<tr><td>${body.name}</td><td>${body.email}</td><td>${body.phone}</td><td>${body.age}</td></tr>`, (err) => { if (err) throw err; console.log("file upadated") })
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            let data = fs.readFileSync('Form2.html');
            res.write(data);
            res.end()
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });

        res.end(`<h1>404 ERROR could not find that Page</h1>`);
    }

});
server.listen(8888);
