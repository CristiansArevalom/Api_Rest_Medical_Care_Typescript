import consultorioService from "../services/consultorio.services";
import { Request, Response } from "express";


export const getConsultorios = async (req: Request, res: Response) => {
    try {
        const consultorio = await consultorioService.getConsultorios();
        res.json(consultorio)
    } catch (error) {
        res.status(400).json({ message: '' + error });
    }

};
export const getConsultorioById = async (req: Request, res: Response) => {
    try {
        const consultorio = await consultorioService.getConsultorioById(req.params.id);
        res.json(consultorio)
    } catch (error) {
        res.status(400).json({ message: '' + error });

    }
};

export const createConsultorio = async (req: Request, res: Response) => {
    try {
        const consultorio = await consultorioService.createConsultorio(req.body);
        res.json(consultorio)
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el consultorio' + error });
    }
};
export const updateConsultorio = async (req: Request, res: Response) => {
    try {
        const consultorio = await consultorioService.updateConsultorio(req.params.id, req.body);
        res.json(consultorio)
    } catch (error) {
        res.status(400).json({ message: "" + error });
    }
};
export const deleteConsultorio = async (req: Request, res: Response) => {
    try {
        await consultorioService.deleteConsultorio(req.params.id)
        res.json({ message: 'Consultorio eliminado correctamente' })

    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el Consultorio' + error });
    }
};
export const getConsultoriosDisponibles = async (req: Request, res: Response) => {
    try {
        const fechaInicio=req.params['inicio'];
        const fechaFin=req.params['fin'];
        console.log(fechaInicio + " "+ fechaFin)
        const consultorio = await consultorioService.getConsultoriosDisponibles(fechaInicio,fechaFin)
        res.json(consultorio)
    } catch (error) {
        res.status(400).json({ message: "Error al buscar consultorios libres" + error });

    }
};

export default {
    getConsultorios,
    createConsultorio,
    getConsultorioById,
    updateConsultorio,
    deleteConsultorio,
    getConsultoriosDisponibles,
};