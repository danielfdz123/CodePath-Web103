import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import soccerPlayers from '../data/players.js'
import PlayerController from '../controllers/players.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', PlayerController.getPlayers)

router.get('/:id', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/public/player.html'))
})

export default router