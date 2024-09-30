import type { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from "jsonwebtoken";

// QUESTION: why does the generateToken() function in index.ts give a type error if i remove the || "default" below?
export const AUTH_SECRET = process.env.AUTH_SECRET || "deafult";

export const authenticate: RequestHandler = async (req, res, next) =>  {
  // request header recieved from client is checked for authorization field
  // field is parsed and split by a space so we have an array of ["Bearer", token]
  const token = req.headers.authorization?.split(" ")[1]

  // if no token is found, send unauthorised response
  if (!token) {
    res.status(401).json({ message: "Unauthorised" });
    return;
  }

  // decode the token using the secret and store that as a variable id
  // QUESTION: how does the id destructuring work here? what is the verify return type?
  const { id } = verify(token, AUTH_SECRET)

  // add a new property key "user" to the request object and set it to have a value of an objet with id: id
  req.user = {
    id: id,
  };

  next();
};