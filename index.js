//express, bodyParser, mongoose කියන්නෙ dependencies කිහිපයක්. Dependencies එක්කො framework හෝ library වෙන්න පුලුවන්...
import express from "express";                     //express කියන backend S/W එක import කරගැනීම
import bodyParser from "body-parser";              //ලැබෙන request එක පිළිවෙලකට හදන එක කරයි
import mongoose from "mongoose";                   //Db(mongo) එකයි, backEnd S/W එකයි connect කරගන්න.., mongoose library එක යෙදීම.
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";

const app = express();                             //express කියන S/W එක app කියන variable එක තුළ stall කිරීම

//app.use මගින් කරන්නෙ, එන request එක තාවකාලිකව නවත්තලා තියාගන්න එක.
app.use(bodyParser.json());                        //This is a middleware function provided by the body-parser package

app.use((req,res,next)=>{                         //next එකෙන් කරන්නෙ request එකෙන් පස්සෙ වෙන දේ.. 
    
    let token = req.header
    ("Authorization")
    console.log(token)
    
    if(token!=null){                            //token එකක් ඇත්තටම ඇවිල්ල තියේනම්.
        token = token.replace("Bearer ","");     //token එකේ මුලින් තියෙන "Bearer " අයින් කරලා ඒ වෙනුවට මුකුත් නැතිව තියන්න කියලා කියන එක.

        jwt.verify(token,"kv-secret-89!",
            (err,decoded)=>{
                if(!err){
                    req.user = decoded;          // decode කරගනිපු token එක(user details) නැවත request එකට දැමීම්.   --//ඊට පස්සෙ අපි මේ request එක ඊළග කෙනාට යවන්න next() භාවිතා කරනවා. 
                    //console.log(decoded);      //token එක දිහා බලලා, error එකක් නැත්නම් decode කරගත්ත content එක print කරන්න.  
                }
            });
    }
    next()                                        //next(), call කෙලේ නැත්නම් තවදුරටත් run වෙන්නෙ නෑ.
})

let mongoUrl = "mongodb+srv://admin:coolpixl320@cluster0.znsez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"    //Db එකයි backend එකයි connect කරගන්න db එකේ url එක යෙදීම.

mongoose.connect(mongoUrl)
 
const connection = mongoose.connection

connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

app.use("/api/users",userRouter)                    //මේක api request එකක් බව හදුනාගනීමට  api භාවිතා කරයි.
app.use("/api/products",productRouter)

// app.get("/",                                     //http request එකක් ආවොත් කරන්න ඕන දේ.  //මේක run වෙන්නෙ express js හරහා
//     (req, res) => {
//         //Request එකෙන් යවන විස්තර ටික db එකේ Student කියන collection එකේ save කර ගැනීම.... //postman body එකේ දුන්නු json data ටික mongodb එකේ setup කරගන්න තමයි studentSchema එක හැදුවෙ. (Structure එක setup කරගන්න)
//         // let studentSchema = mongoose.Schema({         //save කරන්න යන student ගෙ save වෙන්න ඕන විදිහ (structure එක)
//         //     name : String,
//         //     age : Number,
//         //     height : Number,
//         // })        
        
//         // let Student = mongoose.model("Students", studentSchema)      //Student model එක සෑදීම ("save වෙන්න ඕනි collection එකේ නම", හදාගත්ත structure එක)
//         //                                                              //db එකේ collection එකයි, අපේ code එකයි අතර connection එක හදන්නෙ Student model එකෙන්..

//         //හදාගත්ත Student model එක, db එකේ students collection එකෙන් ගැනීම
//         Student.find().then(
//             (result)=>{
//                 res.json(result)
//             }
//         ).catch(
//             ()=>{
//                 res.json({
//                     message: "error occured"
//                 })
//             }
//         )
        
//         // console.log(req)
//         // console.log("That is a Get request")
//         // res.json(
//         //     {
//         //         "message":"Good morning " +req.body.name
//         //     }
//         // )
//     }
// );

// app.post("/",
//     (req, res) => {
//         //Request එකෙන් යවන විස්තර ටික db එකේ Student කියන collection එකේ save කර ගැනීම.... //postman body එකේ දුන්නු json data ටික mongodb එකේ setup කරගන්න තමයි studentSchema එක හැදුවෙ. (Structure එක setup කරගන්න)
//         // let studentSchema = mongoose.Schema({         //save කරන්න යන student ගෙ save වෙන්න ඕන විදිහ (structure එක)
//         //     name : String,
//         //     age : Number,
//         //     height : Number,
//         // })        
        
//         // let Student = mongoose.model("Students", studentSchema)      //Student model එක සෑදීම ("save වෙන්න ඕනි collection එකේ නම", හදාගත්ත structure එක)
//         //                                                              //db එකේ collection එකයි, අපේ code එකයි අතර connection එක හදන්නෙ Student model එකෙන්..

//         let newStudent = req.body                     //postman වල request එකේ body එක ඇතුලෙ තමයි newStudent variable එක තියෙන්නෙ.

//         let student = new Student(newStudent)         //mongoose model එක(Student) use කරලා  අලුත් student කෙනෙක්(newStudent) අදාල collection එක ඇසුරෙන් හදාගෙන, ඒක student variable එකට දානවා.                                          

//         //හදාගත්ත student,  db එකේ save කිරීම
//         student.save().then(
//             ()=>{
//                 res.json(
//                     {
//                         "message" : "Student saved successfully"
//                     }
//                 )
//             }
//         ).catch(
//             ()=>{
//                 res.json(
//                     {
//                         "message" : "Student could not be saved"
//                     }
//                 )
//             }
//         )

//         // console.log("This is a post request")
//         // res.json({message:"Post request received" , status:"Success"})
        
//     }
// );



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});