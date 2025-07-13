const http = require('http');
const app = require('./app');
const port = process.env.PORT;
const address = process.env.ADDRESS;

const server = http.createServer(app);

server.listen(port, address,()=>{
    console.log(`Server is running on port : ${port}`);
});