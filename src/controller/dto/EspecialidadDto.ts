class EspecialidadDto {
    id: string;
    nombre: string;
    descripcion: string;

    constructor(id: string, nombre: string, descripcion: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
};
export default EspecialidadDto;