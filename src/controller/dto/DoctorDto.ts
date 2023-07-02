class DoctorDto {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    nombreEspecialidad: string;

    constructor(id: string, nombre: string, apellido: string, correo: string, nombreEspecialidad: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.nombreEspecialidad = nombreEspecialidad;
    }
}
export default DoctorDto;