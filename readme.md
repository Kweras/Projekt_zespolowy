# Server and Client Setup Guide

## Server Setup (ExpressJS)

1. Create a new directory for the server and install packages:
    ```bash
    mkdir server
    cd server
    npm install 
    ```

### Used packages:
    - express 
    - mongoose 
    - cors 
    - nodemon 
    - dotenv 
    - bcryptjs

2. Edit the `package.json` file  to add the following script:
    ```json
    "scripts": {
        "start": "nodemon index.js"
    }
    ```

3. Add `.env` file with following line:
   ```
   MONGO_URL='your_mongo_cluster_url'
   ```

---

## Client Setup (React)

1. Create a new directory for the client and install packages:
    ```bash
    mkdir client
    npx create-react-app .
    npm install
    ```
    Yes, there is a dot at the end of command.

### Used packages:
    - react-router-dom
    - react-icons
        reference: `https://react-icons.github.io/react-icons/`
    - react-modal

---

## Starting the Server

1. Open a terminal and navigate to the server directory:
    ```bash
    cd server
    ```
2. Start the server:
    ```bash
    npm start
    ```

---

## Starting the Client (in a different terminal tab)

1. Open another terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2. Start the React application:
    ```bash
    npm start
    ```

---
