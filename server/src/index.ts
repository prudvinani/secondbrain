import dotenv from "dotenv"
dotenv.config()

import bcrypt from "bcrypt"
import express,{Request,Response} from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {z} from "zod"
import { UserModel } from "./Model/UserModel"
import { AuthMiddleware } from "./Middleware"
import { ContentModel, LinkModel } from "./Model/ContentModel"
import { random } from "./utils"
import cors from "cors"

const app=express()
app.use(express.static("public")); 
app.use(express.json())
app.use(cors({
    credentials:true
}))
app.use(express.urlencoded({ extended: true }));



const CMongdb=()=>{
    mongoose.connect(process.env.MONGOURL as string,{
        
    }).then(()=>{
        console.log("mongodb is connected to the datbase")
    }).catch(()=>{
        console.log("mongodb is not connected")
    })
}


interface AuthenticatedRequest extends Request{
    userId?:string
}

const Signupvalidation=z.object({
    email:z.string().email(),
    password:z.string().min(7)
})
CMongdb()
app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({message:"Welcome to MySecondBrain"})
})


app.post("/signup",async(req:Request,res:Response)=>{
    try{
        const {email,password}=Signupvalidation.parse(req.body);
        if(!email || !password){
             res.status(400).json({
                success:false,
                message:"Email and Password are required"
            })
        }
        const EmailExistied=await UserModel.findOne({email})
        if(EmailExistied){
            res.status(409).json({message:"User is already existed in the database"})
        }
        const hashpassword=await bcrypt.hash(password,10)
         await UserModel.create({email,password:hashpassword})
         
         res.status(201).json({
            success: true,
            message: "Successfully signed up!",
          });

    }catch(er){
console.log("You can't create the user Signup ")
    }
})

app.post("/signin", async (req: Request, res: Response):Promise<any> => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
         res.status(400).json({ message: "Email and password are required" });
      }
  
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "Email does not exist in the database" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWTPASSWORD as string, {
        expiresIn: "1h",
      });
  
      res.status(200).json({
        success: true,
        token: token,
        userId: user._id,
      });
    } catch (err) {
      console.log("Signin error:", err);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  });
  

app.post(
    "/content",
    AuthMiddleware,
    async (req: AuthenticatedRequest, res: Response):Promise<any> => {
      try {
        const { title, link,type } = req.body;
  
        // Validation for required fields
        if (!title || !link) {
          return res
            .status(400)
            .json({ success: false, message: "Title & Link are required!" });
        }
  
        // Ensure `userId` is available
        const userId = req.userId;
        if (!userId) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized: No User ID provided." });
        }
  
        // Create the content in the database
        await ContentModel.create({ title, link, userId,type });
  
        // Success response
        res.status(201).json({
          success: true,
          message: "Content added successfully!",
        });
      } catch (error) {
        console.error("Error while adding content:", error);
  
        // Internal server error response
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred.",
        });
      }
    }
  );
  

app.get("/contents",AuthMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<any>=>{
    const userId=req.userId
    try{
       const data= await ContentModel.find({userId})
        res.status(200).json({success:true,message:data})

    }catch(er){
       return res.status(500).json({success:false,message:"Not Fetched data from database"})
    }
})
app.delete("/content/:id",AuthMiddleware,async(req:AuthenticatedRequest,res:Response)=>{
    const {id}=req.params;
    try{
    await ContentModel.findByIdAndDelete(id)
    res.status(200).json({success:true})
    }catch(er){
          console.log("Content is not delete Successfully")
    }
})


app.post("/brain/share", AuthMiddleware, async (req:AuthenticatedRequest, res) => {
    const {share}=req.body
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    console.log("Route hit with shareLink:", req.params.shareLink);

    // Look for the link with the given hash
    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(400).json({
            message: "Sorry, incorrect input"
        });
        return;
    }

    // Fetch content for the user associated with the link
    const content = await ContentModel.find({
        userId: link.userId
    });

    console.log(link);

    // Find the user associated with the link
    const user = await UserModel.findOne({
        _id: link.userId
    });

    if (!user) {
        res.status(404).json({
            message: "User not found, this error should ideally not happen"
        });
        return;
    }

    // Send the response with user email and their content
    console.log(content)
    res.json({
        email: user.email,
        content: content
    });
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("the server is started")
})
