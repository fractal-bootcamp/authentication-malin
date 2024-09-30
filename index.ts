import express from "express";
import path from "path";
import cors from "cors";
import { authenticate, AUTH_SECRET } from "./middleware/middleware";
import {sign} from "jsonwebtoken";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json()); //parse JSON request bodies

// create some dummy users in an object with name and password set
const users = {
  "1": {
    name: "Malin",
    password: "1234567890"
  },
  "2": {
    name: "Cece",
    password:"9876543210"
  }
};

// generate a token for a fully authenticated user
const generateToken = (id: string) => {
  // sign is a function which takes a payload and signature and generates
  // a jwt token. signed with the secret using HS256 algorithm
  const token = sign({id}, AUTH_SECRET, {algorithm: "HS256", expiresIn: "1h"});
  return token;
};

app.get("/", (req, res) => {
  res.send("hello!")
})

// create a route for accepting login requests
app.post("/login", async (req, res) => {
  // we will recieve a request body with name and password
  // we want to parse that out
  const {name, password} = req.body

  // if either name or password is missing, reject the request
  if (!name || !password) {
    res.status(401).json({message: "Unauthorised"});
    return;
  }

  // check whether the user exists in memory
  // Object.entries retrieves an array on an objects enumerable property pairs (e.g. [id, {name: password}])
  // find: Returns the value of the first element in the array where predicate is true, and undefined otherwise.
  // the callback function ([,user]) is using a destructuring array to assign the users objects to two variables
  // but since there is an empty first variable we ignore the first object element {1: ...}
  // and we store the second variable as the second object element {name: , password: }
  const foundEntry = Object.entries(users).find(([,user]) => user.name === name);
  
  // if the user exists, assign their {name:, password:} object to variable 'user'
  const user = foundEntry ? foundEntry[1] : undefined;
  // if the user exists, assign their id (e.g. "1") string to the variable 'id'
  const id = foundEntry ? foundEntry[0] : undefined;

  // if we cannot find an id for the user, return unauthorised
  // the following two checks determines whether the user is a valid user
  if (!id) {
    res.status(401).json({message:"Unauthorised"});
    return;
  }

  // if the user exists and the users password matches the stored password
  // generate the token using the generateToken function we specified earlier
    // with the payload passed to the sign function being the users "id"
  // send a status 200 (OK) message back to the client
  // send a json respond back with "Authenticated" + the generated token
  if (user && user.password === password) {
    res.status(200).json({message: "Authenticated", token: await generateToken(id)})
  } else {
    // else if user cannot be validated, send an unauthorised json response back
    res.status(401).json({message: "Unauthorised"});
  }

app.get("/authenticated", authenticate, (req, res) => {
  // object destructuring
  // in the users object search for the entry with key "id" and return the name field
  const { name } = users[req.user.id]

  res.send(name + " is authenticated!");
})

})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
console.log(`server is running on http://localhost:${PORT}`)
console.log("Hello via Bun!");
