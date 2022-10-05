import fs from "node:fs"
import util from "node:util"
import { CreateGames } from "./services/create-games"

async function processLineByLine(filePath: string) {
  const service = new CreateGames()
  const games = await service.execute(filePath)
  return games
}

;(async () => {
  const games = await processLineByLine("qgames.log")
  const gamesToJSON = JSON.stringify(games)

  console.log(util.inspect(games, false, null, true))
  fs.writeFileSync("games.json", gamesToJSON)
})()
