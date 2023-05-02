import {User} from "./User";
import {Message} from "./Message";

export class UsersMessages {
    private readonly _user: User;

    private readonly _messages: Message[];


    constructor(user: User) {
        this._user = user;
        this._messages = [];
    }


    get user(): User {
        return this._user;
    }

    get messages(): Message[] {
        return this._messages;
    }

    public addMessage(message: Message): void {
        this._messages.push(message);
    }
}