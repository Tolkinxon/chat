import fs from'fs/promises';
import  serverConfig  from'../config';
const { dbPath } = serverConfig;

async function readFile(fileName:string){
    let data = await fs.readFile(dbPath(fileName), 'utf-8');
    return data ? JSON.parse(data):[];
}

async function writeFile(fileName:string, data:object){
    await fs.writeFile(dbPath(fileName), JSON.stringify(data, null, 4));
    return true;
}

export { readFile, writeFile };