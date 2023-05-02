import {User} from "./User";
import {UsersMessages} from "./UsersMessages";
import {Message} from "./Message";

const fs = require('fs');

const file = JSON.parse(fs.readFileSync('./src/data/db.json', 'utf-8'));

const users: Map<String, User> = new Map<String, User>();
const usersMessages: Map<User, UsersMessages> = new Map<User, UsersMessages>();
file['users'].forEach((val: string) => {
    const user = new User(val);
    users.set(val, user);
    usersMessages.set(user, new UsersMessages(user));
});

file['messages'].forEach((val: any) => {
    const from: User = users.get(val.from)!;
    const to: User = users.get(val.to)!;
    const date: Date = new Date(val.date);
    const message = new Message(from, to, val.message, date);
    usersMessages.get(from)!.addMessage(message);
    usersMessages.get(to)!.addMessage(message);
});

export const parseUser = function (): Map<String, User> {
    return users;
}

export const parseData = function (): Map<User, UsersMessages> {
    return usersMessages;
}