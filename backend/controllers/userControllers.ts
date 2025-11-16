import { Response } from 'express';
import { userModel } from '../models/userModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async(req: any, res: any) => {
}


export const getUserById = async(req: any, res: any) => {
  try {
  }
  catch (e) {
  }
}

export const signupUser = async(req: any, res: any) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    // const userExist = await userModel.findOne({ email });
    // if (userExist)
    //   return res.status(400).json({ message: "User already exists" });

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new userModel({
    //   email,
    //   password: hashedPassword
    // });
    // await newUser.save();
    return res.status(201).json({ message: "User created successfully" });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const signinUser = async(req: any, res: any) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // const user = await userModel.findOne({ email });
    // if (!user)
    //   return res.status(400).json({ message: "Invalid email or password" });

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid)
    //   return res.status(400).json({ message: "Invalid email or password" });

    // const token = jwt.sign(
    //   {id: user._id, email },
    //   process.env.JWT_SECRET as string,
    //   { expiresIn: '10min' });

    // res.json({
    //   /* Can send more information if needed */
    //   token,
    //   user: { email }
    // });
    return res.status(200).json({ message: "Login successful" });
  } catch (e) {
  }
}

export const updateUser = async(req: any, res: any) => {
  try {
  } catch (e) {
  }
}

export const deleteUser = async(req: any, res: any) => {
  try {
  } catch (e) {
  }
}
