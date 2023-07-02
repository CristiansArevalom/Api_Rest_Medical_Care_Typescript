import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dataBaseUrl:string = process.env.DATABASE_URL||"";

if (!dataBaseUrl) {
    throw new Error('La variable de entorno DATABASE_URL no está definida');
  }

export const conectarBd=async()=>{
    try{
        await mongoose.connect(dataBaseUrl);
        console.log('Connectado a la base de datos');
    }catch(error){
    console.error("Error al conectar a la base de datos:", error);

    }
  }

  export default conectarBd;
 /* 
mongoose.connect(dataBaseUrl);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

export default database;
*/