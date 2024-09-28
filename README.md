# Invoice Generator API

This project is a **Node.js-based API** that enables users to create quotations, fetch all quotations, download quotation as PDFs. It uses **MongoDB** for data persistence, **Express.js** for routing, and **Docker** for containerization. The application is deployed on **Railway**.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)

## Project Overview

This project enables users to generate quotation for products, view/download previously created quotations. Authentication is handled using **JWT tokens**.

## Technologies Used

- **Node.js** - Backend runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Docker** - Containerization for deployment
- **Puppeteer** - PDF generation from HTML templates
- **JWT** - Token-based authentication
- **Railway** - Hosting platform for deployment

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Invoice Generation**: Generate and download invoice PDFs.
- **Quotation Management**: View and download previously generated quotations.

## API Documentation

### Base URL

The API is deployed on **Railway** and can be accessed at the following base URL:
https://invoice-generator-production-0a7c.up.railway.app


### Endpoints

#### Authentication

- **POST /api/register**  
  Registers a new user.

- **POST /api/login**  
  Logs in a user and returns a JWT token.

#### Products

- **POST /api/products**  
  Adds products and generates an invoice PDF. Requires authentication.

- **GET /api/products/quotations**  
  Retrieves all previously generated quotations for the authenticated user.

- **GET /api/products/download/:pdfName?Authorization = {JWT token}**  
  Downloads the specified invoice PDF. Authentication required.

### Example API Usage

1. **User Registration**:  
   POST /api/register

        {
   
            "username": "john_doe",
            "email": "john@example.com",
            "password": "Strong@Password123"
        }

2. **User Login**:  
    POST /api/login
        
        {
            "username": "john_doe",
            "password": "Strong@Password123"
        }

3. **Add Products**:  
POST /api/products
Authorization: <JWT token>

        {
        
            "products": [
                {
                    "name": "Product A",
                    "qty": 2,
                    "rate": 150
                },
                {
                    "name": "Product B",
                    "qty": 1,
                    "rate": 300
                }
            ]
        }

4. **View Quotations**:  
GET /api/products/quotations
Authorization: <JWT token>

        {
            "pdfs": [
                {
                    "id": "66f7fb005b0878b318aadbe2",
                    "date": "2024-09-28T12:48:00.836Z",
                    "pdfUrl": "{URL}"
                },
                {
                    "id": "66f7fb005b0878b318aadbe3",
                    "date": "2024-09-28T12:48:00.836Z",
                    "pdfUrl": "{URL}"
                }
            ]
        }

5. **Download Quotation**:  

        GET /api/products/download/invoice_xxx.pdf?Authorization=<JWT token>


## Setup and Installation
To run this project locally, follow these steps:

### Prerequisites

Ensure that the following are installed on your machine:
- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (Local MongoDB instance or a MongoDB Atlas account)

### Installation Steps

#### Clone the Repository:

    git clone https://github.com/raju470/Invoice-generator.git

    cd Invoice-generator

    npm install

#### Set up environment variables
##### create .env file with the following content
    PORT=5000

    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority

    JWT_SECRET=yourSecretKey

    JWT_EXPIRY=1h

## Running the Application

### Locally

#### 1- Start MongoDB: 
    If you're running MongoDB locally, ensure it is up and running.

#### 2-  Start the application
    npm start

#### 3- Access the application
    App should now be running at http://localhost:5000

### Using Docker

#### 1- Build the Docker image: 
    docker build -t your-app-name .

#### 2-  Run the Docker container
    docker run -p 5000:5000 your-app-name

#### 3- Access the application
    our app should now be running at http://localhost:5000


## Deployment
The project is deployed on Railway using Docker

### Deploying on Railway
    1- Push to GitHub: Ensure code is pushed to GitHub.

    2- Connect Railway to GitHub: Go to Railway and connect GitHub repository.

    3- Deploy: Railway will automatically detect Dockerfile and build/deploy the app.

    4- Enviroment variable: Set the all enviroment variable

    5- Access the Deployed App: The app will be accessible at https://your-app-name.railway.app.



