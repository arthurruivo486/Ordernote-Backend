import { findAll } from "../models/userModel.js";

export const getUsers = async (req, res) =>{
    try {
        const users = await findAll()
        res.status(200).json({users});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}