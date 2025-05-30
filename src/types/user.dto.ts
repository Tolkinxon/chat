export interface UserInterface {
    id?:number,
    username?: string, 
    email:string,
    password: string,
    createdAt?: string;
    updatedAt?: string | null 
}