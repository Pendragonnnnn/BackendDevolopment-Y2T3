const validateQuery = (req,res,next) => {
    const {minCredits, maxCredits} = req.query;

    const min = minCredits === undefined ? undefined : parseInt(minCredits);
    const max = maxCredits === undefined ? undefined : parseInt(maxCredits);

    if (min !== undefined && isNaN(min)) {
        return res.status(400).json({
            error: "Invalid query parameter: 'minCredits' must be a valid integer.",
        });
    }
 
    if (max !== undefined && isNaN(max)) {
        return res.status(400).json({
            error: "Invalid query parameter: 'maxCredits' must be a valid integer.",
        });
    }
    if (min !== undefined && max !== undefined && min > max) {
        return res.status(400).json({
            error: `Invalid credit range: minCredits (${min}) cannot be greater than maxCredits (${max}).`,
        });
    }
    
    req.validatedCredits = {min, max};
    next();
}

export default validateQuery;