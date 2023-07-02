import Doctor from "../models/doctor.model";
import DoctorDto from "../controller/dto/DoctorDto";
import especialidadServices from "./especialidad.services";

//trae los doctores con su especialdiad
export const getDoctores = async () => {
  try {
    const doctores = await Doctor.find().populate("especialidad");
    const doctoresResponse = doctores.map((doctorDb) => {
      ///soluciuon temporal para traer el nombre de la especialidad evitando property 'nombre' does not exist on type 'ObjectId'.ts(2339)
      const dataEspecialidad = JSON.stringify(doctorDb.especialidad);
      const especialidad = JSON.parse(dataEspecialidad);

      return new DoctorDto(
        doctorDb.id,
        doctorDb.nombre,
        doctorDb.apellido,
        doctorDb.correo,
        especialidad.nombre
      );
    });

    return doctoresResponse;
  } catch (error) {
    throw new Error("Error al buscar los doctores " + error);
  }
};
export const createDoctor = async (doctorDto: DoctorDto) => {
  try {
    // Obtener el nombre de la especialidad del DTO
    const nombreEspecialidad = doctorDto.nombreEspecialidad;
    // Buscar la especialidad por nombre en la base de datos, se coloco await para que espere a traer la especialidad
    const especialidadDb = await especialidadServices.getEspecialidadesByNombre(
      nombreEspecialidad
    );
    // Si no se encuentra la especialidad, lanzar una excepción o manejar el error
    if (!especialidadDb) {
      throw new Error(`La especialidad ${nombreEspecialidad} no existe `);
    }
    // Validar si ya existe con el correo creado para controlar el campo unico
    const doctorByEmail = await Doctor.findOne({ correo: doctorDto.correo });
    if (doctorByEmail) {
      throw new Error("Error al guardar correo, ya se encuentra registrado");
    }
    const doctorDb = new Doctor({
      nombre: doctorDto.nombre,
      apellido: doctorDto.apellido,
      correo: doctorDto.correo,
      especialidad: especialidadDb.id,
    });
    await doctorDb.save();
    const doctorResponseDto = new DoctorDto(
      doctorDb._id,
      doctorDb.nombre,
      doctorDb.apellido,
      doctorDb.correo,
      nombreEspecialidad
    );
    return doctorResponseDto;
  } catch (error) {
    throw new Error("Error al crear el doctor " + error);
  }
};

export const getDoctorById = async (id: string) => {
  try {
    const doctorDb = await Doctor.findById(id).populate("especialidad");
    if (!doctorDb) {
      throw new Error("El doctor con ese Id no existe");
    }
    ///soluciuon temporal para traer el nombre de la especialidad evitando property 'nombre' does not exist on type 'ObjectId'.ts(2339)
    const dataEspecialidad = JSON.stringify(doctorDb.especialidad);
    const especialidad = JSON.parse(dataEspecialidad);
    return new DoctorDto(
      doctorDb.id,
      doctorDb.nombre,
      doctorDb.apellido,
      doctorDb.correo,
      especialidad.nombre
    );
  } catch (error) {
    throw new Error("Error al obtener el doctor " + error);
  }
};

export const getDoctoresByEspecialidad = async (nombreEspecialidad: string) => {
  // Buscar la especialidad por nombre en la base de datos, se coloco await para que espere a traer la especialidad
  const especialidadDb = await especialidadServices.getEspecialidadesByNombre(
    nombreEspecialidad
  );
  // Si no se encuentra la especialidad, lanzar una excepción o manejar el error
  if (!especialidadDb) {
    throw new Error(`La especialidad ${nombreEspecialidad} no existe `);
  }
  const doctores = await Doctor.find({
    especialidad: especialidadDb.id,
  }).populate("especialidad");
  const doctoresResponse = doctores.map((doctorDb) => {
    ///soluciuon temporal para traer el nombre de la especialidad evitando property 'nombre' does not exist on type 'ObjectId'.ts(2339)
    const dataEspecialidad = JSON.stringify(doctorDb.especialidad);
    const especialidad = JSON.parse(dataEspecialidad);
    return new DoctorDto(
      doctorDb.id,
      doctorDb.nombre,
      doctorDb.apellido,
      doctorDb.correo,
      especialidad.nombre
    );
  });
  return doctoresResponse;
};
export default {
  getDoctores,
  createDoctor,
  getDoctorById,
  getDoctoresByEspecialidad,
};
