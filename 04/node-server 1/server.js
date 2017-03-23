//server.js
const http = require('http');

const server = http.createServer((request, response)=>{
  console.log('Servidor acessado!');
});

server.listen(3000);
