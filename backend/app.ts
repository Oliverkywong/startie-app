// -------------------------------------------------------------------------------------------------------------------
// imports (DO NOT EXPORT ANYTHING FORM App.ts)
// -------------------------------------------------------------------------------------------------------------------
import express from "express";
import { logger } from "./utils/logger";
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
import { EventProviderService } from "./services/eventProviderService";
import { eventProviderRoutes } from "./routes/eventProviderRoute";
import { EventProviderController } from "./controllers/eventProviderController";

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

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        username: string;
        isadmin?: boolean;
      };
    }
  }
}

app.use(
  cors({
    origin: [process.env.REACT_DOMAIN!,'capacitor://localhost', 'http://localhost:3001','https://admin.startie.oliverstrat.me'],
    credentials: true,
    exposedHeaders: ["x-total-count", "content-length","server" ], //for react-admin
   
  })
);

// -------------------------------------------------------------------------------------------------------------------
// others
// -------------------------------------------------------------------------------------------------------------------

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

const eventProviderService = new EventProviderService(knex);
const eventProviderController = new EventProviderController(eventProviderService);

const sectorskillService = new SectorskillService(knex);
const sectorskillController = new SectorskillController(sectorskillService);

app.use("/serverDefaultedImages", express.static("images"));
app.use("/userUploadedFiles", express.static("uploads"));

// get code from usersRoute
app.use(userRoutes(userController));
app.use(teamRoutes(teamController));
app.use(jobRoutes(jobController));
app.use(eventRoutes(eventController));
app.use(eventProviderRoutes(eventProviderController));
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

