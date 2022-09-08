import { Knex } from 'knex'

export class SectorskillService {
	constructor(private knex: Knex) {}

    async getAllSectorSkill(userid: number) {
        try {
            let sector = await this.knex.raw(/*sql*/`SELECT name,sector_id,point FROM user_sector INNER JOIN sector ON sector.id = user_sector.sector_id WHERE user_id = ?`, [userid])
            let skill = await this.knex.raw(/*sql*/`SELECT name,skill_id,point FROM user_skill INNER JOIN skill ON skill.id = user_skill.skill_id WHERE user_id = ?`, [userid])
            return {sector:sector.rows, skill:skill.rows}
        } catch (err) {
            throw err
        }
    }
}