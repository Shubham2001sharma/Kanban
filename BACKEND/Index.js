const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Db'); // Ensure the path is correct
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const secretkey = "hello";

const app = express();
const allowedOrigins = ['https://kanban-frontend-silk.vercel.app', 'https://another-frontend.vercel.app'];
app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps, curl requests)
    if (allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Registration endpoint
app.post('/register', async (req, res) => {
    const { email, password, firstname, lastname, gender, dob, mobile } = req.body;

    if (!email || !password || !firstname || !lastname || !gender || !dob || !mobile) {
        return res.status(400).send({ message: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send({ message: "Invalid email format" });
    }

    if (password.length < 6 || password.length > 50) {
        return res.status(400).send({ message: "Password must be between 6 and 50 characters" });
    }

    if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).send({ message: "Invalid mobile number" });
    }

    if (!['male', 'female', 'transgender'].includes(gender)) {
        return res.status(400).send({ message: "Invalid gender" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, firstname, lastname, gender, dob, mobile });
        await newUser.save();

        console.log('User registered:', email);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email }, secretkey, { expiresIn: '1d' });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'Strict' });

        console.log('Login successful for user:', email);

        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Login failed' });
    }
});


function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: "Failed to authenticate token" });
        }
        req.userId = decoded.email; // Assuming you want the email as userId
        next();
    });
}

// Verify token endpoint
app.get('/verify', verifyToken, (req, res) => {
    res.json({ status: true, message: "Token is valid" });
});

//Forgot-password endpoints
app.post("/forgot-password", async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        //const token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '1d' });

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.freesmtpservers.com",
            port: 25,
            secure: false,
            auth: {
                user: 'shubhamsharma20152@gmail.com', // Your email address
                pass: '18jan@2001' // Your email password
            }
        });

        // Define email options
        const mailOptions = {
            from: 'shubhamsharma20152@gmail.com',
            to: email,
            subject: 'Reset your password',
            text: `Click the following link to reset your password: <a href="http://localhost:5173/reset-password/${user._id}">Reset Password</a>`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send({ message: "Error sending email" });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).send({ message: "Reset password instructions sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
