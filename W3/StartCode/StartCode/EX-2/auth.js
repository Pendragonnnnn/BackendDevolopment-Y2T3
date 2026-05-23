const VALID_TOKEN = "xyz123"; 
 
const auth = (req, res, next) => {
    const { token } = req.query;
 
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized: missing 'token' query parameter.",
        });
    }
 
    if (token !== VALID_TOKEN) {
        return res.status(401).json({
            error: "Unauthorized: invalid token.",
        });
    }
 
    next(); 
};
 
export default auth;