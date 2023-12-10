import { NextFunction, Request, Response } from 'express';

interface PaginationRequest extends Request {
    page?: number;
    limit?: number;
    skip?: number;
}

function paginate(req: PaginationRequest, _res: Response, next: NextFunction) {
    try {
        const { page: pageQuery, limit: limitQuery } = req.query;
        req.page = parseInt(pageQuery as string) - 1 || 0;
        req.limit = parseInt(limitQuery as string) || 10;
        req.skip = req.page * req.limit;
        next();
    } catch (error) {
        next(error);
    }
}
export { paginate, PaginationRequest };
