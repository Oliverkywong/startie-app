import Knex from 'knex'
// import { checkPassword } from '../../utils/hash'
// import { UserDuplicateEmailError, UserDuplicateUsernameError, UserMissingRegisterInfoError, UserNotExistError, UserPasswordMissMatchError, UserService} from '../userService'
import { UserService} from '../userService'

const knexfile = require('../../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.

describe('', () => {
    let userService: UserService = new UserService(knex)
    it('can login', async () => {
        const userRecord = await userService.login('Oliver', 'admin')
        console.log(userRecord);
        
    }

)})

// describe('Integration test of userService', () => {
// 	let userService: UserService = new UserService(knex)

// 	beforeAll(async () => {
// 		return knex.migrate.rollback()
//     .then(function() {
//       return knex.migrate.latest();
//     })
//     .then(function() {
//       return knex.seed.run();
//     });
// });

// 	afterAll(async () => {
// 		return knex.migrate.rollback()
//     .then(function() {
//       return knex.migrate.latest();
//     })
//     .then(function() {
//       return knex.seed.run();
//     });
// });

// // -------------------------------------------------------------------------------------------------------------------
// 	it('can login', async () => {
// 		//Act
// 		const userRecord = await userService.login('Oliver', 'admin')

// 		//Assert
// 		expect(userRecord[0].username).toBe('Oliver')
// 		expect(await checkPassword('admin', userRecord[0].password)).toBe(true)
// 	})
// // -------------------------------------------------------------------------------------------------------------------
//     it('cannot login (UserNotExistError)', async () => {
// 		//Act
//         try{
//            await userService.login('Jason', 'admin')
// 		   fail('should throw UserNotExistError')
//         }
// 		//Assert
//         catch(err){
//             expect(err).toBeInstanceOf(UserNotExistError)
//         }
// 	})
// // -------------------------------------------------------------------------------------------------------------------
//     it('cannot login (UserPasswordMissMatchError)', async () => {
// 		//Act
//         try{
//             await userService.login('Oliver', 'admim')
// 			fail('should throw UserPasswordMissMatchError')
//         }
// 		//Assert
//         catch(err){
//             expect(err).toBeInstanceOf(UserPasswordMissMatchError)
//         }
// 	})
// // -------------------------------------------------------------------------------------------------------------------
// 	// it('cannot login (UserStatusError)', async () => {
// 	// 	//Act
//     //     try{
//     //         await userService.login("Inactive User", "inactiveuser")
// 	// 		fail('should throw UserStatusError')
//     //     }
// 	// 	//Assert
//     //     catch(err){
//     //         expect(err).toBeInstanceOf(UserStatusError)
//     //     }
// 	// })
// // -------------------------------------------------------------------------------------------------------------------
// 	it('can register', async () => {
// 		//Act
// 		const registerRecord = await userService.register(
// 			'Alex',
// 			'alex',
// 			'alex@gmail.com',
// 			1
// 		)

// 		//Assert
// 		expect(registerRecord).toBeTruthy()
// 	})
// // -------------------------------------------------------------------------------------------------------------------
// 	it('cannot register (UserDuplicateUsernameError)', async () => {
// 		//Act
// 		try {
// 			await userService.register(
// 				'Oliver',
// 				'whatever',
// 				'charlie@gmail.com',
// 				1
// 			)
// 			fail('should throw UserDuplicateUsernameError')
// 		} catch (err) {
// 			//Assert
// 			expect(err).toBeInstanceOf(UserDuplicateUsernameError)
// 		}
// 	})
// // -------------------------------------------------------------------------------------------------------------------
//     it('cannot register (UserDuplicateEmailError)', async () => {
// 		//Act
// 		try {
// 			await userService.register(
// 				'Jason',
// 				'whatever',
// 				'oliverwong@gmail.com',
// 				1
// 			)
// 			fail('should throw UserDuplicateEmailError')
// 		} catch (err) {
// 			//Assert
// 			expect(err).toBeInstanceOf(UserDuplicateEmailError)
// 		}
// 	})
// // -------------------------------------------------------------------------------------------------------------------
//     it('cannot register (User Missing username)', async () => {
// 		//Act
// 		try {
// 			await userService.register(
// 				'',
// 				'whatever',
// 				'ken@gmail.com',
// 				1
// 			)
// 			fail('should throw UserMissingRegisterInfoError')
// 		} catch (err) {
// 			//Assert
// 			expect(err).toBeInstanceOf(UserMissingRegisterInfoError)
// 		}
// 	})
// // -------------------------------------------------------------------------------------------------------------------
//     it('cannot register (User Missing password)', async () => {
// 		//Act
// 		try {
// 			await userService.register(
// 				'Jason',
// 				'',
// 				'jason@gmail.com',
// 				1
// 			)
// 			fail('should throw UserMissingRegisterInfoError')
// 		} catch (err) {
// 			//Assert
// 			expect(err).toBeInstanceOf(UserMissingRegisterInfoError)
// 		}
// 	})
// // -------------------------------------------------------------------------------------------------------------------
//     it('cannot register (User Missing email)', async () => {
// 		//Act
// 		try {
// 			await userService.register(
// 				'Jason',
// 				'jason',
// 				'',
// 				1
// 			)
// 			fail('should throw UserMissingRegisterInfoError')
// 		} catch (err) {
// 			//Assert
// 			expect(err).toBeInstanceOf(UserMissingRegisterInfoError)
// 		}
// 	})
// // -------------------------------------------------------------------------------------------------------------------
//         it('gets user information', async () => {
//             //Act
//             const userRecord = await userService.userInfo(1)
            
//             //Assert
//             expect(userRecord.id).toBe(1)
//             expect(userRecord.username).toBe('Oliver')
//             expect(userRecord.email).toBe('oliverwong@gmail.com')
//             expect(userRecord.phonenumber).toBe('95804970')
//             expect(userRecord.profilepic).toBe('oliver.jpg')
//             expect(userRecord.description).toBe('testing')

// })
// // -------------------------------------------------------------------------------------------------------------------
        // it('can edit user information', async () => {
        //     const phoneNumber = 95804971
        //     const description = 'I am Oliver Wong'
        //     const profilePic = 'oliverwong.jpg'

        //     //Act
        //     const userRecord = await userService.editUser(1, profilePic, phoneNumber, description)

        //     //Assert
        //     expect(userRecord.id).toBe(1)
        //     expect(userRecord.username).toBe('Oliver')
        //     expect(userRecord.email).toBe('oliverwong@gmail.com')
        //     expect(userRecord.phonenumber).toBe('95804971')
        //     expect(userRecord.profilepic).toBe('oliverwong.jpg')
        //     expect(userRecord.description).toBe('I am Oliver Wong')
        // })
// })
