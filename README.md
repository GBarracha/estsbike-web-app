# ESTSBike - Cycling Club Management System

**ESTSBike** is a full-stack web application developed to manage a cycling club's operations. It provides a complete interface to manage Event Types, Events, and Club Members, including complex business logic for member enrollment based on event preferences.

## About the Project
This project was built as part of the Web Programming course at Instituto Politécnico de Setúbal (IPS). It features a RESTful API built with **Node.js** and **Express**, connected to a **MySQL** relational database. The frontend is built using Vanilla **JavaScript**, **HTML**, and **CSS**, utilizing the Fetch API to communicate with the backend asynchronously and dynamically update the DOM.

## Key Features

### Event Types Management (Tipos de Eventos)
* **CRUD Operations:** Create, Read, Update, and Delete cycling event categories (e.g., *Road, Mountain Bike, Track*).
* **Validation:** Prevents deletion of event types that are currently associated with existing events or member preferences.

### Events Management (Eventos)
* **CRUD Operations:** Schedule and manage specific events, linking them to an existing Event Type.
* **Smart Deletion:** Prevents the deletion of events that already have enrolled members.

### Members Management (Membros)
* **Profile Creation:** Register members and define their preferred event types.
* **Smart Enrollment System:** Members can only be enrolled in events that match their predefined preferred event types.
* **Dynamic Interface:** Seamless enrollment and un-enrollment from events directly from the member's edit panel.

## Tech Stack

**Frontend:**
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**Backend & Database:**
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## How to Run the Project

### 1. Database Setup
You must have a MySQL server running locally. Execute the following SQL script to create the database, the dedicated user, and the required tables:

```sql
CREATE DATABASE `ests_bike_db`;

CREATE USER IF NOT EXISTS adm_usr IDENTIFIED BY 'ADM@20242025';
GRANT ALL ON ests_bike_db.* TO adm_usr;

USE ests_bike_db;

DROP TABLE IF EXISTS `membros_tipoDeEventos`;
DROP TABLE IF EXISTS `membros`;
DROP TABLE IF EXISTS `eventos`;
DROP TABLE IF EXISTS `tipoDeEventos`;

CREATE TABLE `tipoDeEventos`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descritivo` VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `eventos`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descritivo` VARCHAR(255) NOT NULL UNIQUE,
    `tipoDeEvento` INT NOT NULL, 
    FOREIGN KEY (`tipoDeEvento`) REFERENCES `tipoDeEventos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    `data` DATE NOT NULL
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;
CREATE INDEX `idx_eventos_tipoDeEvento` ON `eventos`(`tipoDeEvento`);

CREATE TABLE `membros`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `membros_tipoDeEventos`(
    `membro` INT NOT NULL, 
    FOREIGN KEY (`membro`) REFERENCES `membros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `tipoDeEvento` INT NOT NULL, 
    FOREIGN KEY (`tipoDeEvento`) REFERENCES `tipoDeEventos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    PRIMARY KEY(`membro`,`tipoDeEvento`)
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;
CREATE INDEX `idx_membro` ON `membros_tipoDeEventos`(`membro`);
CREATE INDEX `idx_tipoDeEvento` ON `membros_tipoDeEventos`(`tipoDeEvento`);
```


### 2. Backend Setup
Clone the repository and install the required Node.js dependencies:

```bash
git clone [https://github.com/your-username/estsbike-web-app.git](https://github.com/your-username/estsbike-web-app.git)

# Navigate to the project directory
cd estsbike-web-app

# Install dependencies
npm install

# Fix any vulnerabilities if necessary
npm audit fix:
```

### 3. Run the Server
Start the Express server:
```bash
node app.js
```
The server will start running at http://localhost:8081. Open this URL in your browser to interact with the application.

## API Endpoints Overview
The Express backend provides the following RESTful endpoints:

* **/tiposDeEvento** (GET, POST, PUT, DELETE)

* **/eventos** (GET, POST, PUT, DELETE)

* **/membros** (GET, POST, PUT, DELETE)

## Authors
- **Gonçalo Barracha** - 202200187