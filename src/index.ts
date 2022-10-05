import fs from "node:fs"
import util from "node:util"

import { CreateGamesController } from "./controllers/create-games-controller"
;(async () => {
  const games = await new CreateGamesController().handle("qgames.log")
  const gamesToJSON = JSON.stringify(games, null, 2)

  console.log(util.inspect(games, false, null, true))
  fs.writeFileSync("games.json", gamesToJSON)
})()
