class PacienteResponseDto {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento: String;
  telefono: string;
  edad: number;

  constructor(
    id: string,
    nombre: string,
    apellido: string,
    cedula: string,
    fechaNacimiento: Date,
    telefono: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.fechaNacimiento = this._formatFechaNacimiento(fechaNacimiento);
    this.telefono = telefono;
    this.edad = this._calcularEdad(fechaNacimiento);
  }

  private _formatFechaNacimiento(fecha: Date): String {
    try {
      //DEJA EN FORMATO YYYY-MM-DD ; se agfrega el +1 ya que javascript toma desde 0 los dias y meses
      const fechaObj = new Date(fecha);
      const year = fechaObj.getFullYear().toString();
      const month = (fechaObj.getMonth() + 1).toString().padStart(2, "0");
      const day = (fechaObj.getDate() + 1).toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      throw new Error("error al formatear la fecha de nacimiento" + error);
    }
  }

  private _calcularEdad(fechaNacimiento: Date): number {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    // Verificar si aún no se ha cumplido el día y mes de nacimiento en el año actual
    if (
      fechaActual.getMonth() < fechaNac.getMonth() ||
      (fechaActual.getMonth() === fechaNac.getMonth() &&
        fechaActual.getDate() < fechaNac.getDate())
    ) {
      edad--;
    }

    return edad;
  }
}

export default PacienteResponseDto;
