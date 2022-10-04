import fs from "node:fs"
import { CreateGames } from "./services/create-games"

async function processLineByLine(filePath: string) {
  const service = new CreateGames()
  const games = await service.execute(filePath)
  return games
}

;(async () => {
  const games = await processLineByLine("qgames.log")
  const gamesToJSON = JSON.stringify(games)

  console.log(games)
  fs.writeFileSync("games.json", gamesToJSON)
})()
