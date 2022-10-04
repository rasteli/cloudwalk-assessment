import fs from "node:fs"
import readline from "node:readline"

import { Game, PlayerRanking, Kills } from "../entities/game"
import { createPlayerRank, updatePlayerRank } from "../utils/rank-player"

export class CreateGames {
  execute(filePath: string): Promise<Game[]> {
    return new Promise(resolve => {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at ${filePath}`)
      }

      let totalKills = 0
      let kills: Kills = {}
      let players: string[] = []
      let killsByMeans: Kills = {}
      let playerRanking: PlayerRanking = {}

      const games: Game[] = []
      const fileStream = fs.createReadStream(filePath)

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })
      // Note: we use the crlfDelay option to recognize all instances of CR LF
      // ('\r\n') in filePath as a single line break.

      // Each line in filePath will be successively available here as "line".
      rl.on("line", line => {
        // If line does not include "InitGame", it means we have to start a new game creation process
        if (!line.includes("InitGame")) {
          if (line.includes("Kill")) {
            // Example of kill line -> 21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
            totalKills++

            const info = line.split(":")[3] // -> " <world> killed Isgalamido by MOD_TRIGGER_HURT"
            const actors = info.split("killed") // -> [" <world> ", " Isgalamido by MOD_TRIGGER_HURT"]

            const killer = actors[0].trim() // -> "<world>"
            const killed = actors[1].split("by")[0].trim() // -> "Isgalamido"
            const means = actors[1].split("by")[1].trim() // -> "MOD_TRIGGER_HURT"

            // If means is not in the killsByMeans object, add it with value 1
            // else increment its value by 1
            killsByMeans[means] = killsByMeans[means] ? killsByMeans[means] + 1 : 1

            // If the world killed the player or the player killed themselves, they lose a kill
            if (killer === "<world>" || killer === killed) {
              // If player killed is not in the kills object, add it with value -1
              // else decrement its value by 1
              kills[killed] = kills[killed] ? kills[killed] - 1 : -1
            } else {
              // If killer is not in the kills object, add it with value 1
              // else increment its value by 1
              kills[killer] = kills[killer] ? kills[killer] + 1 : 1
              // Update player's ranking by their kill count
              playerRanking[killer] = updatePlayerRank(playerRanking, killer, "kills")
            }
            // Update player's ranking by their death count
            playerRanking[killed] = updatePlayerRank(playerRanking, killed, "deaths")
          }

          if (line.includes("ClientUserinfoChanged")) {
            // Example of client line -> 20:54 ClientUserinfoChanged: 2 n\Isgalamido\t\0\model\uriel/zael\hmodel\uriel
            const player = line.split("\\")[1] // -> "Isgalamido"

            if (!players.includes(player)) {
              players.push(player)
              playerRanking[player] = createPlayerRank()
            }
          }
          // If it does inlcude "InitGame", a new game is properly created with the
          // data parsed from the process above
        } else if (players.length > 0) {
          const game = new Game({ totalKills, players, kills, killsByMeans, playerRanking })
          games.push(game)

          // Reset data so they don't get added to the next game
          kills = {}
          players = []
          totalKills = 0
          killsByMeans = {}
          playerRanking = {}
        }
      })

      rl.on("close", () => {
        resolve(games)
      })
    })
  }
}
