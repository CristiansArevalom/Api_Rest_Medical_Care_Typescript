class ConsultorioResponseDto {
    id: string;
    ciudad: string;
    direccion: string;
    numero: number;
    descripcion: string;

    constructor(id: string, ciudad: string, direccion: string, numero: number, descripcion: string) {
        this.id = id;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.numero = numero;
        this.descripcion = descripcion;
    }
}
export default ConsultorioResponseDto;