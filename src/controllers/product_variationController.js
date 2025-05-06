export const getProduct_Variation = (req, res) =>{
    try {
        res.status(200).json({ message: "Get Product_Variation" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}