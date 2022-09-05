import Knex from "knex";
import { TeamService } from "../teamService";

describe("TeamService CRUD", () => {
  const knexfile = require("../../knexfile");
  const knex = Knex(knexfile["test"]);

  let teamService = new TeamService(knex);

  it("function getAllTeams test", async () => {
    const teams = await teamService.getAllTeams();
    expect(teams.length).toBeGreaterThanOrEqual(0);
  });

  it("function getTeam test", async () => {
    const team = await teamService.getTeam("test");
    expect(team.length).toBeGreaterThanOrEqual(0);
  });

  it("function createTeam test", async () => {
    const team = await teamService.createTeam("test", "test", "test");
    expect(team).toEqual({
      teamname: "test",
      description: "test",
      proilepic: "test",
    });
  });

  it("function updateTeam test", async () => {
    const team = await teamService.updateTeam("test2", "test2", "test2");
    expect(team).toEqual({
      teamname: "test2",
      description: "test2",
      proilepic: "test2",
    });
  });
});
