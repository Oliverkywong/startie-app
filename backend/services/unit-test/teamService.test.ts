import Knex from "knex";
import { TeamService } from "../teamService";
import dotenv from "dotenv";
import { TeamListInput } from "../../utils/api-types";
import { Team } from "../../utils/model";
import { DuplicatenameError } from "../eventService";

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

  const teamInfo: Team = {
    id: 1,
    name: "teamInfoName",
    description: "teamInfoDescription",
    shortDescription: "teamInfoshortDescription",
    profilepic: "newteamInfoProfilepic",
    status_id: 1,
    clickrate: 0,
    searchcategory_id: 1
  };

  const newTeamInfo: Team = {
    id: 1,
    name: "newteamInfoName",
    description: "newteamInfoDescription",
    shortDescription: "newteamInfoshortDescription",
    profilepic: "newteamInfoProfilepic",
    status_id: 1,
    clickrate: 0,
    searchcategory_id: 1
  };

  const teamListInput: TeamListInput = {
    name: "newteamInfoName",
    q: "string",
    _order: "asc",
    _sort: "id",
    _start: 1,
    _end: 1,
    profile_pic: "newteamInfoProfilepic",
    category_id: 1,
    description: "newteamInfoDescription",
    shortDescription: "newteamInfoshortDescription",
    status_id: 1,
    users: 1
  };


  it("function createTeam positive test", async () => {
    const createTeam = await teamService.createTeam(
      teamInfo.id,
      teamInfo.name,
      teamInfo.searchcategory_id,
      teamInfo.shortDescription,
      teamInfo.searchcategory_id,
      teamInfo.description,
      teamInfo.profilepic,
    );
    expect(createTeam.teamInfo[0].name).toBe(teamInfo.name);
    expect(createTeam.teamInfo[0].description).toBe(teamInfo.description);
    expect(createTeam.teamInfo[0].profilepic).toBe(teamInfo.profilepic);
    expect(createTeam.teamInfo[0].searchcategory_id).toBe(teamInfo.searchcategory_id);
    expect(createTeam.teamInfo[0].shortDescription).toBe(teamInfo.shortDescription);
    expect(createTeam.teamInfo[0].status_id).toBe(teamInfo.status_id);
  });

  it("function getAllTeams positive test", async () => {
    const show = true
    const getAllTeams = await teamService.getAllTeams(show);
    expect(getAllTeams.count).toBeGreaterThan(0);
  });

  it("function getTeam positive test", async () => {
    const getTeam = await teamService.getTeam(teamInfo.id);
    expect(getTeam.team[0].id).toBe(teamInfo.id);
  });

  it("function updateTeam positive test", async () => {
    const getTeam = await teamService.getTeam(teamInfo.id);
    expect(getTeam.team[0].id).toBe(teamInfo.id);

    const updateTeam = await teamService.updateTeam(getTeam.team[0].id, teamListInput);
    expect(updateTeam[0].name).toBe(newTeamInfo.name);
    expect(updateTeam[0].description).toBe(newTeamInfo.description);
    expect(updateTeam[0].profilepic).toBe(newTeamInfo.profilepic);
  });

  it("function createEvent negative test", async () => {
    try {
      await teamService.createTeam(
        teamInfo.id,
        teamInfo.name,
        teamInfo.searchcategory_id,
        teamInfo.shortDescription,
        teamInfo.searchcategory_id,
        teamInfo.description,
        teamInfo.profilepic,
      );
    } catch (err) {
      expect(err).toBeInstanceOf(DuplicatenameError);
    }
  });

  it("function getAllEvents negative test", async () => {
    const show = false
    const input = { q: 'zzzzz' }
    const getAllEvents = await teamService.getAllTeams(show, input);
    expect(getAllEvents.count).toBe(0);
  });

  it("function getEvent negative test", async () => {
    const getTeam = await teamService.getTeam(200);
    expect(getTeam.team[0]).toBeUndefined();
  });

  it("function updateEvent negative test", async () => {
    const getTeam = await teamService.getTeam(0);
    expect(getTeam.team[0]).toBeUndefined();

    const updateTeam = await teamService.updateTeam(
      200,
      teamListInput);
    expect(updateTeam[0]).toBeUndefined();
  });
});