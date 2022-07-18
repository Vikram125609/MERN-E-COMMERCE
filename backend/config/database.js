const { ViewModuleSharp } = require("@material-ui/icons");
const mongoose = require("mongoose");
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
        .then((data) => {
            console.log(`Mongodb connected with server ${data.connection.port}`);
        })
        .catch((error) => {
            console.log(error);
        })
}
module.exports = connectDatabase;