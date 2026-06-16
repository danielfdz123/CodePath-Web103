import { pool } from './database.js'
import './dotenv.js'
import soccerPlayers from '../data/players.js'

const createPlayersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS players;

        -- Info gathered from "players.js" in order
        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            position VARCHAR(255) NOT NULL,
            team TEXT[] NOT NULL,
            image VARCHAR(255) NOT NULL,
            calledUpForWorldCup BOOLEAN NOT NULL,
            age INTEGER NOT NULL,
            description TEXT NOT NULL
        )
    `

    try 
    {
        const res = await pool.query(createTableQuery)
        console.log('🎉 gifts table created successfully')
    }
    catch(err)
    {
        console.error('⚠️ error creating gifts table', err)
    }
}

const addToTable = async () => {
    await createPlayersTable()

    soccerPlayers.forEach((player) => {
        const insertQuery = {
            text: 'INSERT INTO players (name, position, team, image, calledUpForWorldCup, age, description) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

    const values = [
        player.name,
        player.position,
        player.team,
        player.image,
        player.calledUpForWorldCup,
        player.age,
        player.description
    ]

    pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ Error inserting player', err)
                return
            }

            console.log(`✅ ${player.name} added successfully`)
        })
    })
}

addToTable()