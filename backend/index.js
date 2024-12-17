import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();


const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))



app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    //checking the database if user exits or not and set the cookie
    const user = await prisma.user.findUnique({
        where:{username}
    })

    if (!user) {
        return res.status(401).json({message: "user not found"})
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if (!isPassword){
        return res.status(401).json({message: "Invalid Credentials"})
    }

    const token = jwt.sign({
        id:user.username
    }, `${process.env.JWT_SECRET}`)

    res.cookie("token", token, {httpOnly: true})

    return res.status(201).json({id: user.id, token})
})

app.post("/api/v1/signup", async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).send("username and password is required")
    }

    try {

        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword)

        //store the new Client password and username in database

        const newuser = await prisma.user.create({
            data:{
                username,
                password: hashPassword
            }
        })

        const token = jwt.sign(
            {id:newuser.username},
           `${process.env.JWT_SECRET}`,
            {expiresIn:"1h"}
        );

        res.cookie("token", token, {httpOnly:true})
        return res.status(201).json({id: newuser.id, token})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send("internal server error")
    }

})

app.get("/logout", (req, res) => {
    res.clearCookie("token")
    return res.send("logout!")
})

//fetching profile data
app.get("/api/v1/profile/:userId", async(req, res) => {
    const {userId} = req.params

    try {
        const profile = await prisma.profile.findUnique({
            where: {userId: Number(userId)}

        })

        if (!profile) return res.status(404).json({message: 'Profile  not found'});

        res.status(201).json(profile)
    } catch (error) {
       console.error("Error fetching Profile:", error)
       res.status(500).json({error: 'internal server errror'}) 
    }
})


app.post("/api/v1/profile", async (req, res) => {
    const {userId, role, skills, interest, bio} = req.body

    try {
        const profile = await prisma.profile.upsert({
            where: {userId: Number(userId)},
            update:{role, skills, interest, bio},
            create: {userId:Number(userId), role, skills, interest, bio}
        })
        res.json({message: 'Profile saved successfully!', profile})
    } catch (error) {
        console.error("Error saving profile:", error)
        res.status(500).json({error:'internal server error'})
    }
})

app.listen(3000, () => {
    console.log("port")
})


