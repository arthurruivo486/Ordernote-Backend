export const getProduct = (req, res) =>{
    try {
        res.status(200).json({ message: "Get Product" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}