import { Types } from "mongoose";
import CitaMedicaRequestDto from "../controller/dto/citaMedicaRequestDto";
import CitaMedicaResponseDto from "../controller/dto/citaMedicarResponseDto";
import ConsultorioAsignadoResponseDto from "../controller/dto/consultorioAsignadoResponseDto";
import citaMedica from "../models/citaMedica.model";
import consultorioAsignadoServices from "./consultorioAsignado.services";
import pacienteServices from "./paciente.services";
import doctorServices from "./doctor.services";
import especialidadServices from "./especialidad.services";

export const getCitasMedicas = async () => {
  try {
    //para poblar cita medica usando esas dos tablas se colocan separadas por espacio
    const citasMedicas = await citaMedica
      .find()
      .populate("paciente consultorioAsignado");
    const citasMedicasResponse = await Promise.all(
      citasMedicas.map(async (citaMedicaDb) => {
        ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
        const dataConsultorioAsig = JSON.stringify(
          citaMedicaDb.consultorioAsignado
        );
        const consultorioAsig = JSON.parse(dataConsultorioAsig);
        const dataPaciente = JSON.stringify(citaMedicaDb.paciente);
        const paciente = JSON.parse(dataPaciente);
        const consultorioAsignadoDto =
          await consultorioAsignadoServices.getConsultorioAsignadoById(
            consultorioAsig._id
          );

        const citaMedicaResponse = new CitaMedicaResponseDto(
          citaMedicaDb._id,
          consultorioAsignadoDto.nombre + " " + consultorioAsignadoDto.apellido,
          paciente.nombre + " " + paciente.apellido,
          consultorioAsignadoDto.nombreEspecialidad,
          citaMedicaDb.fechaInicio,
          citaMedicaDb.fechaFin,
          consultorioAsignadoDto.numero
        );
        return citaMedicaResponse;
      })
    );
    return citasMedicasResponse;
  } catch (error) {
    throw new Error("error al obtener las citas medicas " + error);
  }
}; //:Promise<CitaMedicaResponseDto[]>
export const getCitasMedicasByConsultorioAsignadoId = async (
  idConsultorioAsig: string
): Promise<CitaMedicaResponseDto[]> => {
  try {
    const citasMedicas = await citaMedica
      .find({ consultorioAsignado: idConsultorioAsig })
      .populate("paciente consultorioAsignado");
    const citaMedicasResponseDto = await Promise.all(
      citasMedicas.map(async (citaMedicaDb) => {
        ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
        const dataConsultorioAsig = JSON.stringify(
          citaMedicaDb.consultorioAsignado
        );
        const consultorioAsig = JSON.parse(dataConsultorioAsig);
        const dataPaciente = JSON.stringify(citaMedicaDb.paciente);
        const paciente = JSON.parse(dataPaciente);
        const consultorioAsignadoDto =
          await consultorioAsignadoServices.getConsultorioAsignadoById(
            consultorioAsig._id
          );

        const citaMedicaResponse = new CitaMedicaResponseDto(
          citaMedicaDb._id,
          consultorioAsignadoDto.nombre + " " + consultorioAsignadoDto.apellido,
          paciente.nombre + " " + paciente.apellido,
          consultorioAsignadoDto.nombreEspecialidad,
          citaMedicaDb.fechaInicio,
          citaMedicaDb.fechaFin,
          consultorioAsignadoDto.numero
        );
        return citaMedicaResponse;
      })
    );
    return citaMedicasResponseDto;
  } catch (error) {
    throw new Error(
      "error al obtener las citas medicas por consultorio asignado " + error
    );
  }
};
export const createCitasMedicas = async (
  citaMedicaRequestDto: CitaMedicaRequestDto
) => {
  try {
    //1buscar si datos de entrada son validos
    const inicioCitaMedica = convertirAFechaHora(
      citaMedicaRequestDto.fechaInicio
    );
    const finCitaMedica = convertirAFechaHora(citaMedicaRequestDto.fechaFin);
    //2buscando si el pacente existe
    const pacienteDb = await pacienteServices.getPacientesByCedula(
      citaMedicaRequestDto.cedulaPaciente
    );
    //3buscando si existen consultorios asignados a un doctor con esa especialdiad
    const consultoriosAsigConEspecialidad =
      await consultorioAsignadoServices.getConsultorioAsignadoByEspecialidad(
        citaMedicaRequestDto.especialidad
      );

    if (inicioCitaMedica >= finCitaMedica) {
      throw new Error(
        "La fecha de inicio no puede ser superior o igual a la fecha fin de reserva o a la actual"
      );
    }
    if (!pacienteDb) {
      throw new Error("No existe el paciente con esa cedula");
    }
    if (
      !consultoriosAsigConEspecialidad ||
      consultoriosAsigConEspecialidad.length == 0
    ) {
      throw new Error("No existen consultorios Asignados con esa especialidad");
    }
    //4 se valida si los consultorios con la especialidad estan disponibles para una cita medica y retorna los disponibles
    const consutoriosConEspecialidadDisponibles: ConsultorioAsignadoResponseDto[] =
      await getConsultoriosDisponiblesCita(
        consultoriosAsigConEspecialidad,
        inicioCitaMedica,
        finCitaMedica
      );
    if (
      !consutoriosConEspecialidadDisponibles ||
      consutoriosConEspecialidadDisponibles.length == 0
    ) {
      throw new Error(
        "No existen consultorios disponibles para citas en el rango de fechas indicado"
      );
    }
    //5  se escoje el 1er consultorioConEspDisponible que ya este asignado a un Doctor x Defecto
    const consultoriosAsigCita = consutoriosConEspecialidadDisponibles[0];

    const citaMedicaDb = new citaMedica({
      paciente: new Types.ObjectId(pacienteDb.id),
      especialidad: citaMedicaRequestDto.especialidad, //temporal debe coger la del doctor
      fechaInicio: inicioCitaMedica,
      fechaFin: finCitaMedica,
      consultorioAsignado: new Types.ObjectId(
        consultoriosAsigCita.idConsultorioAsignado
      ),
    });
    await citaMedicaDb.save();

    ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
    const dataConsultorioAsig = JSON.stringify(
      citaMedicaDb.consultorioAsignado
    );
    const consultorioAsig = JSON.parse(dataConsultorioAsig);

    const consultorioAsignadoDto =
      await consultorioAsignadoServices.getConsultorioAsignadoById(
        consultorioAsig
      );
    const citaMedicaResponse = new CitaMedicaResponseDto(
      citaMedicaDb._id,
      consultorioAsignadoDto.nombre + " " + consultorioAsignadoDto.apellido,
      pacienteDb.nombre + " " + pacienteDb.apellido,
      consultorioAsignadoDto.nombreEspecialidad,
      inicioCitaMedica,
      finCitaMedica,
      consultorioAsignadoDto.numero
    );
    return citaMedicaResponse;
  } catch (error) {
    throw new Error("Error al crear cita medica " + error);
  }
};

export const getCitasMedicasByPacienteId=async(idPaciente:string):Promise<CitaMedicaResponseDto[]>=>{
  try{

   //primero validar si el paciente existe
   const pacienteDto= await pacienteServices.getPacienteById(idPaciente);
   
  const citasMedicas = await citaMedica.find({paciente: idPaciente}).populate("paciente consultorioAsignado");
  const citaMedicasResponseDto = await Promise.all(
    citasMedicas.map(async (citaMedicaDb) => {
      ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
      const dataConsultorioAsig = JSON.stringify(
        citaMedicaDb.consultorioAsignado
      );
      const consultorioAsig = JSON.parse(dataConsultorioAsig);
      const dataPaciente = JSON.stringify(citaMedicaDb.paciente);
      const paciente = JSON.parse(dataPaciente);
      //se llama a consultAsig ya que tiene los datos del doctor y consultorio
      const consultorioAsignadoDto =
        await consultorioAsignadoServices.getConsultorioAsignadoById(
          consultorioAsig._id
        );

      const citaMedicaResponse = new CitaMedicaResponseDto(
        citaMedicaDb._id,
        consultorioAsignadoDto.nombre + " " + consultorioAsignadoDto.apellido,
        paciente.nombre + " " + paciente.apellido,
        consultorioAsignadoDto.nombreEspecialidad,
        citaMedicaDb.fechaInicio,
        citaMedicaDb.fechaFin,
        consultorioAsignadoDto.numero
      );
      return citaMedicaResponse;
    }));
    return citaMedicasResponseDto;
  }catch(error){
    throw new Error(
      "error al obtener las citas medicas por id paciente " + error
    );
  }
}


//select form citas medicas iiner join consult asig where cunsultasig.idDoctor = idDoctor

export const getCitasMedicasByDoctorId=async(idDoctor:string):Promise<CitaMedicaResponseDto[]>=>{
  try{
   //primero validar si el doctor existe
  const doctorDb = await doctorServices.getDoctorById(idDoctor);
  const citasMedicasPorDoctorResponse: CitaMedicaResponseDto[] = [];
if(doctorDb){
  const citasMedicas = await citaMedica.find().populate("paciente consultorioAsignado");

  for (const citaMedicaDb of citasMedicas ){
      ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
      const dataConsultorioAsig = JSON.stringify(citaMedicaDb.consultorioAsignado);
      const consultorioAsig = JSON.parse(dataConsultorioAsig);
      const dataPaciente = JSON.stringify(citaMedicaDb.paciente);
      const paciente = JSON.parse(dataPaciente);
      //se llama a consultAsig ya que tiene los datos del doctor y consultorio
      const consultorioAsignadoDto =
      await consultorioAsignadoServices.getConsultorioAsignadoById(
       consultorioAsig._id
       );
       if(consultorioAsignadoDto.idDoctor===idDoctor){
        const citaMedicaResponse = new CitaMedicaResponseDto(
          citaMedicaDb._id,
          consultorioAsignadoDto.nombre + " " + consultorioAsignadoDto.apellido,
          paciente.nombre + " " + paciente.apellido,
          consultorioAsignadoDto.nombreEspecialidad,
          citaMedicaDb.fechaInicio,
          citaMedicaDb.fechaFin,
          consultorioAsignadoDto.numero
        );
        citasMedicasPorDoctorResponse.push(citaMedicaResponse)
      }       
  }
}
    return citasMedicasPorDoctorResponse;
  }catch(error){
    throw new Error(
      "error al obtener las citas medicas por id doctor " + error
    );
  }
}

export const getCitasMedicasByEspecialidad=async(especialidad:string):Promise<CitaMedicaResponseDto[]>=>{
  try{
       //primero validar si el la especialidad existe
  const especialidadDto = await especialidadServices.getEspecialidadesByNombre(especialidad);

  const citasMedicas = await citaMedica.find().populate("paciente consultorioAsignado");
  const citasMedicasPorEspecialidadResponse: CitaMedicaResponseDto[] = [];

  for (const citaMedicaDb of citasMedicas ){
      ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
      const dataConsultorioAsig = JSON.stringify(citaMedicaDb.consultorioAsignado);
      const consultorioAsig = JSON.parse(dataConsultorioAsig);
      const dataPaciente = JSON.stringify(citaMedicaDb.paciente);
      const paciente = JSON.parse(dataPaciente);
      //se llama a consultAsig ya que tiene los datos del doctor y consultorio
      const consultorioAsignadoDto =
      await consultorioAsignadoServices.getConsultorioAsignadoById(
       consultorioAsig._id
       );
       if(consultorioAsignadoDto.nombreEspecialidad===especialidad){
        const citaMedicaResponse = new CitaMedicaResponseDto(
          citaMedicaDb._id,
          consultorioAsignadoDto.nombre + " " + consultorioAsignadoDto.apellido,
          paciente.nombre + " " + paciente.apellido,
          consultorioAsignadoDto.nombreEspecialidad,
          citaMedicaDb.fechaInicio,
          citaMedicaDb.fechaFin,
          consultorioAsignadoDto.numero
        );
        citasMedicasPorEspecialidadResponse.push(citaMedicaResponse)
      }       
  }
    return citasMedicasPorEspecialidadResponse;
  }catch(error){
    throw new Error(
      "error al obtener las citas medicas por especialidad " + error
    );
  }
}
const getConsultoriosDisponiblesCita = async (
  consultoriosConEspecialidad: ConsultorioAsignadoResponseDto[],
  fechaSolicitudCitaInicio: Date,
  fechaSolicitudCitaFin: Date
) => {
  try {
    const consultoriosAsigDisponibles: ConsultorioAsignadoResponseDto[] = [];
    for (const consultorioAsig of consultoriosConEspecialidad) {
      const fechaInicioReserva = convertirAFechaHora(
        consultorioAsig.inicioReserva
      );
      const fechaFinReserva = convertirAFechaHora(consultorioAsig.finReserva);
      // Verifica si la fecha de inicio de la solicitud de cita se superpone con una fecha de reserva existente.
      const fechaInicioReservaOcupada: boolean =
        (fechaSolicitudCitaInicio === fechaInicioReserva ||
          fechaSolicitudCitaInicio > fechaInicioReserva) &&
        (fechaSolicitudCitaInicio === fechaFinReserva ||
          fechaSolicitudCitaInicio < fechaFinReserva);
      // Verifica si la fecha de finalización de la solicitud de cita se superpone con una fecha de reserva existente.
      const fechaFinReservaOcupada: boolean =
        (fechaSolicitudCitaFin === fechaInicioReserva ||
          fechaSolicitudCitaFin > fechaInicioReserva) &&
        (fechaSolicitudCitaFin === fechaFinReserva ||
          fechaSolicitudCitaFin < fechaFinReserva);
      // Valida si las dos fechas estan ocupadas para tener un consultorio asignado en esa rango de fechas
      const fechaReservaOcupada: boolean =
        fechaInicioReservaOcupada || fechaFinReservaOcupada;
      //si la fecha de reserva de la cita esta dentro del rango de la fecha de reserva del consultorio, entra al if
      if (fechaReservaOcupada) {
        let consultorioConCitaDisponible: boolean = true;
        const citasAsignadas = await getCitasMedicasByConsultorioAsignadoId(
          consultorioAsig.idConsultorioAsignado.toString()
        );
        // Iterar a través de cada cita asignada en caso de que tenga alguna.
        for (const citaAsignadas of citasAsignadas) {
          // Obtener la fecha de inicio y finalización de la cita asignada.
          const fechaInicioCitaAsignada = convertirAFechaHora(
            citaAsignadas.fechaInicio
          );
          const fechaFinCitaAsignada = convertirAFechaHora(
            citaAsignadas.fechaFin
          );
          // Verificar si la fecha de inicio de la solicitud de cita se superpone con una fecha de cita existente.
          const fechaInicioCitaOcupada: boolean =
            fechaSolicitudCitaInicio < fechaFinCitaAsignada &&
            fechaFinCitaAsignada > fechaInicioCitaAsignada;
          // Verificar si la fecha de finalización de la solicitud de cita se superpone con una fecha de cita existente.
          const fechaFinCitaOcupada: boolean =
            fechaSolicitudCitaFin < fechaFinCitaAsignada &&
            fechaFinCitaAsignada > fechaInicioCitaAsignada;
          const fechaCitaOcupada =
            fechaInicioCitaOcupada || fechaFinCitaOcupada;

          // Si la fechaCitaOcupada booleana es verdadera, se establece "consultorioConCitaDisponible" en falso y salir del bucle.
          if (fechaCitaOcupada) {
            consultorioConCitaDisponible = false;
            break;
          }
        }
        if (fechaReservaOcupada && consultorioConCitaDisponible) {
          consultoriosAsigDisponibles.push(consultorioAsig);
        }
      }
    }

    //console.log(consultoriosAsigDisponibles)
    return consultoriosAsigDisponibles;
  } catch (error) {
    throw new Error("Error al obtener consultorio disponible " + error);
  }
};

const convertirAFechaHora = (fechaString: string): Date => {
  const regex = /^(\d{2})-(\d{2})-(\d{4})\s(\d{2}):(\d{2})$/;
  const match = fechaString.match(regex);
  if (!match) {
    throw new Error("Formato de fecha incorrecto");
  }
  const [, dia, mes, anio, horas, minutos] = match;
  const fechaFormateada = new Date(
    Number(anio),
    Number(mes) - 1,
    Number(dia),
    Number(horas),
    Number(minutos)
  );
  return fechaFormateada;
};

export default {
  getCitasMedicas,
  createCitasMedicas,
  getCitasMedicasByConsultorioAsignadoId,
  getCitasMedicasByPacienteId,
  getCitasMedicasByDoctorId,
  getCitasMedicasByEspecialidad,
  //getConsultoriosDisponibles
};
