import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req,res){        
                                                  //postman ගෙ req.body එකේ ඉදන් inputs එනවා.ඒ එන inputs ටික newUser කියන variable එකේ stall වෙනවා
    //const newUser = User(req.body);               //user collection(db එකේ) එකේ save කරන්න පුලුවන් විදිහෙ user කෙනෙක් (newUser) කෙනෙක් සාදා ගැනීම.
    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)      //***soulting rounds(10)

    const newUser = new User(data)

    newUser.save().then(()=>{                     //හදාගත්ත newUser db එකේ save කිරීම.
        res.json({message:"User registered successfully"})
    }).catch((error)=>{
        res.status(500).json({error:"User registration failed"})          //save නොවුනොත් ඒක වෙන්නෙ internal server error(db එකේ) එකක් නිසා status code එක 500 දම්මා.
    })
};

//Login part එක සෑදීම.
export function loginUser(req,res){
    const data = req.body;

    //මේ එවපු email එකට සමාන user කෙනෙක් db එකෙන් සොයා ගැනීම.
    User.findOne({
        email : data.email          //අදාල userගෙ email එක, මේ data වල තියෙන email එකට සමාන විය යුතුයි.       
    }).then(
        (user)=>{

            if(user == null){
                res.status(404).json({error : "Use not found"})
            }else{
                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);   //මේ data වල තියෙන password එකම, userගෙ password එකට සමානදැයි බැලීම.

                //encryption
                if(isPasswordCorrect){
                    const token = jwt.sign({                 //මේ json එක ඇතුලෙ තියෙන්නෙ encrypt කරන්න ඕනි data ටික.
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        type : user.type     //role
                    },"kv-secret-89!")                       //encrypt කරගැනීමට password එකක් ලබාදීම.
                    
                    res.json({message : "Login successful" , token : token});

                // if(bcrypt.compareSync(data.password,user.password)){
                //     res.json({message : "Login successful"})
                }else{
                    res.status(401).json({error:"Logon failed"})
                }
            }
         
        }
    );

}