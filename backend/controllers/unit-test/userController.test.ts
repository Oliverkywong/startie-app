import { UserController } from "../userController";

describe('userController Test', () => {
    it('can login', async () => {
        //Arrange
        const userService = {
            login: jest.fn().mockReturnValue([{
                id: 1,
                username: 'Oliver'
            }])
        }

        const userController = new UserController(userService as any);

        const res = {
            json: jest.fn()
        }

        //Act
        await userController.login({
            body: {
                'username': 'Oliver',
                'password': 'oliver'
            }
        } as any, res as any);

        //Assert
        expect(userService.login).toHaveBeenCalled()
    //     expect(res.json).toHaveBeenCalledWith({
    //         result: true,
    //         msg: 'login success',
	// 		user: {
    //             id: 1,
    //             username: 'Oliver',
    //         },
    //         token:  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiT2xpdmVyIn0.rqBfw7_TQtK3MC475asrhkK7_xvGcQA4hKPGYS-oFi0'
    //     })
    })
})
