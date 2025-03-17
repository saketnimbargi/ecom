import { Request, Response } from 'express';
import {TestService} from "../services";


export const getTestData =  async (_req: Request, res: Response): Promise<void>  => {
    try {
       const data = await TestService.testService();
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}
