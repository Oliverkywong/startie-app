import { Knex } from "knex";
import type { Request, Response } from "express";
import { SectorskillService } from "../../services/sectorskillService";
import { SectorskillController } from "../sectorskillController";

jest.mock("../../services/sectorskillService")

describe("SectorskillController test", () => {
    let controller: SectorskillController;
    let service: SectorskillService;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        service = new SectorskillService({} as Knex);
        req = { params: {}, query: {}, body: {} } as Request;
        res = { status: jest.fn(() => res), json: jest.fn() } as any as Response;
        controller = new SectorskillController(service);
    })

    it("get allSectorskill positive", async () =>{
        await controller.allSectorskill(req,res)
        expect(service.getAllSectorSkill).toBeCalled();
    })

    it("get allSectorskill negative", async () =>{
        await controller.allSectorskill(req,res)
        expect(res.json["detail"]).toBeUndefined()
    })
})