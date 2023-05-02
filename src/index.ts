import {Request, Response} from "express";
import {parseData, parseUser} from "./data/JsonDataParser";
import {User} from "./data/User";
import {UsersMessages} from "./data/UsersMessages";

const express = require('express');

let users: Map<String, User> = parseUser();
let usersMessages: Map<User, UsersMessages> = parseData();

const app = express();
console.log(users, usersMessages)

app.get('/', function (req: Request, res: Response) {
   res.send("Hello world");
});

app.listen(3000);