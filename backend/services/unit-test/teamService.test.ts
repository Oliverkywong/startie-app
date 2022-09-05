import Knex from "knex";
import { TeamService } from "../teamService";
import dotenv from "dotenv";

dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("TeamService CRUD", () => {
  let teamService = new TeamService(knex);

  beforeAll(async () => {
    return knex.migrate
      .rollback()
      .then(function () {
        return knex.migrate.latest();
      })
      .then(function () {
        return knex.seed.run();
      });
  });

  it("function getAllTeams test", async () => {
    const teams = await teamService.getAllTeams();
    expect(teams.length).toBeGreaterThan(0);
  });

  it("function createTeam test", async () => {
    const team = await teamService.createTeam("test", "test", "test");
    expect(team[0].name).toBe("test");
    expect(team[0].description).toBe("test");
    expect(team[0].profilepic).toBe("test");
  });

  it("function getTeam test", async () => {
    const team = await teamService.getTeam("test");
    expect(team[0].name).toBe("test");
  });

  it("function updateTeam test", async () => {
    const team = await teamService.updateTeam(5, "test2", "test2", "test2");
    expect(team![0].name).toBe("test2");
    expect(team![0].description).toBe("test2");
    expect(team![0].profilepic).toBe("test2");
  });
});
