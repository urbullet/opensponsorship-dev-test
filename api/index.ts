require('dotenv').config()
import express from 'express';
import mongoose from "mongoose";
import routes from "./routes/routes";
import path from "path";

declare global {
    var appRoot: string;
}
global.appRoot = path.resolve(__dirname);

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
const PORT = process.env.PORT || 8080;
database.on('error', (error: any) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(express.json());
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server Started at ${8080}`)
})

