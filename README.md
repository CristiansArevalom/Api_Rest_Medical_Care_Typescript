# API REST for Medical Appointments


Basic api rest for Medical appointments using Node.js,Typescript, Express.js, MongoDB including the main data models like doctors, patients and medical appointment between doctors and patients.


Author:Cristian Arevalo.


You can clone this repo as starter project for your Express, MongoDB API server


## Data Model
    Data model based on a relational model and adapted to mongoDb.
        ![Relational Data Model](/assets/image.png)


## Tech Stack 💻


- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MongoDB - Cloud](https://www.mongodb.com/cloud)
- [Mongoose](https://mongoosejs.com)
- [TypeScript](https://www.typescriptlang.org/)


## Installation and Running App :zap:



**1. Clone this repo by running the following command :-**


```bash
 git clone https://github.com/CristiansArevalom/Api_Rest_Medical_Care_Typescript
 cd basic_api_rest
```


**2. Install the required package:-**


```bash
 npm install
```


**3. Now run the npm command to start the project :-**


```bash
 npm start
```


**4.** **🎉 OpenPostmann and test the restAPIi on thisurl:l `https://127.0.0.1:3200`**


Remember that the .env file must be created for the API to work.


Additionally, this project uses:


- [Nodemon](https://nodemon.io)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [body-parser](https://www.npmjs.com/package/body-parser)


**Follow the steps of the Steps presentation in the repository -**


## Features and Functionalities
-Node, Express, MongoDB, and Mongoose as ODM for Rest API medical appointments


-Crud operations for patients, doctors, consulting rooms, and reserve rooms, taking in mind office availability and dates


-NoSQL for database: Document-oriented MongoDB

-This project has many endpoints for use, like:
```bash
### Patients
[GET] /api/pacientes
[POST] /api/pacientes
[PUT] /api/pacientes/:id
[GET] /api/pacientes/cedula/:cedula
[GET] /api/pacientes/:id
[DELETE] /api/pacientes/:id


### Specialities
[GET] /api/especialidades/nombre/:NOMBRE_ESPECIALDIAD
[GET] /api/especialidades
[GET] /api/especialidades/:id


### Doctors
[GET] /api/doctores
[POST] /api/doctores
[GET] /api/doctores/:id
[GET] /api/doctores/especialidad/:NOMBRE_ESPECIALDIAD


### Consulting room
[GET] /api/consultorios
[GET] /api/consultorios/:id
[POST] /api/consultorios
[PUT] /api/consultorios/:id
[DELETE] /api/consultorios/:id
[GET] /api/consultorios/reserva/fecha-inicio=DD-MM-YYY :HH:MM&fecha-fin=DD-MM-YYY :HH:MM
//show Availables consulting rooms (consulting rooms without a doctor assigned)


##Assigned consulting rooms
[GET] /api/consultorios-asignados
[GET] /api/consultorios-asignados/:id
[GET] /api/consultorios-asignados/consultorios/:id
[GET] /api/consultorios-asignados/especialidad/:NOMBRE_ESPECIALIDAD
[POST] /api/consultorios-asignados


##Medical appointments
[GET] /api/citas-medicas
[GET] /api/citas-medicas/consultorio-asignado/:id
[GET] /api/citas-medicas/paciente/:id
[GET] /api/citas-medicas/doctor/:id
[GET] /api/citas-medicas/especialidad/:id
[POST] /api/citas-medicas
```
> Note: Assigned consulting rooms can only be created if the consulting room is available and have a valid date (does not have a doctor assigned in the range of dates given in the json)
A medical appointment can only be created if previously exist an assigned consulting room with the requested specialty , is available for medical appointments and has a valid date (does not have a previous medical appointment assigned on that range of dates)。
<



## See how it works


### Patients
![Post and get Methods for patients](/assets/PostPatients.gif)
### Doctors
![Post and get Methods for Doctors](/assets/PostDoctor.gif)
### Medical Appointments
![Post and get Methods for Medical appointments](/assets//PostMedicalAppointments.gif)



