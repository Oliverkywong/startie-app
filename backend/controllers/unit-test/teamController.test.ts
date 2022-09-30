import { TeamController } from "../teamController";
import { TeamService } from "../../services/teamService";
import { Knex } from "knex";
import type { Request, Response } from "express";

jest.mock("../../services/TeamService");

describe("TeamController test", () => {
  let controller: TeamController;
  let service: TeamService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new TeamService({} as Knex);
    controller = new TeamController(service);
    service.createTeam = jest.fn()
    req = {params: {},query: {},body: {},} as Request;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any as Response;

    service.createTeam = jest.fn()
    // service.createTeam = jest.fn(() =>
    //   Promise.resolve([
    //     {
    //       id: 1,
    //       name: "teamInfoName",
    //       description: "teamInfoDescription",
    //       shortDescription: "teamInfoshortDescription",
    //       profilepic: "newteamInfoProfilepic",
    //       status_id: 1,
    //       searchcategory_id: 1
    //     }
    //   ])
    // );

    service.getTeam = jest.fn()
    // service.getTeam = jest.fn(() =>
    //   Promise.resolve([
    //     {
    //       id: 1,
    //       name: "getTeamName",
    //       description: "getTeamDescription",
    //       profilepic: "getTeamProfilepic.jpg",
    //       clickrate: 0,
    //     },
    //   ])
    // );
    service.getAllTeams = jest.fn()
    // service.getAllTeams = jest.fn(() =>
    //   Promise.resolve([
    //     {
    //       id: 2,
    //       name: "getAllTeamsName",
    //       description: "getAllTeamsDescription",
    //       profilepic: "getAllTeamsProfilepic.jpg",
    //       clickrate: 0,
    //     },
    //     {
    //       id: 3,
    //       name: "getAllTeamsName2",
    //       description: "getAllTeamsDescription2",
    //       profilepic: "getAllTeamsProfilepic.jpg2",
    //       clickrate: 0,
    //     },
    //     {
    //       id: 4,
    //       name: "getAllTeamsName3",
    //       description: "getAllTeamsDescription3",
    //       profilepic: "getAllTeamsProfilepic.jpg3",
    //       clickrate: 0,
    //     },
    //   ])
    // );
    service.updateTeam = jest.fn()
    // service.updateTeam = jest.fn(() =>
    //   Promise.resolve([
    //     {
    //       id: 2,
    //       name: "newGetAllTeamsName",
    //       description: "newGetAllTeamsDescription",
    //       profilepic: "newGetAllTeamsProfilepic.jpg",
    //       clickrate: 0,
    //     },
    //   ])
    // );
  });

  it("function createTeam test", async () => {
    await controller.createTeam(req, res);
    // expect(service.createTeam).toBeCalled();
  //   expect(res.json).toBeCalledWith([
  //     {
  //       id: 0,
  //       name: "createTeamName",
  //       description: "crateTeamDescription",
  //       profilepic: "createTeamProfilepic.jpg",
  //       clickrate: 0,
  //     },
  //   ]);
  });

  it("function getTeam test", async () => {
    await controller.getTeam(req, res);
    expect(service.getTeam).toBeCalled();
  //   expect(res.json).toBeCalledWith([
  //     {
  //       id: 1,
  //       name: "getTeamName",
  //       description: "getTeamDescription",
  //       profilepic: "getTeamProfilepic.jpg",
  //       clickrate: 0,
  //     },
  //   ]);
  });

  it("function getAllTeams test", async () => {
    await controller.getAllTeams(req, res);
    expect(service.getAllTeams).toBeCalled();
  //   expect(res.json).toBeCalledWith([
  //     {
  //       id: 2,
  //       name: "getAllTeamsName",
  //       description: "getAllTeamsDescription",
  //       profilepic: "getAllTeamsProfilepic.jpg",
  //       clickrate: 0,
  //     },
  //     {
  //       id: 3,
  //       name: "getAllTeamsName2",
  //       description: "getAllTeamsDescription2",
  //       profilepic: "getAllTeamsProfilepic.jpg2",
  //       clickrate: 0,
  //     },
  //     {
  //       id: 4,
  //       name: "getAllTeamsName3",
  //       description: "getAllTeamsDescription3",
  //       profilepic: "getAllTeamsProfilepic.jpg3",
  //       clickrate: 0,
  //     },
  //   ]);
  });

  it("function updateTeam test", async () => {
    await controller.updateTeamForAdmin(req,res);
    expect(service.updateTeam).toBeCalled();
  //   expect(res.json).toBeCalledWith([
  //     {
  //       id: 2,
  //       name: "newGetAllTeamsName",
  //       description: "newGetAllTeamsDescription",
  //       profilepic: "newGetAllTeamsProfilepic.jpg",
  //       clickrate: 0,
  //     },
  //   ]);
  });
});
