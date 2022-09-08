// -------------------------------------------------------------------------------------------------------------------
// imports (DO NOT EXPORT ANYTHING FORM App.ts)
// -------------------------------------------------------------------------------------------------------------------
import express from "express";
import { logger } from "./utils/logger";
import grant from 'grant'
import { client } from './utils/db'
import dotenv from 'dotenv'
import { UserService } from './services/userService'
import { UserController } from './controllers/userController'
import { userRoutes } from './routes/userRoute'
import Knex from "knex"
import cors from 'cors'
import { sectorskillRoutes } from "./routes/sectorskillRoute";
import { SectorskillService } from './services/SectorSkillService'
import { SectorskillController } from './controllers/SectorSkillController'
// import { isLogin } from './utils/middleware'


// -------------------------------------------------------------------------------------------------------------------
// Knex
// -------------------------------------------------------------------------------------------------------------------

dotenv.config();
const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

// -------------------------------------------------------------------------------------------------------------------
// main script
// -------------------------------------------------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: [process.env.REACT_DOMAIN!],
  credentials: true
}))

//grant
const grantExpress = grant.express({
  defaults: {
    origin: "http://localhost:8000",
    transport: "session",
    state: true,
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID || "",
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    scope: ["profile", "email"],
    callback: "/login/google",
  },
});


app.use(grantExpress as express.RequestHandler)

// -------------------------------------------------------------------------------------------------------------------
// others
// -------------------------------------------------------------------------------------------------------------------

//connect to client
client.connect();

//urlencoded
app.use(express.urlencoded({ extended: true }));

//json
app.use(express.json());

const userService = new UserService(knex);
const userController = new UserController(userService)

const sectorskillService = new SectorskillService(knex);
const sectorskillController = new SectorskillController(sectorskillService)



app.use("/serverDefaultedImages", express.static("images"));
app.use("/userUploadedFiles", express.static("uploads"));

// get code from usersRoute
app.use(userRoutes(userController));
app.use(sectorskillRoutes(sectorskillController));

// --------------------------------------------------------------------------------------------------------------------
// Error 404
//---------------------------------------------------------------------------------------------------------------------

app.use((req, res) => {
  res.status(404);
  res.send("404 Not Found");
});

// --------------------------------------------------------------------------------------------------------------------
// listening
//---------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
