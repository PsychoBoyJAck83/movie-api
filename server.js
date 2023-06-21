const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((request, response) => {
   //response.writeHead(200, {"Content-Type": "text/plain"});
   //response.end("Hello Node!");
   let addr = request.url;
   let q = url.parse(addr, true);
   filePath = "";

   fs.appendFile("log.txt", "URL: " + addr + "\nTimestamp: " + new Date() + "\n", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Added to log.");
      }
    });
    
   if (q.pathname.includes("documentation")) {
      filePath = (__dirname + "/documentation.html");
    } else {
      filePath = "index.html";
    }
}).listen(8080);

console.log("My first Node test server is running on Port 8080.");