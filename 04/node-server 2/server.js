//server.js
const http = require('http');

const server = http.createServer((request, response)=>{

  if (request.url == '/json') {
    response.setHeader('Content-type', 'application/json');

    const data = {
      id: 1,
      name: "user"
    };

    response.end(JSON.stringify(data));
  }
});

server.listen(3000);
