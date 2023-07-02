import ConsultorioAsignado from "../models/consultorioAsignado.model";
import ConsultorioAsignadoRequestDto from "../controller/dto/consultorioAsignadoRequestDto";
import ConsultorioAsignadoResponseDto from "../controller/dto/consultorioAsignadoResponseDto";
import consultorioServices from "./consultorio.services";
import doctorServices from "./doctor.services";
import especialidadServices from "./especialidad.services";
import { Types } from "mongoose";

export const getConsultoriosAsignados = async (): Promise<
  ConsultorioAsignadoResponseDto[]
> => {
  try {
    //para poblar cosultorio asignado usando esas dos tablas se colocan separadas por espacio
    const consultoriosAsignados = await ConsultorioAsignado.find().populate(
      "doctor consultorio"
    );
    //promise.All para evitar Promise { <pending> },
    const consultoriosAsignadosResponse = await Promise.all(
      consultoriosAsignados.map(async (consultorioAsignadoDb) => {
        ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
        const dataDoctor = JSON.stringify(consultorioAsignadoDb.doctor);
        const doctor = await JSON.parse(dataDoctor);

        const dataConsultorio = JSON.stringify(
          consultorioAsignadoDb.consultorio
        );
        const consultorio = await JSON.parse(dataConsultorio);

        //console.log("consultorio: "+ typeof(await consultorio._id)+" doctor "+typeof(await doctor._id))

        const idConsultorio = await consultorio._id;
        const idDoctor = await doctor._id;
        // console.log(idConsultorio)
        //POR ALGUNA RAZON LOS DETECTA NULL Y SE TOTEA
        const consultorioDtoPromise =
          await consultorioServices.getConsultorioById(idConsultorio);
        const doctorDtoPromise = await doctorServices.getDoctorById(idDoctor);

        const [consultorioDto, doctorDto] = await Promise.all([
          consultorioDtoPromise,
          doctorDtoPromise,
        ]);

        const consultorioAsignadoResponseDto =
          new ConsultorioAsignadoResponseDto(
            doctorDto.id,
            doctorDto.nombre,
            doctorDto.apellido,
            doctorDto.correo,
            doctorDto.nombreEspecialidad,
            consultorioDto.id,
            consultorioDto.ciudad,
            consultorioDto.direccion,
            consultorioDto.numero,
            consultorioDto.descripcion,
            consultorioAsignadoDb._id,
            consultorioAsignadoDb.inicioReserva,
            consultorioAsignadoDb.finReserva
          );
        return consultorioAsignadoResponseDto;
      })
    );
    return consultoriosAsignadosResponse;
  } catch (error: any) {
    throw new Error(
      "Error al obtener los consultorios asignados " + error.stack
    );
  }
};

export const getConsultorioAsignadoById = async (
  id: String
): Promise<ConsultorioAsignadoResponseDto> => {
  try {
    const consultorioAsignadoDb = await ConsultorioAsignado.findById(id);
    if (!consultorioAsignadoDb) {
      throw new Error("El consultorio asig con ese Id no existe");
    }
    ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
    const dataDoctor = JSON.stringify(consultorioAsignadoDb.doctor);
    const doctor = JSON.parse(dataDoctor);

    const dataConsultorio = JSON.stringify(consultorioAsignadoDb.consultorio);
    const consultorio = JSON.parse(dataConsultorio);
    const consultorioDto = await consultorioServices.getConsultorioById(
      consultorio
    );
    const doctorDto = await doctorServices.getDoctorById(doctor);

    const consultorioAsignadoResponseDto = new ConsultorioAsignadoResponseDto(
      doctorDto.id,
      doctorDto.nombre,
      doctorDto.apellido,
      doctorDto.correo,
      doctorDto.nombreEspecialidad,
      consultorioDto.id,
      consultorioDto.ciudad,
      consultorioDto.direccion,
      consultorioDto.numero,
      consultorioDto.descripcion,
      consultorioAsignadoDb._id,
      consultorioAsignadoDb.inicioReserva,
      consultorioAsignadoDb.finReserva
    );
    return consultorioAsignadoResponseDto;
  } catch (error) {
    throw new Error("error al obtener consultAsig por id" + error);
  }
};
export const createConsultorioAsignado = async (
  consultorioAsignadoRequestDto: ConsultorioAsignadoRequestDto
) => {
  try {
    //se debe transformar de string a date..
    const inicioReserva = convertirAFecha(
      consultorioAsignadoRequestDto.inicioReserva
    );
    const finReserva = convertirAFecha(
      consultorioAsignadoRequestDto.finReserva
    );
    const fechaActual = new Date();
    if (inicioReserva < fechaActual || inicioReserva >= finReserva) {
      throw new Error(
        "La fecha de inicio a reservar no pueden ser inferior a la fecha de hoy o superior-igual a la fecha de fin reserva"
      );
    } else if (finReserva < inicioReserva) {
      throw new Error(
        "Las fechas de fin a reservar no pueden ser anterior a la fecha de inicio"
      );
    }

    //BUSCA LOS CONSULTORIOS QUE YA TIENEN ASIGNADO ALGO EN Esa FECHA
    const consultYaAsignados = await ConsultorioAsignado.find({
      inicioReserva: { $gte: inicioReserva },
      finReserva: { $lte: finReserva },
    }).populate("doctor consultorio");
    if (consultYaAsignados) {
      consultYaAsignados.forEach((consultorioAsignadoDb) => {
        const dataConsultorio = JSON.stringify(
          consultorioAsignadoDb.consultorio
        );
        const consultorio = JSON.parse(dataConsultorio);
        if (consultorio._id == consultorioAsignadoRequestDto.id_consultorio) {
          throw new Error(
            "No se puede reservar, ya existe una reserva en ese rango de fechas para el consultorio seleccionado Consultorio : " +
              consultorio._id +
              " ]"
          );
        }
      });
    }

    const consultorioDto = await consultorioServices.getConsultorioById(
      consultorioAsignadoRequestDto.id_consultorio
    );
    const doctorDto = await doctorServices.getDoctorById(
      consultorioAsignadoRequestDto.id_doctor
    );

    const consultorioAsignadoDb = new ConsultorioAsignado({
      inicioReserva: inicioReserva,
      finReserva: finReserva,
      doctor: doctorDto.id,
      consultorio: consultorioDto.id,
    });

    await consultorioAsignadoDb.save();

    const consultorioAsignadoResponseDto = new ConsultorioAsignadoResponseDto(
      doctorDto.id,
      doctorDto.nombre,
      doctorDto.apellido,
      doctorDto.correo,
      doctorDto.nombreEspecialidad,
      consultorioDto.id,
      consultorioDto.ciudad,
      consultorioDto.direccion,
      consultorioDto.numero,
      consultorioDto.descripcion,
      consultorioAsignadoDb._id,
      consultorioAsignadoDb.inicioReserva,
      consultorioAsignadoDb.finReserva
    );

    return consultorioAsignadoResponseDto;
  } catch (error) {
    throw new Error("Error al asignar el consultorio " + error);
  }
};
export const getConsultorioAsignadoByConsultorio = async (
  idConsultorio: string
) => {
  try {
    // buscar si el id del consultorio existe
    const consultorioDto = await consultorioServices.getConsultorioById(
      idConsultorio
    );
    if (!consultorioDto) {
      throw new Error("El consultorio ingresado no existe");
    }
    const consultoriosAsignados = await ConsultorioAsignado.find({
      consultorio: idConsultorio,
    }).populate("doctor consultorio");
    //promise.All para evitar Promise { <pending> },
    const consultoriosAsignadosResponse = await Promise.all(
      consultoriosAsignados.map(async (consultorioAsignadoDb) => {
        ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
        const dataDoctor = JSON.stringify(consultorioAsignadoDb.doctor);
        const doctor = JSON.parse(dataDoctor);

        const dataConsultorio = JSON.stringify(
          consultorioAsignadoDb.consultorio
        );
        const consultorio = JSON.parse(dataConsultorio);

        const consultorioDto = await consultorioServices.getConsultorioById(
          consultorio._id
        );
        const doctorDto = await doctorServices.getDoctorById(doctor._id);

        const consultorioAsignadoResponseDto =
          new ConsultorioAsignadoResponseDto(
            doctorDto.id,
            doctorDto.nombre,
            doctorDto.apellido,
            doctorDto.correo,
            doctorDto.nombreEspecialidad,
            consultorioDto.id,
            consultorioDto.ciudad,
            consultorioDto.direccion,
            consultorioDto.numero,
            consultorioDto.descripcion,
            consultorioAsignadoDb._id,
            consultorioAsignadoDb.inicioReserva,
            consultorioAsignadoDb.finReserva
          );
        return consultorioAsignadoResponseDto;
      })
    );
    return consultoriosAsignadosResponse;
  } catch (error) {
    throw new Error(
      "Error al obtener los consultorios asignados por id consultorio" + error
    );
  }
};

export const getConsultorioAsignadoByEspecialidad = async (
  especialidad: string
): Promise<ConsultorioAsignadoResponseDto[]> => {
  try {
    // trae uunicamente los consuktoriosAsingados que tengan esa especialidad
    const especialidadDto =
      await especialidadServices.getEspecialidadesByNombre(
        especialidad.toUpperCase()
      );
    if (!especialidadDto) {
      throw new Error("la especialidad indicada no existe");
    }
    const doctoresDto = await doctorServices.getDoctoresByEspecialidad(
      especialidad.toUpperCase()
    );
    if (!doctoresDto) {
      throw new Error("no existen doctores con esa especialidad asociada");
    }
    //se añade types.ObjectId para que al recibir el Id doctor de tipo string la tranforme a un objeto que pueda detectar mongoose
    const doctoresIds = doctoresDto.map(
      (doctoresDto) => new Types.ObjectId(doctoresDto.id)
    );
    // busca los consultorios asignados asociados a los doctores encontrados, se usa  $in para recorrer el array
    const consultoriosAsignados = await ConsultorioAsignado.find({
      doctor: { $in: doctoresIds },
    }).populate("doctor consultorio");
    //promise.All para evitar Promise { <pending> },
    const consultoriosAsignadosResponse = await Promise.all(
      consultoriosAsignados.map(async (consultorioAsignadoDb) => {
        ///soluciuon temporal para traer el nombre de la especialidad evitando property '' does not exist on type 'ObjectId'.ts(2339)
        const dataDoctor = JSON.stringify(consultorioAsignadoDb.doctor);
        const doctor = JSON.parse(dataDoctor);

        const dataConsultorio = JSON.stringify(
          consultorioAsignadoDb.consultorio
        );
        const consultorio = JSON.parse(dataConsultorio);

        const consultorioDto = await consultorioServices.getConsultorioById(
          consultorio._id
        );
        const doctorDto = await doctorServices.getDoctorById(doctor._id);

        const consultorioAsignadoResponseDto =
          new ConsultorioAsignadoResponseDto(
            doctorDto.id,
            doctorDto.nombre,
            doctorDto.apellido,
            doctorDto.correo,
            doctorDto.nombreEspecialidad,
            consultorioDto.id,
            consultorioDto.ciudad,
            consultorioDto.direccion,
            consultorioDto.numero,
            consultorioDto.descripcion,
            consultorioAsignadoDb._id,
            consultorioAsignadoDb.inicioReserva,
            consultorioAsignadoDb.finReserva
          );
        return consultorioAsignadoResponseDto;
      })
    );
    return consultoriosAsignadosResponse;
  } catch (error) {
    throw new Error(
      "error al obtener los consultorios asignados por especialidad " + error
    );
  }
};

const convertirAFecha = (fechaString: string): Date => {
  const regex = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/;
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
  getConsultoriosAsignados,
  getConsultorioAsignadoById,
  createConsultorioAsignado,
  getConsultorioAsignadoByConsultorio,
  getConsultorioAsignadoByEspecialidad,
};
