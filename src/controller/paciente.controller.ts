import pacienteService from '../services/paciente.services';
import { Request, Response } from 'express';

export const getPacientes = async (req: Request, res: Response) => {
    try {
        const pacientes = await pacienteService.getPacientes();
        res.json(pacientes)
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los pacientes ' + error });
    }

};
export const getPacienteById = async (req: Request, res: Response) => {
    try {
        const paciente = await pacienteService.getPacienteById(req.params.id);
        res.json(paciente)
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el paciente ' + error });

    }
};

export const createPaciente = async (req: Request, res: Response) => {
    try {
        const paciente = await pacienteService.createPaciente(req.body);
        res.json(paciente)
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el paciente' + error });
    }
};
export const updatePaciente = async (req: Request, res: Response) => {
    try {
        const paciente = await pacienteService.updatePaciente(req.params.id, req.body);
        res.json(paciente)
    } catch (error) {
        res.status(400).json({ message: "" + error });
    }
};
export const deletePaciente = async (req: Request, res: Response) => {
    try {
        await pacienteService.deletePaciente(req.params.id)
        res.json({ message: 'Paciente eliminado correctamente' })

    } catch (error) {
        res.status(400).json({ message: 'Error al crear el paciente' + error });
    }
};
export const getPacientesByCedula = async (req: Request, res: Response) => {
    try {
        const paciente = await pacienteService.getPacientesByCedula(req.params.cedula)
        res.json(paciente)
    } catch (error) {
        res.status(400).json({ message: "Error al consultar por cedula" + error });

    }
};

export default {
    getPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente,
    getPacientesByCedula,
};