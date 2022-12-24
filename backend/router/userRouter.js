
const {Router}= require("express");
const { dbconnect } = require("../db/db");
const mysql= require("mysql")

const userRouter= Router();

userRouter.get("/",async(req,res)=>{
    const {page,limit,filterby}= req.query;
    if(page && limit && !filterby){
        const skip= (page-1)*limit;
        dbconnect.getConnection(async(err,connection)=>{
            if(err){
                console.log(err)
            }else{
                const query= await connection.query(`SELECT * FROM userTable LIMIT ${skip},${limit}`,async(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        connection.release()
                        res.status(200).send(result)
                    }
                })
            } 
        })
    }
    else if(page && limit && filterby){
        const skip= (page-1)*limit;
        dbconnect.getConnection(async(err,connection)=>{
            if(err){
                console.log(err);
            }else{
                const query= await connection.query(`SELECT * FROM userTable WHERE gender=? LIMIT ${skip},${limit}`,[filterby],(err,result)=>{
                    if(err){
                        console.log(err)
                     }else{
                        connection.release()
                        res.status(200).send(result)
                     }   
                })
            }
        })
        
    }
    else{
        dbconnect.getConnection(async(err,connection)=>{
            if(err){
                console.log(err)
            }else{
                const query= await connection.query(`SELECT * FROM userTable`,async(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.status(200).send(result)
                    }
                })
            }
        })
    }
});

userRouter.post("/add",(req,res)=>{
    const data= req.body;
    dbconnect.getConnection(async(err,connection)=>{
        if(err){
            console.log(err);
        }else{
            const q= "INSERT INTO userTable (name,dob,gender,email,username,password,phone,profilepic) VALUES ?";
            var values = [data.map((el)=>[el.name,el.dob,el.gender,el.email,el.username,el.password,el.phone,el.profilepic])];
            const query= await connection.query(q,values,(err,resp)=>{
                if(err){
                    console.log(err);

                 }else{
                    connection.release();
                    res.status(200).send(` Insert successfull!!`)
                 }   
            })
        }  
    })
})

userRouter.delete("/removeall",(req,res)=>{
    dbconnect.getConnection(async(err,connection)=>{
        if(err){
            console.log(err);
        }else{
            const query= await connection.query(`DELETE FROM userTable`,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.status(200).send(`Table data deleted successfully`)
                }
            })
        }
    })
});

module.exports={userRouter} 