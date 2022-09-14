// -------------------------------------------------------------------------------------------------------------------
// imports (DO NOT EXPORT ANYTHING FORM App.ts)
// -------------------------------------------------------------------------------------------------------------------
import express from "express";
import { logger } from "./utils/logger";
import grant from "grant";
import { client } from "./utils/db";
import dotenv from "dotenv";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { userRoutes } from "./routes/userRoute";
import Knex from "knex";
import cors from "cors";
import { sectorskillRoutes } from "./routes/sectorskillRoute";
import { SectorskillService } from "./services/sectorskillService";
import { SectorskillController } from "./controllers/sectorskillController";
import { TeamService } from "./services/teamService";
import { JobService } from "./services/jobService";
import { TeamController } from "./controllers/teamController";
import { JobController } from "./controllers/jobController";
import { EventService } from "./services/eventService";
import { EventController } from "./controllers/eventController";
import { teamRoutes } from "./routes/teamRoute";
import { eventRoutes } from "./routes/eventRoute";
import { jobRoutes } from "./routes/jobRoute";
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

// const allowedOrigins = [
//   'capacitor://localhost',
//   'ionic://localhost',
//   'http://localhost',
//   'http://localhost:8080',
//   'http://localhost:8100',
//   'http://localhost:8000',
//   'http://localhost:3000',
// ];

app.use(
  cors({
    origin: [process.env.REACT_DOMAIN!,'capacitor://localhost'],
    credentials: true,
    exposedHeaders: ["x-total-count", "content-length","server" ], //for react-admin
   
  })
);

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

app.use(grantExpress as express.RequestHandler);

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
const userController = new UserController(userService);

const teamService = new TeamService(knex);
const teamController = new TeamController(teamService);

const jobService = new JobService(knex);
const jobController = new JobController(jobService);

const eventService = new EventService(knex);
const eventController = new EventController(eventService);

const sectorskillService = new SectorskillService(knex);
const sectorskillController = new SectorskillController(sectorskillService);

app.use("/serverDefaultedImages", express.static("images"));
app.use("/userUploadedFiles", express.static("uploads"));

// get code from usersRoute
app.use(userRoutes(userController));
app.use(teamRoutes(teamController));
app.use(jobRoutes(jobController));
app.use(eventRoutes(eventController));
app.use(sectorskillRoutes(sectorskillController));
app.use(teamRoutes(teamController));

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

