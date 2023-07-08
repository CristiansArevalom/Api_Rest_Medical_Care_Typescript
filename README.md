# API REST for Medical Appointments


Basic api rest for Medical appointments using Node.js,Typescript, Express.js, MongoDB including the main data models like doctors, patients and medical appointment between doctors and patients.

This project was developed for the program "TODOS A LA U - Universidad DISTRITAL - BACKEND INTERMEDIO"

You can clone this repo as starter project for your Express, MongoDB API server


## Data Model 🔍
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
 git clone https://github.com/CristiansArevalom/ApiRestMedicalCareTypescript.git
 cd citas_medicas_bknd
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


## Features and Functionalities 🔥
-Node, Express, MongoDB, and Mongoose as ODM for Rest API medical appointments


-Crud operations for patients, doctors, consulting rooms, and reserve rooms, taking in mind office availability and dates


-NoSQL for database: Document-oriented MongoDB

# Available Endpoints:
- [Patients](#patients)
    - [GET] /api/pacientes
    - [POST] /api/pacientes
    - [PUT] /api/pacientes/:id
    - [GET] /api/pacientes/cedula/:cedula
    - [GET] /api/pacientes/:id
    - [DELETE] /api/pacientes/:id


- [Specialities](#specialities)
    - [GET] /api/especialidades/nombre/:NOMBRE_ESPECIALDIAD
    - [GET] /api/especialidades
    - [GET] /api/especialidades/:id


- [Doctors](#doctors)
     - [GET] /api/doctores
     - [POST] /api/doctores
     - [GET] /api/doctores/:id
     - [GET] /api/doctores/especialidad/:NOMBRE_ESPECIALDIAD


- [Consulting Room](#consulting-room)
    - [GET] /api/consultorios
    - [GET] /api/consultorios/:id
    - [POST] /api/consultorios
    - [PUT] /api/consultorios/:id
    - [DELETE] /api/consultorios/:id
    - [GET] /api/consultorios/reserva/fecha-inicio=DD-MM-YYY :HH:MM&fecha-fin=DD-MM-YYY :HH:MM
    //show Availables consulting rooms (consulting rooms without a doctor assigned)


- [Assigned Consulting Rooms](#assigned-consulting-rooms)
    - [GET] /api/consultorios-asignados
    - [GET] /api/consultorios-asignados/:id
    - [GET] /api/consultorios-asignados/consultorios/:id
    - [GET] /api/consultorios-asignados/especialidad/:NOMBRE_ESPECIALIDAD
    - [POST] /api/consultorios-asignados

- [Medical Appointments](#medical-appointments)
    - [GET] /api/citas-medicas
    - [GET] /api/citas-medicas/consultorio-asignado/:id
    - [GET] /api/citas-medicas/paciente/:id
    - [GET] /api/citas-medicas/doctor/:id
    - [GET] /api/citas-medicas/especialidad/:id
    - [POST] /api/citas-medicas

> Note: Assigned consulting rooms can only be created if the consulting room is available and have a valid date (does not have a doctor assigned in the range of dates given in the json)
A medical appointment can only be created if previously exist an assigned consulting room with the requested specialty , is available for medical appointments and has a valid date (does not have a previous medical appointment assigned on that range of dates)。
<




# See how it works

- [Patients](#patients)
    - [GET] /api/pacientes
    ![Get Methods for patients](/assets/Patients/GetPatients.gif)
    - [POST] /api/pacientes
    ![Post Methods for patients](/assets/Patients/PostPatients.gif)
    - [PUT] /api/pacientes/:id
    ![Put Methods for patients](/assets/Patients/PutPatients.gif)
    - [GET] /api/pacientes/cedula/:cedula
    ![Get patients by cedula](/assets/Patients/GetPatientByCedula.gif)
    - [GET] /api/pacientes/:id
    ![Get patients by id](/assets/Patients/GetPatientsById.gif)
    - [DELETE] /api/pacientes/:id
    ![Delete patients](/assets/Patients/DeletePatients.gif)

- [Specialities](#specialities)
    - [GET] /api/especialidades/nombre/:NOMBRE_ESPECIALDIAD
    ![Get Specialty by Name](/assets/Specialities/GetSpecialitiesByNombre.gif)
    - [GET] /api/especialidades
    ![Get Specialities](/assets/Specialities/GetSpecialities.gif)

    - [GET] /api/especialidades/:id
    ![Get Specialities by Id](/assets/Specialities/GetSpecialitiesById.gif)



- [Doctors](#doctors)
    - [GET] /api/doctores

     ![Get Methods for Doctor](/assets/Doctors/getDoctors.gif)

    - [POST] /api/doctores

     ![Post Methods for Doctors](/assets/Doctors/PostDoctor.gif)

    - [GET] /api/doctores/:id
     ![Get Doctors by id](/assets/Doctors/GetDoctorById.gif)

    - [GET] /api/doctores/especialidad/:NOMBRE_ESPECIALDIAD
     ![Get Doctors by Speciality](/assets/Doctors/GetDoctorBySpeciality.gif)



- [Consulting Room](#consulting-room)
    - [GET] /api/consultorios
    ![Get Consulting room](/assets/Consulting%20rooms/GetConsultingRooms.gif)

    - [GET] /api/consultorios/:id
    ![Get Consulting room by Id](/assets/Consulting%20rooms/GetConsultingRoomsById.gif)

    - [POST] /api/consultorios
    ![POST Consulting room](/assets/Consulting%20rooms/PostConsultingRooms.gif)

    - [PUT] /api/consultorios/:id
    ![PUT Consulting room](/assets/Consulting%20rooms/PutConsultingRooms.gif)

    - [DELETE] /api/consultorios/:id
    ![DELETE Consulting room](/assets/Consulting%20rooms/DeleteConsultingRoom.gif)

    - [GET] /api/consultorios/reserva/fecha-inicio=DD-MM-YYY :HH:MM&fecha-fin=DD-MM-YYY :HH:MM
    //show Availables consulting rooms (consulting rooms without a doctor assigned)
    ![Get Consulting room without a doctor assigned](/assets/Consulting%20rooms/getAvailableConsultingRooms.gif)



- [Assigned Consulting Rooms](#assigned-consulting-rooms)
    - [GET] /api/consultorios-asignados
    ![Get Assigned Consulting room](/assets/AssignedConsultongRooms/getAssignedConsultingRooms.gif)
    - [GET] /api/consultorios-asignados/:id
    ![Get Assigned Consulting room by room id](/assets/AssignedConsultongRooms/getAssignedConsultingRoomsById.gif)
    - [GET] /api/consultorios-asignados/consultorios/:id
        ![Get Assigned Consulting room by room id](/assets/AssignedConsultongRooms/getAssignedConsultingRoomsByIdRoom.gif)

    - [GET] /api/consultorios-asignados/especialidad/NOMBRE_ESPECIALIDAD
    ![Get Assigned Consulting room by speciality name](/assets/AssignedConsultongRooms/getAssignedConsultingRoomsBySpeciality.gif)

    - [POST] /api/consultorios-asignados
    ![POST Assigned Consulting room](/assets/AssignedConsultongRooms/PostAssignedConsultingRooms.gif)

- [Medical Appointments](#medical-appointments)
    - [GET] /api/citas-medicas
    ![Get Medical appointments](/assets/Medical%20appointments/getMedicalAppointments.gif)

    - [GET] /api/citas-medicas/consultorio-asignado/:id
    ![Get Medical appointments by Asignned roomid](/assets/Medical%20appointments/GetMedicalAppointmentByAssignedRoom.gif)


    - [GET] /api/citas-medicas/paciente/:id
    ![Get Medical appointments by patient id](/assets/Medical%20appointments/getMedicalAppointmentsByPatientId.gif)

    - [GET] /api/citas-medicas/doctor/:id
    ![Get Medical appointments by doctor id](/assets/Medical%20appointments/getMedicalAppointmentsByDoctorId.gif)

    - [GET] /api/citas-medicas/especialidad/:id
    ![Get Medical appointments by Specialty](/assets/Medical%20appointments/getMedicalAppointmentsBySpeciality.gif)

    - [POST] /api/citas-medicas
    ![POST Medical appointments](/assets/Medical%20appointments/PostMedicalAppointments.gif)

# Authors
- [@CristiansArevalom](https://github.com/CristiansArevalom)






