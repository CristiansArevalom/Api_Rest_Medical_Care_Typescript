import express from 'express';
const cors = require('cors');
const app = express();



const port = process.env.PORT || 3000;
// Configuración del CORS
app.use(cors());
app.set('port', port);
app.use(express.json());

export default app;