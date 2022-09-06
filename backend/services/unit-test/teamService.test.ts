import Knex from "knex";
import { TeamService } from "../teamService";
import dotenv from "dotenv";
import { Team } from "../../utils/model";

dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("TeamService CRUD", () => {
  let teamService = new TeamService(knex);

  const teamInfo = {
    name: "teamName",
    description: "teamDescription",
    profilepic: "teamProfilepic",
  };

  const newTeamInfo = {
    name: "newTeamName",
    description: "newTeamDescription",
    profilepic: "newTeamProfilepic",
  };

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
    const createTeam = await teamService.createTeam(
      teamInfo.name,
      teamInfo.description,
      teamInfo.profilepic
    );
    expect(createTeam[0].name).toBe(teamInfo.name);
    expect(createTeam[0].description).toBe(teamInfo.description);
    expect(createTeam[0].profilepic).toBe(teamInfo.profilepic);
  });

  it("function getTeam, updateTeam and deleteTeam test", async () => {
    const getTeam = await teamService.getTeam(teamInfo.name);
    expect(getTeam.length).toBeGreaterThan(0);
    expect(getTeam[0].name).toBe(teamInfo.name);

    const updateTeam = await teamService.updateTeam(
      getTeam[0].id,
      newTeamInfo.name,
      newTeamInfo.description,
      newTeamInfo.profilepic
    );
    expect(updateTeam![0].name).toBe(newTeamInfo.name);
    expect(updateTeam![0].description).toBe(newTeamInfo.description);
    expect(updateTeam![0].profilepic).toBe(newTeamInfo.profilepic);

    await teamService.deleteTeam(getTeam[0].id);
    const deleteTeam = await knex<Team>("team")
      .select("id", "name")
      .where("id", getTeam[0].id)
      .returning("*");
    expect(deleteTeam.length).toBe(0);
  });
});
