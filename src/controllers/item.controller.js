const{sql,poolPromise}=require('../config/db');
exports.create =async(req,res)=>{
    const{userid,name,email}=req.body;
    try{
        const pool=await poolPromise;
        const result=await pool.request()
        .input('UserId',sql.Int,userid)    
        .input('Name',sql.NVarChar,name)
        .input('Email',sql.NVarChar,email)
        .query('insert into Items (USER_ID,Name,Email) values (@UserId,@Name,@Email)');
        res.status(201).json({message:'Item created successfully'});
    }   
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
};
exports.getAll=async(req,res)=>{
    try{
        const pool=await poolPromise;
        const result=await pool.request().query('select * from Items');
        res.status(200).json(result.recordset);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }   
};
exports.getById=async(req,res)=>{
    try{
        const pool=await poolPromise;       
        const result=await pool.request()
        .input('Id',sql.Int,req.params.id)
        .query('select * from Items where Id=@Id');
        if(result.recordset.length===0){
            return res.status(404).json({message:'Item not found'});
        }       
        res.status(200).json(result.recordset[0]);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }           
};
exports.update=async(req,res)=>{
    const{name,email}=req.body;
    try{
        const pool=await poolPromise;       
        const result=await pool.request()   
        .input('Id',sql.Int,req.params.id)
        .input('Name',sql.NVarChar,name)
        .input('Email',sql.NVarChar,email)      
        .query('update Items set Name=@Name,Email=@Email where Id=@Id');
        if(result.rowsAffected[0]===0){
            return res.status(404).json({message:'Item not found'});
        }       
        res.status(200).json({message:'Item updated successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
};
exports.delete=async(req,res)=>{
    try{
        const pool=await poolPromise;
        const result=await pool.request()
        .input('Id',sql.Int,req.params.id)      
        .query('delete from Items where Id=@Id');
        if(result.rowsAffected[0]===0){
            return res.status(404).json({message:'Item not found'});
        }           
        res.status(200).json({message:'Item deleted successfully'});
    }   
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
};   








//file based data reading and writing is replaced by sql server database
/*const { readDB,writeDB } = require("../utils/filedb")

exports.create=async(req,res)=>{
    
    const db=await readDB();
    const item={
        id:Date.now(),
        userId:req.user.id,
        name:req.body.name,
        email:req.body.email
    };
    db.items.push(item);
    await writeDB(db);
    res.status(201).json(item);
} 
exports.getAll=async(req,res)=>{
    const db=await readDB();
    res.status(200).json(db.items);
}   
exports.getById=async(req,res)=>{
    const db=await readDB();
    const item=db.items.find(i=>i.id==parseInt(req.params.id));
    if(!item){
        return res.status(404).json({message:"Item not found"});
    }
    res.status(200).json(item);
}
exports.update=async(req,res)=>{
    const db=await readDB();
    const item=db.items.find(i=>i.id==parseInt(req.params.id));
    if(!item){
        return res.status(404).json({message:"Item not found"});
    }
    else{
        item.name=req.body.name||item.name;
        item.email=req.body.email||item.email;         
        await writeDB(db);
        res.status(200).json(item);         
    }
}
exports.delete=async(req,res)=>{
    const db=await readDB();
    const index=db.items.findIndex(i=>i.id==req.params.id);
    if(index===-1){
        return res.status(404).json({message:"Item not found"});
    }
    db.items.splice(index,1);
    await writeDB(db);
    res.status(200).json({message:"Item deleted successfully"});    
}
*/