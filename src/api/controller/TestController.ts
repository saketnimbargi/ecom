import { Request, Response } from 'express';
import {TestService} from "../services";
import { AllUsers } from 'src/entities';


export const getTestData =  async (_req: Request, res: Response): Promise<void>  => {
    try {
       const data = await TestService.testService();
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}

export const createTestUser =  async (req: Request, res: Response): Promise<void>  => {
    try {
        const userData = req.body as AllUsers;
        const data = await TestService.createUser(userData);
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}

export const getTestUserById =  async (req: Request, res: Response): Promise<void>  => {
    try {
        const { id } = req.params;
        const data = await TestService.getUserById(parseInt(id));
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}

export const deleteUserById =  async (req: Request, res: Response): Promise<void>  => {
    try {
        const { id } = req.params;
        const data = await TestService.deleteUserById(parseInt(id));
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}