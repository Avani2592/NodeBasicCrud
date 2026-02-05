/*const fs=require('fs/promises');
const path=require('path');
const dbFilePath=path.join(__dirname,'../data/db.json');
async function readDB(){
     
    try{
    const data= await fs.readFile(dbFilePath,'utf-8');
    return JSON.parse(data);
    }
    catch(err){
        return {user:[],items:[]};
    }   
}
async function writeDB(data){
    await fs.writeFile(dbFilePath,JSON.stringify(data,null,2),'utf-8');
}
module.exports={readDB,writeDB};*/