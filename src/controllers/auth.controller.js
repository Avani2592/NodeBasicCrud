const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { readDB, writeDB } = require('../utils/filedb');
const{sql,poolPromise}=require('../config/db');
const {secret,expiresIn}=require('../config/jwt.config');
const { pool, NVarChar } = require('mssql');
exports.register = async (req, res) => {
    const{name,email,password}=req.body;
     if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }
    try{
        const pool=await poolPromise;
        const result=await pool.request().input('email',sql.NVarChar,email).query('select * from Users where Email=@Email');
        if(result.recordset.length>0){
            return res.status(400).json({message:'User already exists'});
        } 
        const hashedPassword=await bcrypt.hash(password,10);
        await pool.request()
        .input('Name',sql.NVarChar,name)
        .input('Email',sql.NVarChar,email)
        .input('Password',sql.NVarChar,hashedPassword)
        .query('insert into Users (Name,Email,Password) values (@Name,@Email,@Password)');
        res.status(201).json({message:'User registered successfully'});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }       
};
exports.login=async(req,res)=>{
    const{email,password}=req.body;
     if ( !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
     }
    try{
        const pool=await poolPromise;
        const result=await pool.request().input('email',sql.NVarChar,email).query('select * from Users where Email=@email');
        if(result.recordset.length===0){
            return res.status(400).json({message:'Invalid email'});
        }
         const user=result.recordset[0];
         if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (!user.PASSWORD) {
            return res.status(500).json({ message: 'User has no password set' });
        }
       
        const isPasswordValid=await bcrypt.compare(password,user.PASSWORD); 
        if(!isPasswordValid){
            return res.status(400).json({message:'Invalid password'});
        }       
        const token=jwt.sign({id:user.Id,email:user.Email},secret,{expiresIn});
        res.json({token});
    }       
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
}




//file data reading and writing is replaced by sql server database
/*exports.register = async (req, res) => {
    const { name,email,password } = req.body;
    const db = await readDB();
    const existingUser = db.user.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: db.user.length + 1, name, email, password: hashedPassword };
    db.user.push(newUser);
    await writeDB(db);
    res.status(201).json({ message: 'User registered successfully' });
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const db = await readDB();
    const user = db.user.find(u => u.email === email);  
    if (!user) {
        return res.status(400).json({ message: 'Invalid email' });
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }   
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });

    res.json({ token });
}
*/