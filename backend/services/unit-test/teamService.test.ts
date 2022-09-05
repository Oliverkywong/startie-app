import Knex from "knex";
import { TeamService } from "../teamService";
import dotenv from "dotenv";
import { Team } from "../../utils/model";

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

  afterAll(async () => {
    await knex.destroy();
  });

  it("function getAllTeams test", async () => {
    const getAllTeams = await teamService.getAllTeams();
    expect(getAllTeams.length).toBeGreaterThan(0);
  });

  it("function createTeam test", async () => {
    const createTeam = await teamService.createTeam("test", "test", "test");
    expect(createTeam[0].name).toBe("test");
    expect(createTeam[0].description).toBe("test");
    expect(createTeam[0].profilepic).toBe("test");
  });

  it("function getTeam test", async () => {
    const getTeam = await teamService.getTeam("test");
    expect(getTeam[0].name).toBe("test");
  });

  it("function updateTeam test", async () => {
    const updateTeam = await teamService.updateTeam(
      5,
      undefined,
      "test2",
      "test2"
    );
    expect(updateTeam![0].name).toBe("test");
    expect(updateTeam![0].description).toBe("test2");
    expect(updateTeam![0].profilepic).toBe("test2");
  });

  it("function deleteTeam test", async () => {
    await teamService.deleteTeam(5);
    const deleteTeam = await knex<Team>("team")
      .select("id", "name")
      .where("id", 5)
      .returning("*");
    expect(deleteTeam.length).toBe(0);
  });
});
