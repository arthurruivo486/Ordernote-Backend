export const getSales = (req, res) =>{
    try {
        res.status(200).json({ message: "Get Sales" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}