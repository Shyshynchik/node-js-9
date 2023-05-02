import {User} from "./User";

export class Message {
    private readonly _fromUser: User;

    private readonly _toUser: User;

    private readonly _message: string;

    private readonly _date: Date;


    constructor(fromUser: User, toUser: User, message: string, date: Date) {
        this._fromUser = fromUser;
        this._toUser = toUser;
        this._message = message;
        this._date = date;
    }


    get fromUser(): User {
        return this._fromUser;
    }

    get toUser(): User {
        return this._toUser;
    }

    get message(): string {
        return this._message;
    }

    get date(): Date {
        return this._date;
    }
}