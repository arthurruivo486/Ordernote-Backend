import bcrypt from "bcrypt";
import { getUserByEmail } from "../models/userModel.js";

export const loginUser = async (req, res) => {
    try {
        console.log("BODY RECEBIDO:", req.body);

        const { email, password } = req.body;

        console.log("Email:", email);
        console.log("Password:", password);

        const user = await getUserByEmail(email); // <-- AQUI ESTAVA O ERRO

        console.log("USER ENCONTRADO:", user);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        console.log("HASH NO BANCO:", user.password_hash);

        const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        return res.status(200).json({ message: "Login realizado com sucesso" });

    } catch (error) {
        console.log("ERRO COMPLETO:", error);
        return res.status(500).json({ message: "Erro interno ao fazer login" });
    }
};
