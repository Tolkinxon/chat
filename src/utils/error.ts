export class CliesntError extends Error{
    status:number
    constructor(message:string, status:number){
        super(message);
        this.message = `ClientError ${message}`;
        this.status = status;
    }
}

export class ServerError extends Error{
    status:number;
    constructor(message:string){
        super(message);
        this.message = `ServerError ${message}`;
        this.status = 500;
    }
}

