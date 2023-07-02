class PacienteRequestDto {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento: string;
  telefono: string;

  constructor(
    id: string, nombre: string, apellido: string, cedula: string, fechaNacimiento: string, telefono: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.fechaNacimiento = fechaNacimiento
    this.telefono = telefono;
  }

}

export default PacienteRequestDto;
