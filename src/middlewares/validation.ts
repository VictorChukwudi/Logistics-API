import { NextFunction, Request, Response } from "express";


const validate = (schema:any) => (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body); // Replace 'body' with 'params' or 'query' as needed

    if (error) {
        const details = error.details[0].message;
        return res.status(400).json({ error: details }); // Bad request with error message
    }

    req.body = value; // Update request object with validated data (optional)
    next();
};

export default validate