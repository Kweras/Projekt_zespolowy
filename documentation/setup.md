# Server and Client Setup Guide

### Used packages:
    Server:
    - express 
    - mongoose 
    - cors 
    - nodemon 
    - dotenv 
    - bcryptjs
    
    Client:
    - react
    - react-router-dom
    - react-icons
        reference: `https://react-icons.github.io/react-icons/`
    - react-modal

1. Add `.env` file in server folder with following line:
```
MONGO_URL='your_mongo_cluster_url'
```
2. Open a terminal and navigate to the server directory and install packages:
```bash
cd server
npm install
```
3. Open a terminal and navigate to the client directory and install packages:
```bash
cd client
npm install
```

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

