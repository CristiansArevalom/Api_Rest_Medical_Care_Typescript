import Paciente from "../models/paciente.model";
import PacienteResponseDto from "../controller/dto/PacienteResponseDto";
import PacienteRequestDto from "../controller/dto/PacienteRequestDto";

export const getPacientes = async (): Promise<PacienteResponseDto[]> => {
  try {
    const pacientes = await Paciente.find();
    const pacientesResponse = pacientes.map((pacienteDb) => {
      return new PacienteResponseDto(
        pacienteDb._id,
        pacienteDb.nombre,
        pacienteDb.apellido,
        pacienteDb.cedula,
        pacienteDb.fechaNacimiento,
        pacienteDb.telefono
      );
    });
    return pacientesResponse;
  } catch (error) {
    throw new Error("Error al obtener los pacientes");
  }
};

export const getPacienteById = async (
  id: String
): Promise<PacienteResponseDto> => {
  try {
    const pacienteDb = await Paciente.findById(id);
    if (!pacienteDb) {
      throw new Error("El paciente con ese Id no existe");
    }
    const pacienteResponseDto = new PacienteResponseDto(
      pacienteDb._id,
      pacienteDb.nombre,
      pacienteDb.apellido,
      pacienteDb.cedula,
      pacienteDb.fechaNacimiento,
      pacienteDb.telefono
    );

    return pacienteResponseDto;
  } catch (error) {
    throw new Error("Error al obtener el paciente " + error);
  }
};
export const createPaciente = async (
  pacienteRequestDto: PacienteRequestDto
): Promise<PacienteResponseDto> => {
  try {
    const pacienteExistenteCedula = await Paciente.findOne({
      cedula: pacienteRequestDto.cedula,
    });
    const pacienteExistenteTel = await Paciente.findOne({
      telefono: pacienteRequestDto.telefono,
    });
    const fechaActual = new Date();
    const fechaNacimiento = convertirAFecha(pacienteRequestDto.fechaNacimiento);

    if (pacienteExistenteCedula) {
      throw new Error("Paciente ya registrado");
    } else if (pacienteExistenteTel) {
      throw new Error("Telefono ya registrado");
    } else if (fechaNacimiento > fechaActual) {
      throw new Error(
        "Fecha de nacimiento Invalida, no puede ser superior a la fecha actual"
      );
    } else if (
      pacienteRequestDto.cedula.length < 8 ||
      pacienteRequestDto.cedula.length > 10
    ) {
      throw new Error(
        "Cedula ingresada invalida, debe tener de 8 a 10 caracteres"
      );
    } else if (
      pacienteRequestDto.telefono.length < 8 ||
      pacienteRequestDto.cedula.length > 12
    ) {
      throw new Error(
        "telefono ingresado invalido, debe tener de 8 a 12 caracteres"
      );
    }
    const pacienteDb = new Paciente({
      nombre: pacienteRequestDto.nombre,
      apellido: pacienteRequestDto.apellido,
      cedula: pacienteRequestDto.cedula,
      fechaNacimiento: pacienteRequestDto.fechaNacimiento,
      telefono: pacienteRequestDto.telefono,
    });
    await pacienteDb.save();
    const pacienteResponseDto = new PacienteResponseDto(
      pacienteDb._id,
      pacienteDb.nombre,
      pacienteDb.apellido,
      pacienteDb.cedula,
      pacienteDb.fechaNacimiento,
      pacienteDb.telefono
    );
    return pacienteResponseDto;
  } catch (error) {
    throw new Error("" + error);
  }
};
export const updatePaciente = async (
  id: String,
  pacienteRequestDto: PacienteRequestDto
): Promise<PacienteResponseDto> => {
  try {
    const pacienteExistenteCedula = await Paciente.findOne({
      cedula: pacienteRequestDto.cedula,
    });
    const pacienteExistenteTel = await Paciente.findOne({
      telefono: pacienteRequestDto.telefono,
    });
    const fechaActual = new Date();
    const fechaNacimiento = convertirAFecha(pacienteRequestDto.fechaNacimiento);
    if (pacienteExistenteCedula && pacienteExistenteCedula._id != id) {
      throw new Error("Paciente ya registrado con esa cedula");
    }
    if (pacienteExistenteTel && pacienteExistenteTel._id != id) {
      throw new Error("Telefono ya registrado");
    }
    if (fechaNacimiento > fechaActual) {
      throw new Error(
        "Fecha de nacimiento inválida, no puede ser superior a la fecha actual"
      );
    }
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      throw new Error("El paciente indicado no existe");
    }

    paciente.nombre = pacienteRequestDto.nombre;
    paciente.apellido = pacienteRequestDto.apellido;
    paciente.cedula = pacienteRequestDto.cedula;
    paciente.fechaNacimiento = fechaNacimiento;
    paciente.telefono = pacienteRequestDto.telefono;

    const pacienteActualizado = await paciente.save();

    const pacienteResponseDto = new PacienteResponseDto(
      pacienteActualizado._id,
      pacienteActualizado.nombre,
      pacienteActualizado.apellido,
      pacienteActualizado.cedula,
      pacienteActualizado.fechaNacimiento,
      pacienteActualizado.telefono
    );
    return pacienteResponseDto;
  } catch (error) {
    throw new Error("Error al actualizar el paciente: " + error);
  }
};
export const deletePaciente = async (id: String) => {
  try {
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      throw new Error("El paciente indicado no existe");
    }
    await Paciente.findByIdAndRemove(id);
  } catch (error) {
    throw new Error("Error al eliminar el paciente: " + error);
  }
};
export const getPacientesByCedula = async (
  cedula: String
): Promise<PacienteResponseDto> => {
  try {
    const pacienteDb = await Paciente.findOne({ cedula });
    if (!pacienteDb) {
      throw new Error("El paciente con esa cedula no existe");
    }
    const pacienteResponseDto = new PacienteResponseDto(
      pacienteDb._id,
      pacienteDb.nombre,
      pacienteDb.apellido,
      pacienteDb.cedula,
      pacienteDb.fechaNacimiento,
      pacienteDb.telefono
    );

    return pacienteResponseDto;
  } catch (error) {
    throw new Error("Error al obtener el paciente " + error);
  }
};

const convertirAFecha = (fechaString: string): Date => {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = fechaString.match(regex);
  if (!match) {
    throw new Error("Formato de fecha incorrecto");
  }
  const [, anio, mes, dia] = match;
  const fechaFormateada = new Date(Number(anio), Number(mes) - 1, Number(dia));
  return fechaFormateada;
};

export default {
  getPacientes,
  createPaciente,
  getPacienteById,
  updatePaciente,
  deletePaciente,
  getPacientesByCedula,
};
