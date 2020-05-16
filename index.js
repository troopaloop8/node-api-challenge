/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

require('dotenv').config();

const express = require('express');

const server = express();
const helmet = require("helmet");
const cors = require("cors");

const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter")

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);

server.use("/projects", projectRouter);
server.use('/actions', actionRouter);

const port = process.env.PORT || 5000;


server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

server.get("/", function (req, res) {
    const user = req.name || "newcomer";
    res.send(`welcome to node challenge ${user}`);
  });

function logger(req, res, next) {
    console.log("---------------------------------\n");
    console.log(req.method, " Request received---\n");
    console.log("At URL: ", req.url, "\n");
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  
    const currDate = new Date();
    console.log(currDate.toLocaleDateString("en-US", options));
    console.log("---------------------------------\n");
    next();
  }
  
  server.use((error, req, res, next) => {
    //other things, try to fix error and then next(), or log it, whatever
    res.status(error.status).json(error);
    
  })
  
  module.exports = server;