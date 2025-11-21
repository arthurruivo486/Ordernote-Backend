import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || 'seu_jwt_secret_super_seguro';
const JWT_EXPIRES_IN = '7d';

export const loginUser = async (req, res) => {
    try {
        console.log("BODY RECEBIDO:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
        }

        console.log("Email:", email);
        console.log("Password:", password);

        const user = await getUserByEmail(email);

        console.log("USER ENCONTRADO:", user);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        console.log("HASH NO BANCO:", user.password_hash);

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        // Gerar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Retornar dados do usuário e token
        return res.status(200).json({
            message: "Login realizado com sucesso",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.log("ERRO COMPLETO:", error);
        return res.status(500).json({ message: "Erro interno ao fazer login" });
    }
};