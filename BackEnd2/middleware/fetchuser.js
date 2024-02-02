const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

const fetchuser = (req, res, next) => {
    // Extract the JWT token from the request header
    const token = req.header("Authorization");

    try {
        // Check if a token is provided
        if (!token) {
            throw new Error("No token provided. Please authenticate using a valid token.");
        }

        // Verify the JWT token and extract user data
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)
        req.user = decoded.data.user;
    

        console.log("Decoded user:", req.user); // Log the decoded user data

        // Call the next middleware function in the stack
        next();
    } catch (error) {
        // Handle authentication errors
        console.error("Authentication error:", error.message);
        res.status(401).json({ error: "Authentication failed. Please authenticate using a valid token." });
    }
};

module.exports = fetchuser;
