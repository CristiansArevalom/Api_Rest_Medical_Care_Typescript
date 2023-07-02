class ConsultorioAsignadoResponseDto {
  idDoctor: string;
  nombre: string;
  apellido: string;
  correo: string;
  nombreEspecialidad: string;
  idConsultorio: string;
  ciudad: string;
  direccion: string;
  numero: Number;
  descripcion: string;
  idConsultorioAsignado: string;
  inicioReserva: string;
  finReserva: string;

  constructor(idDoctor: string, nombre: string, apellido: string, correo: string,
    nombreEspecialidad: string, idConsultorio: string, ciudad: string, direccion: string, numero: Number,
    descripcion: string, idConsultorioAsignado: string, inicioReserva: Date, finReserva: Date
  ) {
    this.idDoctor = idDoctor;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.nombreEspecialidad = nombreEspecialidad;
    this.idConsultorio = idConsultorio;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.numero = numero;
    this.descripcion = descripcion;
    this.idConsultorioAsignado = idConsultorioAsignado;
    this.inicioReserva = this._formatFecha(inicioReserva);
    this.finReserva = this._formatFecha(finReserva);
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
export default ConsultorioAsignadoResponseDto;