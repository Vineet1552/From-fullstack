const express = require('express');
const router = express.Router();
const Candidate = require('../Model/candidateModel');
const bcrypt = require('bcrypt');
const {generateJwt, verifyJwt} = require('../services/jwt');
const sendMail = require('../services/nodeMailer');


router.post('/signup', async (req, res) => {
    try {
        const { userName, dob, email, password } = req.body;
        const existingUser = await Candidate.findOne({ 
            $or: [{ userName: userName }, { email: email }]
        });
        if (existingUser) {
            if (existingUser.userName === userName) {
                return res.status(409).json({ message: "Username already exists" });
            } else if (existingUser.email === email) {
                return res.status(409).json({ message: "Email already exists" });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const candidateData = new Candidate({
            userName,
            dob,
            email,
            password: hashedPassword
        });
        const response = await candidateData.save();
        console.log("Candidate data saved in the DB successfully");
        sendMail(email, "Welcome to the DB", 'Your profile has been created');
        return res.status(200).json({ response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/signin', async(req, res) => {
    try {
        const {userName, password} = req.body;
        const candidate = await Candidate.findOne({userName: userName});

        if(!candidate) {
            return res.status(401).json({message: "invalid details"});
        }

        const isMatchPass = await bcrypt.compare(password, candidate.password);
        if(!isMatchPass) {
            return res.status(401).json({error: 'passowrd not match'});
        }

        const payload = {
            id: candidate._id,
            
        }
        console.log(candidate._id, "id");
        const token = generateJwt(payload);
        return res.status(200).json({ token, userName: candidate.userName, email: candidate.email, dob: candidate.dob });

    } catch (error) {
        console.error(error, "error");
        res.status(500).json("Internal server error");
    }
});

module.exports = router;