class ConsultorioAsignadoRequestDto {
    inicioReserva: string;
    finReserva: string;
    id_doctor: string;
    id_consultorio: string;

    constructor(inicioReserva: string, finReserva: string, idDoctor: string, idConsultorio: string) {
        this.inicioReserva = inicioReserva;
        this.finReserva = finReserva;
        this.id_doctor = idDoctor;
        this.id_consultorio = idConsultorio;
    }

}
export default ConsultorioAsignadoRequestDto;
