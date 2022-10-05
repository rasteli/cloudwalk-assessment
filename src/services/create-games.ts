import fs from "node:fs"
import readline from "node:readline"

import { Game } from "../entities/game"
import { getGamePropsByLine, clearGameProps } from "../utils/get-game-props"
import { getArrayFromObjectValues } from "../utils/get-array-from-object-values"

interface CreateGamesResponse {
  [key: string]: Game
}

export class CreateGames {
  execute(filePath: string): Promise<CreateGamesResponse> {
    return new Promise(resolve => {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at ${filePath}`)
      }

      let gameProps = clearGameProps()

      const games: CreateGamesResponse = {}
      const fileStream = fs.createReadStream(filePath)

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })
      // Note: we use the crlfDelay option to recognize all instances of CR LF
      // ('\r\n') in filePath as a single line break

      // Each line in filePath will be successively available here as "line"
      rl.on("line", line => {
        // Lines including "InitGame" are delimiters for a new game,
        // so if a line doesn't include "InitGame", it means it's between the ones that do
        // (except for the outer not important ones)
        if (!line.includes("InitGame")) {
          // Collects data from lines between other lines including "InitGame"
          gameProps = getGamePropsByLine(line)
        } else if (gameProps.players.length > 0) {
          // If line inlcudes "InitGame", it means we have reached a new game
          // and we can create a new Game instance with the data collected from the previous game.
          // We also need to check if the gameProps.players array is not empty, because if it is,
          // there's no game to be created.
          const game = new Game(gameProps)

          const gamesLength = getArrayFromObjectValues(games).length
          const gameKey = "game_" + (gamesLength + 1)

          games[gameKey] = game
          // Resets data so they don't get added to the next game
          gameProps = clearGameProps()
        }
      })

      rl.on("close", () => {
        resolve(games)
      })
    })
  }
}
