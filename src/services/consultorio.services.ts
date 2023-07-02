import Consultorio from "../models/consultorio.model";
import ConsultorioResponseDto from "../controller/dto/consultorioResponseDto";
import consultorioAsignadoServices from "./consultorioAsignado.services";

export const getConsultorios = async (): Promise<ConsultorioResponseDto[]> => {
  try {
    const consultorios = await Consultorio.find();
    const consultoriosResponse = consultorios.map((consultorioDb) => {
      return new ConsultorioResponseDto(
        consultorioDb.id,
        consultorioDb.ciudad,
        consultorioDb.direccion,
        consultorioDb.numero,
        consultorioDb.descripcion
      );
    });
    return consultoriosResponse;
  } catch (error) {
    throw new Error("Error al obtener consultorios " + error);
  }
};
export const getConsultorioById = async (
  id: String
): Promise<ConsultorioResponseDto> => {
  try {
    const consultorioDb = await Consultorio.findById(id);
    if (!consultorioDb) {
      throw new Error("El consultorio con ese Id no existe");
    }
    const consultorioResponseDto = new ConsultorioResponseDto(
      consultorioDb.id,
      consultorioDb.ciudad,
      consultorioDb.direccion,
      consultorioDb.numero,
      consultorioDb.descripcion
    );
    return consultorioResponseDto;
  } catch (error) {
    throw new Error("Error al obtener el consultorio " + error);
  }
};
export const createConsultorio = async (
  consultorioRequest: ConsultorioResponseDto
): Promise<ConsultorioResponseDto> => {
  try {
    const consultorioByDireccion = await Consultorio.find({
      ciudad: consultorioRequest.ciudad,
      descripcion: consultorioRequest.descripcion,
      direccion: consultorioRequest.direccion,
      numero: consultorioRequest.numero,
    });
    if (consultorioByDireccion.length > 0) {
      consultorioByDireccion.forEach((consultorio) => {
        if (
          consultorio.ciudad == consultorioRequest.ciudad &&
          consultorio.descripcion == consultorioRequest.descripcion &&
          consultorio.direccion == consultorioRequest.direccion &&
          consultorio.numero == consultorioRequest.numero
        ) {
          throw new Error("Error el consultorio a ingresar ya existe");
        }
      });
    }
    const consultorioDb = new Consultorio({
      ciudad: consultorioRequest.ciudad,
      descripcion: consultorioRequest.descripcion,
      direccion: consultorioRequest.direccion,
      numero: consultorioRequest.numero,
    });
    await consultorioDb.save();
    const consultorioResponseDto = new ConsultorioResponseDto(
      consultorioDb.id,
      consultorioDb.ciudad,
      consultorioDb.direccion,
      consultorioDb.numero,
      consultorioDb.descripcion
    );
    return consultorioResponseDto;
  } catch (error) {
    throw new Error("Error al ingresar el consultorio " + error);
  }
};
export const updateConsultorio = async (
  id: String,
  consultorioRequest: ConsultorioResponseDto
): Promise<ConsultorioResponseDto> => {
  try {
    const consultorioByDireccion = await Consultorio.find({
      ciudad: consultorioRequest.ciudad,
      descripcion: consultorioRequest.descripcion,
      direccion: consultorioRequest.direccion,
      numero: consultorioRequest.numero,
    });
    if (consultorioByDireccion.length > 0) {
      consultorioByDireccion.forEach((consultorio) => {
        if (
          consultorio.id != id &&
          consultorio.ciudad == consultorioRequest.ciudad &&
          consultorio.descripcion == consultorioRequest.descripcion &&
          consultorio.direccion == consultorioRequest.direccion &&
          consultorio.numero == consultorioRequest.numero
        ) {
          throw new Error("Error el consultorio a ingresar ya existe");
        }
      });
    }
    const consultorio = await Consultorio.findById(id);
    if (!consultorio) {
      throw new Error("El consultorio indicado no existe");
    }
    consultorio.ciudad = consultorioRequest.ciudad;
    consultorio.direccion = consultorioRequest.direccion;
    consultorio.numero = consultorioRequest.numero;
    consultorio.descripcion = consultorioRequest.descripcion;

    const consultorioActualizado = await consultorio.save();

    const consultorioResponseDto = new ConsultorioResponseDto(
      consultorioActualizado._id,
      consultorioActualizado.ciudad,
      consultorioActualizado.direccion,
      consultorioActualizado.numero,
      consultorioActualizado.descripcion
    );
    return consultorioResponseDto;
  } catch (error) {
    throw new Error("Error al actualizar el consultorio" + error);
  }
};
export const deleteConsultorio = async (id: String) => {
  try {
    const consultorio = await Consultorio.findById(id);
    if (!consultorio) {
      throw new Error("El consultorio indicado no existe");
    }
    await Consultorio.findByIdAndRemove(id);
  } catch (error) {
    throw new Error("Error al eliminar el consultorio " + error);
  }
};

export const getConsultoriosDisponibles = async (
  fechaInicioStr: string,
  FechaFinStr: string
): Promise<ConsultorioResponseDto[]> => {
  try {
    const consultoriosDisponibles = new Set<string>();
    const consultoriosDisponiblesResponse: ConsultorioResponseDto[] = [];
    let fechaReservaOcupada: boolean = true;
    const fechaSolicitudReservaInicio = await convertirAFechaHora(
      fechaInicioStr
    );
    const fechaSolicitudReservaFin = await convertirAFechaHora(FechaFinStr);
    const fechaActual = new Date();
    if (
      fechaSolicitudReservaInicio < fechaActual ||
      fechaSolicitudReservaInicio > fechaSolicitudReservaFin
    ) {
      throw new Error(
        "La fecha de inicio a reservar no pueden ser inferior a la fecha de hoy, o a la fecha de fin reserva"
      );
    } else if (fechaSolicitudReservaFin < fechaActual) {
      throw new Error(
        "Las fechas de fin a reservar no pueden ser anterior a la fecha de hoy"
      );
    }

    //se busca los consultorios que no tegan una reserva en el rango de fechas ingresado
    const consultoriosDb = await Consultorio.find();
    const consultoriosAsigDb =
      await consultorioAsignadoServices.getConsultoriosAsignados();
    //Validar si consultorio esta en consultorio asignado
    for (const consultorioDb of consultoriosDb) {
      //SE DEBE MEJORAR A NIVEL DE PERFORMANCE
      const consultorioAsignadosByiD =
        await consultorioAsignadoServices.getConsultorioAsignadoByConsultorio(
          consultorioDb._id
        );
      if (consultorioAsignadosByiD !== undefined) {
        // si existe valida fechas.
        for (const consultAsign of consultorioAsignadosByiD) {
          const fechaInicioReserva = convertirAFechaHora(
            consultAsign.inicioReserva
          );
          const fechaFinReserva = convertirAFechaHora(consultAsign.finReserva);
          //VALIDANDO FECHAS.
          // Verifica si la fecha de inicio de la solicitud de cita se superpone con una fecha de reserva existente.
          const fechaInicioReservaOcupada: boolean =
            fechaSolicitudReservaInicio >= fechaInicioReserva &&
            fechaSolicitudReservaInicio <= fechaFinReserva;
          // Verifica si la fecha de finalización de la solicitud de cita se superpone con una fecha de reserva existente.
          const fechaFinReservaOcupada: boolean =
            fechaSolicitudReservaFin >= fechaInicioReserva &&
            fechaSolicitudReservaFin <= fechaFinReserva;
          fechaReservaOcupada =
            fechaInicioReservaOcupada || fechaFinReservaOcupada;
          if (!fechaReservaOcupada && fechaReservaOcupada !== undefined) {
            const consultorioResponseDto = new ConsultorioResponseDto(
              consultorioDb.id,
              consultorioDb.ciudad,
              consultorioDb.direccion,
              consultorioDb.numero,
              consultorioDb.descripcion
            );
            //validando si ya existe antes de ingresarlo al array para evitar duplicados
            //validando si ya existe antes de ingresarlo al array para evitar duplicados
            const consultorioResponseDtoStr = JSON.stringify(
              consultorioResponseDto
            );
            if (!consultoriosDisponibles.has(consultorioResponseDtoStr)) {
              consultoriosDisponibles.add(consultorioResponseDtoStr);
              consultoriosDisponiblesResponse.push(consultorioResponseDto);
            }
          }
        }
      } else {
        //si no esta reservado, se añade a consultorios disponibles
        const consultorioResponseDto = new ConsultorioResponseDto(
          consultorioDb.id,
          consultorioDb.ciudad,
          consultorioDb.direccion,
          consultorioDb.numero,
          consultorioDb.descripcion
        );
        //validando si ya existe antes de ingresarlo al array para evitar duplicados
        const consultorioResponseDtoStr = JSON.stringify(
          consultorioResponseDto
        );
        if (!consultoriosDisponibles.has(consultorioResponseDtoStr)) {
          consultoriosDisponibles.add(consultorioResponseDtoStr);
          consultoriosDisponiblesResponse.push(consultorioResponseDto);
        }
      }
    }
    return consultoriosDisponiblesResponse;
  } catch (error) {
    throw new Error("error al buscar consultorios disponibles" + error);
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
  getConsultorios,
  createConsultorio,
  getConsultorioById,
  updateConsultorio,
  deleteConsultorio,
  getConsultoriosDisponibles,
};
