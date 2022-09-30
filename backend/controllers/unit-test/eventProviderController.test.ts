import { Knex } from "knex";
import type { Request, Response } from "express";
import { EventProviderService } from "../../services/eventProviderService";
import { EventProviderController } from "../eventProviderController";

jest.mock("../../services/eventProviderService")

describe("EventProviderController test", () => {
    let controller: EventProviderController;
    let service: EventProviderService;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        service = new EventProviderService({} as Knex);
        req = { params: {}, query: {}, body: {} } as Request;
        res = { status: jest.fn(() => res), json: jest.fn() } as any as Response;
        controller = new EventProviderController(service);

        service.createEventProvider = jest.fn(() =>
            Promise.resolve([{
                id: 1,
                name: "eventProvider",
                profile_pic: "eventProviderProfilepic"
            }
            ])
        )
        service.getAllEventProvidersForAdmin = jest.fn()
        service.getEventProvider = jest.fn(() =>
            Promise.resolve([{
                id: 1,
                name: "eventProvider",
                profile_pic: "eventProviderProfilepic"
            }
            ]))
        service.updateEventProvidersForAdmin = jest.fn(() =>
            Promise.resolve([{
                id: 1,
                name: "eventProvider",
                profile_pic: "eventProviderProfilepic"
            }]))
    })

    it("createEventProvider positive", async () => {
        await controller.createEventProvider(req, res);
        expect(service.createEventProvider).toBeCalled();
        expect(res.json).toBeCalledWith([{
            id: 1,
            name: "eventProvider",
            profile_pic: "eventProviderProfilepic"
        }]);
        expect(res.json).toBeCalledTimes(1);
    });

    it("getEventProvider positive", async () => {
        await controller.getEventProvider(req, res);
        expect(service.getEventProvider).toBeCalled();
        expect(res.json).toBeCalledWith({
            id: 1,
            name: "eventProvider",
            profile_pic: "eventProviderProfilepic"
        });
        expect(res.json).toBeCalledTimes(1);
    });

    it("updateEventProvidersForAdmin positive", async () => {
        await controller.updateEventProvidersForAdmin(req, res);
        expect(service.updateEventProvidersForAdmin).toBeCalled();
        // expect(res.json["data"]).toBeCalledWith({
        //     id: 1,
        //     name: "eventProvider",
        //     profile_pic: "eventProviderProfilepic"
        // });
        // expect(res.json["data"]).toBeCalledTimes(1);
    });
})