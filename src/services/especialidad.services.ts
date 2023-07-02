import EnumEspecialidad from "../models/enumEspecialidad";
import Especialidad from "../models/especialidad.model";
import EspecialidadDto from "../controller/dto/EspecialidadDto";

export const fillEspecialidades = async () => {
  try {
    const especialidades = Object.keys(EnumEspecialidad);
    const valoresEnum = Object.values(EnumEspecialidad);
    for (const especialidad of especialidades) {
      const exiteEspecialidad = await Especialidad.findOne({
        nombre: especialidad,
      });
      if (!exiteEspecialidad) {
        const descripcionEnum =
          valoresEnum[especialidades.indexOf(especialidad)];
        await Especialidad.create({
          nombre: especialidad,
          descripcion: descripcionEnum,
        });
        //EnumEspecialidad.CARDIOLOGIA
        console.log();
        console.log(`Especialidad ${especialidad} creada.`);
      }
    }
  } catch (error) {
    throw new Error("Error al llenar por defecto Especialidad " + error);
  }
};

export const getEspecialidades = async (): Promise<EspecialidadDto[]> => {
  try {
    const especialidades = await Especialidad.find();
    const especialidadesDto = especialidades.map((especialidadDb) => {
      return new EspecialidadDto(
        especialidadDb.id,
        especialidadDb.nombre,
        especialidadDb.descripcion
      );
    });
    return especialidadesDto;
  } catch (error) {
    throw new Error("Error al obtener las especialidades" + error);
  }
};

export const getEspecialidadesByNombre = async (
  nombreEspecialidad: string
): Promise<EspecialidadDto> => {
  try {
    /*trae el tipo de dato enumEspecialidad en base al string nombre; Primero busca
     * si existe en la clase, ya que se definio que es enum y debe si o si existir
     * en dica clase,*/
    const especialidades = Object.keys(EnumEspecialidad);
    if (!especialidades.includes(nombreEspecialidad.toUpperCase())) {
      throw new Error(
        "No existe la especialidad con exactamente ese nombre en enum"
      );
    }
    const especialidadDb = await Especialidad.findOne({
      nombre: nombreEspecialidad,
    });
    if (!especialidadDb) {
      throw new Error(
        "No existe la especialidad con exactamente ese nombre en BD"
      );
    }
    return new EspecialidadDto(
      especialidadDb.id,
      especialidadDb.nombre,
      especialidadDb.descripcion
    );
  } catch (error) {
    throw new Error("Error al consultar por nombreEspecialidad " + error);
  }
};

export const getEspecialidadById = async (id: string) => {
  try {
    const especialidadDb = await Especialidad.findById(id);
    if (!especialidadDb) {
      throw new Error("No existe la especialidad con ese ID");
    }
    return new EspecialidadDto(
      especialidadDb.id,
      especialidadDb.nombre,
      especialidadDb.descripcion
    );
  } catch (error) {
    throw new Error("Error al buscar la especialidad por id " + error);
  }
};

export default {
  fillEspecialidades,
  getEspecialidades,
  getEspecialidadesByNombre,
  getEspecialidadById,
};
