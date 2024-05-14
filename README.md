# Logistics API

This project is a logistics API built with Node.js, Express, Typescript, Postgresql, Typeorm and Docker. It provides functionalities for user registration, login, submission of packages for delivery, tracking packages,etc.

## Features

- User Authentication (Registration & Login) using Jsonwebtoken
- Package Submission for delivery
- Package Tracking
- Automated Package Status Update

## Technologies Used

- Node.js: JavaScript runtime environment for server-side development. (https://nodejs.org/en)
- Express.js: Web framework for building APIs with Node.js. (https://expressjs.com/)
- Typescript: Superset of JavaScript that adds static typing for improved code maintainability. (https://www.typescriptlang.org/docs)
- Postgresql: SQL database for storing user information and packages. (https://www.mongodb.com/)
- Typeorm: Typescript based ORM for SQL fast, quick and easy SQL database transactions (https://typeorm.io/)
- Docker: Service for application containerization (https://docker.com)

## Prerequisite
1. Docker desktop
   

## Installation
1. Clone the repository
   ```
   git clone https://github.com/VictorChukwudi/Logistics-API.git
   ```
2. Install dependencies
   ```
   cd Logistics-API
   npm install
   ```
3. Build and run the docker container
- For first time
   ```
    docker-compose up --build
   ```
- Subsequently
  ```
    docker-compose up
  ```
## API Endpoints
### Authentication
- `POST /api/auth/register:` Register a new user.
- `POST /api/auth/login:` Login an existing user.
  
### User Actions - submit, track and simulate automatic status update (Protected Using JWT)
- `POST /api/packages/submit:` Submit a package for delivery.
- `GET /api/packages/:packageId:` Track a package delivery status - pending, in-transit, out-for-delivery, delivered.
- `POST /api/packages/:packageId/update:` To simulate automatic package status update every 2 minutes.

  
## Usage
1. Register a new user using the /api/auth/register endpoint.
2. Login with the registered user using the /api/auth/login endpoint to obtain an authentication token.
3. Use the obtained token to access protected endpoints for user actions - submission, tracking of packages and automatically updating delivery status of packages.
   
## Deploy
Click [here](https://logistics-api-2y0k.onrender.com) to access a deployed version of this API
   
## Documentation
Click [here](https://documenter.getpostman.com/view/19721625/2sA3JQ5Kuz) to get the full documentation of this API.





