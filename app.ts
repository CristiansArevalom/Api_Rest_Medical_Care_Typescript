
import db, { conectarBd } from './config/db';
import app from './config/server';// Importar la configuración del servidor Express
import pacienteRoutes from './src/routes/paciente.routes';
import consultorioRoutes from './src/routes/consultorio.routes';
import especialidadServices from './src/services/especialidad.services';
import especialidadRoutes from './src/routes/especialidad.routes';
import doctorRoutes from './src/routes/doctor.routes';
import consultorioAsignadoRoutes from './src/routes/consultoriosAsignados.routes';
import citasMedicasRouter from './src/routes/citasMedicas.routes';


const PORT = process.env.PORT || 3000;

// Conectarse a la base de datos y llenando tabla de especialidad..una vez conectada la BD
//para hacer algo similar al postconstruct de springboot
//no estoy seguro que sea la mejor forma
async function inicializarDatos(){
  await conectarBd();
  await especialidadServices.fillEspecialidades();
}

inicializarDatos(); 

//inversify.io

// Rutas y configuración adicional
// ...
app.use('/api/pacientes',pacienteRoutes)
app.use('/api/consultorios',consultorioRoutes)
app.use('/api/especialidades',especialidadRoutes)
app.use('/api/doctores',doctorRoutes)
app.use('/api/consultorios-asignados',consultorioAsignadoRoutes)
app.use('/api/citas-medicas',citasMedicasRouter)

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
  console.log(`Go to http://127.0.0.1:${PORT}`)

});



