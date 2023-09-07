import { Request, Response } from 'express';

export default class UserController {
    static async register(req: Request, res: Response) {
        res.json('Olá Get A Pet');
    }
}