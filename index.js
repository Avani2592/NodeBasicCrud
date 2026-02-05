const express=require('express');
//const sql=require('mssql');
const app=express();
app.use(express.json());
const port=3000;
/*require('dotenv').config(); 
const dbConfig={
    user:process.env.DB_USER || 'your_username',
    password:process.env.DB_PASSWORD||'your_password',
    server:process.env.DB_SERVER||'your_server',
    database: process.env.DB_NAME||'your_database',
    port: 1433, 
    options:{encrypt:false,trustServerCertificate:true },
    connectiontimeout:30000     
};
async function testConnection() {
    try {
        await sql.connect(dbConfig);
        console.log('✅ Connected to SQL Express!');
        const result = await sql.query`SELECT name FROM sys.databases`;
        console.log('Databases:', result.recordset);
    } catch (err) {
        console.error('❌ Connection failed:', err);
    }
}

//testConnection();
//sql.connect(dbConfig).then(()=> console.log('Connected to SQL Server database')).catch(err=>{
//    console.error('Database connection failed:',err);
//});     */  

let users=[];//In-memory user storage

app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.post('/users',(req,res)=>{
    const {name,email}=req.body;
    const id=users.length+1;
    const user={id,name,email}; 
    users.push(user);
    res.status(201).json(user);
});
app.get('/users',(req,res)=>{
    res.json(users);
});
app.get('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const user=users.find(u=>u.id===id);
    if(user){
        res.json(user);
    }
    else{
        res.status(404).json({message:'User not found'});
    }
});
app.put('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);   
    const user=users.find(u=>u.id===id);
    if(user){
        const {name,email}=req.body;
        user.name=name||user.name;
        user.email=email||user.email;
        res.json(user);
    } 
    else{
        res.status(404).json({message:'User not found'});
    }   
});
app.delete('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=users.findIndex(u=>u.id===id);  
    if(index!==-1){
        users.splice(index,1);
        res.json({message:'User deleted'});
    }   
    else{
        res.status(404).json({message:'User not found'});
    }
});

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});