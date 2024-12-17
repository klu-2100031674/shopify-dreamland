import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP temporarily (you might want to use Redis in production)
    // For now, we'll store it in the session
    req.session.registerOTP = {
      email,
      otp,
      name,
      password,
    };

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP for email verification is: ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedData = req.session.registerOTP;

    if (!storedData || storedData.email !== email || storedData.otp !== parseInt(otp)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Create user after OTP verification
    const user = await User.create({
      name: storedData.name,
      email: storedData.email,
      password: storedData.password,
    });

    // Clear OTP data
    delete req.session.registerOTP;

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};