const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handling Uncaught Exception
process.on("uncaughtException",(error)=>{
    console.log(`Error : ${error.message}`);
    console.log(`Shutting down the server due to uncaughtException Error`);
    process.exit(1);
})

// Config
dotenv.config({ path: "./backend/config/config.env" });

// Connecting to databse;
connectDatabase();

const Server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// Unhandeled Promise Rejection
process.on("unhandledRejection", (error) => {
    console.log(`Error :${error.message}`);
    console.log(`Shutting down the server due to unhandeled promise rejection`);
    Server.close(()=>{
        process.exit(1);
    });
});