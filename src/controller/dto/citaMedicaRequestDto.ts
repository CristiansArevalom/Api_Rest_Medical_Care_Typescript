class CitaMedicaRequestDto {
    cedulaPaciente: string;
    especialidad: string;
    fechaInicio: string;
    fechaFin: string;

    constructor(cedulaPaciente: string, especialidad: string, fechaInicio: string, fechaFin: string) {
        this.cedulaPaciente = cedulaPaciente;
        this.especialidad = especialidad;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
};
export default CitaMedicaRequestDto;