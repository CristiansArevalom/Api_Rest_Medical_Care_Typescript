import consultorioAsignadoServices from "../services/consultorioAsignado.services";
import { Request, Response } from "express";

export const getConsultoriosAsignados = async (req: Request, res: Response) => {
    try {
        const consultoriosAsignado = await consultorioAsignadoServices.getConsultoriosAsignados();
        res.json(consultoriosAsignado);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los consultorios asignados ' + error });
    }

};
export const getConsultorioAsignadoById = async (req: Request, res: Response) => {
    try {
        const consultoriosAsignado = await consultorioAsignadoServices.getConsultorioAsignadoById(req.params.id);
        res.json(consultoriosAsignado);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los consultorios asignados ' + error });
    }

};
export const getConsultorioAsignadoByIdConsultorio = async (req: Request, res: Response) => {
    try {
        const consultoriosAsignado = await consultorioAsignadoServices.getConsultorioAsignadoByConsultorio(req.params.id);
        res.json(consultoriosAsignado);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los consultorios asignados ' + error });
    }

};
export const getConsultorioAsignadoByEspecialidad = async (req: Request, res: Response) => {
    try {
        const consultoriosAsignado = await consultorioAsignadoServices.getConsultorioAsignadoByEspecialidad(req.params.especialidad);
        res.json(consultoriosAsignado);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los consultorios asignados ' + error });
    }

};
export const createConsultorioAsignado = async (req: Request, res: Response) => {
    try {
        const consultoriosAsignado = await consultorioAsignadoServices.createConsultorioAsignado(req.body);
        res.json(consultoriosAsignado);
    } catch (error) {
        res.status(400).json({ message: 'Error al asignar consultorio ' + error });
    }

};

export default {
    getConsultoriosAsignados,
    getConsultorioAsignadoById,
    createConsultorioAsignado,
    getConsultorioAsignadoByIdConsultorio,
    getConsultorioAsignadoByEspecialidad
}