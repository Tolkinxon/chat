export interface ServerConfigInterface {
    PORT: number,
    TOKEN_KEY: string,
    dbPath: (fileName:string) => string
}



