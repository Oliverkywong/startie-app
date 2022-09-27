import Knex from "knex";
import { TeamService } from "../teamService";
import dotenv from "dotenv";
import { TeamListInput } from "../../utils/api-types";

dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("TeamService CRUD", () => {
  let teamService = new TeamService(knex);

  const teamInfo = {
    id: 1,
    name: "teamName",
    searchcategory_id: 1,
    shortDescription: "teamShortDescription",
    description: "teamDescription",
    profilepic: "teamProfilepic",
    status_id: 1,
  };

  const newTeamInfo = {
    name: "newTeamName",
    description: "newTeamDescription",
    profilepic: "newTeamProfilepic",
  };

  const input: TeamListInput = {
    name: "teamName",
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

  // it("function getAllTeams by name test", async () => {
  //   let _order : TeamListInput = "wd123";
  //   const getAllTeams = await teamService.getAllTeams(_order ,false);
  //   expect(getAllTeams.length).toBeGreaterThan(0);
  // });

  it("function createTeam test", async () => {
    const createTeam = await teamService.createTeam(
      teamInfo.id,
      teamInfo.name,
      teamInfo.searchcategory_id,
      teamInfo.shortDescription,
      teamInfo.description,
      teamInfo.profilepic,
      1
    );
    expect(createTeam[0].name).toBe(teamInfo.name);
    expect(createTeam[0].description).toBe(teamInfo.description);
    expect(createTeam[0].profilepic).toBe(teamInfo.profilepic);
    expect(createTeam[0].searchcategory_id).toBe(teamInfo.searchcategory_id);
    expect(createTeam[0].shortDescription).toBe(teamInfo.shortDescription);
    expect(createTeam[0].status_id).toBe(teamInfo.status_id);
  });

  it("function getTeam test", async () => {
    const getTeam = await teamService.getTeam(teamInfo.id);
    expect(getTeam[0].name).toBe(teamInfo.name);
  });

  //   it("function updateTeam test", async () => {
  //     const getTeam = await teamService.getTeam(teamInfo.id);
  //     expect(getTeam[0].name).toBe(teamInfo.name);

  //     const updateTeam = await teamService.updateTeam(getTeam[0].id, input.name);
  //     expect(updateTeam![0].name).toBe(newTeamInfo.name);
  //   });
});
