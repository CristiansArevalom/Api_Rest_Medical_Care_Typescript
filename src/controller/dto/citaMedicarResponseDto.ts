class CitaMedicaResponseDto {
  id: string;
  doctor: string;
  paciente: string;
  especialidad: string;
  fechaInicio: string;
  fechaFin: string;
  consultorio: Number;

  constructor(id: string, doctor: string, paciente: string, especialidad: string, fechaInicio: Date, fechaFin: Date, consultorio: Number) {
    this.id = id;
    this.doctor = doctor;
    this.paciente = paciente;
    this.especialidad = especialidad;
    this.fechaInicio = this._formatFecha(fechaInicio);
    this.fechaFin = this._formatFecha(fechaFin);
    this.consultorio = consultorio;
  }

  private _formatFecha(fecha: Date): string {
    try {
      //DEJA EN FORMATO YYYY-MM-DD HH:HH ; se agfrega el +1 ya que javascript toma desde 0 los dias y meses

      const dia = fecha.getDate().toString().padStart(2, "0");
      const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
      const anio = fecha.getFullYear().toString();
      const horas = fecha.getHours().toString().padStart(2, "0");
      const minutos = fecha.getMinutes().toString().padStart(2, "0");

      const fechaStr = `${dia}-${mes}-${anio} ${horas}:${minutos}`;
      return fechaStr;
    } catch (error) {
      throw new Error("error al formatear la fecha de nacimiento" + error);
    }
  }
}


export default CitaMedicaResponseDto;