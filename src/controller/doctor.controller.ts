import doctorServices from "../services/doctor.services";
import { Request, Response } from "express";

export const getDoctores = async (req: Request, res: Response) => {
    try {
        const doctores = await doctorServices.getDoctores();
        res.json(doctores);

    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los doctores ' + error });
    }
};

export const createDoctor = async (req: Request, res: Response) => {
    try {
        const doctor = await doctorServices.createDoctor(req.body);
        res.json(doctor)
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el doctor' + error });
    }
};
export const getDoctorById = async (req: Request, res: Response) => {
    try {
        const doctor = await doctorServices.getDoctorById(req.params.id);
        res.json(doctor)
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el doctor ' + error });

    }
};

export const getDoctorByEspecialidad = async (req: Request, res: Response) => {
    try {
        const doctor = await doctorServices.getDoctoresByEspecialidad(req.params.especialidad);
        res.json(doctor)
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los doctores ' + error });

    }
};
export default {
    getDoctores,
    createDoctor,
    getDoctorById,
    getDoctorByEspecialidad
}