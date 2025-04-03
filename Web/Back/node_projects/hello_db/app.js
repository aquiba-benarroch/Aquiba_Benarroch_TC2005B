"use strict";

// Importing modules
import express from "express";

import mysql from "mysql2/promise";

const app = express();
const port = 3000;

app.use(express.json());

// Function to connect to the MySQL database

// The async keyword is used to define an asynchronous function. An asynchronous function is a function that operates asynchronously, using an implicit Promise to return its result.
// A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

async function connectToDB() {
  return await mysql.createConnection({
    host: "localhost",
    user: "card_user",
    password: "asdf1234",
    database: "cards_db",
  });
}

app.get("/api/cards", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.execute("select * from card");

    console.log(`${results.length} rows returned`);
    console.log(results);
    response.status(200).json(results);
  }
  catch (error) {
    response.status(500);
    response.json(error);
    console.log(error);
  }
  finally {
    if (connection !== null) {
      connection.end();
      console.log("Connection closed succesfully!");
    }
  }
});

app.get("/api/cards/:id", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.execute("select * from card where card_id = ?", [request.params.id]);

    console.log(`${results.length} rows returned`);
    console.log(results);
    response.status(200).json(results);
  }
  catch (error) {
    response.status(500);
    response.json(error);
    console.log(error);
  }
  finally {
    if (connection !== null) {
      connection.end();
      console.log("Connection closed succesfully!");
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});