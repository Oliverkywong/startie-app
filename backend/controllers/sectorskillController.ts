import express from 'express'
import { SectorskillService } from '../services/sectorskillService'
import { logger } from '../utils/logger'

export class SectorskillController {
    constructor(
        private sectorskillService: SectorskillService
    ) { }

    allSectorskill = async (req: express.Request, res: express.Response) => {
        try {
            let user = req.user!.userId
            let sectorskill = await this.sectorskillService.getAllSectorSkill(user)

            return res.status(200).json({
                result: true,
                msg: 'success',
                detail: sectorskill
            })
        } catch (err) {
            logger.error(err)
            return res.status(500).json({ result: false, msg: 'error' })
        }
    }
}