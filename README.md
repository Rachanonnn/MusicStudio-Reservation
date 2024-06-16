<div align="center">

# Studio Reservation

</div>

# Gateway API

This project implements a set of API gateways for managing users, studio, and reservation using the Express framework in Node.js.

## Getting Started

### Prerequisites

- Node.js 20.6.0+

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Rachanonnn/MusicStudio-Reservation
   cd MusicStudio-Reservation
   cd Backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## .env file

```
PORT= 3000
NODE_ENV= development
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=
JWT_COOKIE_EXPIRE=
HOST= http://localhost
```

### Running the Application

Start the application using the following command:

```sh
npm run dev
```

## API Endpoints Backend

### Studio Management

Base URL: `/api/v1`

- **GET /studio/get_all_studios**: Retrieve all studio data
- **GET /studio/get_studio_by_id**: Retrieve a studio data by studioID
- **POST /studio/create_studio**: Add a new studio
- **PUT /studio/update_studio**: Update a studio data
- **DELETE /studio/delete_studio**: Remove a studio data
-
- **GET /studio/get_all_studio_rooms**: Retrieve all room data by studioID
- **GET /studio/get_studio_room_by_id**: Retrieve a room data by studioID, roomID
- **POST /studio/create_studio_room**: Add a new room
- **PUT /studio/update_studio_room**: Update a room data
- **DELETE /studio/delete_studio_room**: Remove a room data
-
- **GET /studio/get_all_equipments**: Retrieve all equipment data by studioID, roomID
- **GET /studio/get_equipment_by_id**: Retrieve a equipment data by studioID, roomID, equipmentID
- **POST /studio/create_equipment**: Add a new equipment
- **PUT /studio/update_equipment**: Update a equipment data
- **DELETE /studio/delete_equipment**: Remove a equipment data

## Project Structure

- **models**: Contains the data struct.
- **controller**: Contains the logical functions.
- **route**: Contains the path of the functions.
- **server.js**: Entry point of the application.
