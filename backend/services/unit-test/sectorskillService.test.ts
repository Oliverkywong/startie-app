import Knex from "knex";
import dotenv from "dotenv";
import { SectorskillService } from "../sectorskillService";
dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

const sectorskillService = new SectorskillService(knex)
const userid = 1

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

describe("SectorskillService positive", () => {
    it("function get SectorskillService test", async () => {
        let sectorskill = await sectorskillService.getAllSectorSkill(userid)
        expect(sectorskill.sector.length).toBeGreaterThan(0);
        expect(sectorskill.skill.length).toBeGreaterThan(0);
    })
})

describe("SectorskillService negative", () => {
    it("function get SectorskillService test", async () => {
        let sectorskill = await sectorskillService.getAllSectorSkill(200)
        expect(sectorskill.sector.length).toBe(0);
        expect(sectorskill.skill.length).toBe(0);
    })
})