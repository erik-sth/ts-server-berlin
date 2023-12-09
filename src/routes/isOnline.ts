import express, { Request, Response } from 'express';
const router = express.Router();
router.get('/', (_req: Request, res: Response) => {
    res.sendStatus(200);
});

export = router;
