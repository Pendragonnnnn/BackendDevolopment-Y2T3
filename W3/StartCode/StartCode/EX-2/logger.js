const logger = (req, res, next) => {
    console.log("─────────────────────────────────────────");
    console.log(`Timestamp  : ${new Date().toISOString()}`);
    console.log(`Method     : ${req.method}`);
    console.log(`Path       : ${req.path}`);
    console.log(`Query      :`,req.query);
    console.log("─────────────────────────────────────────");
 
    next();
};
 
export default logger;