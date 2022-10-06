import { it, expect } from "vitest"
import { Game } from "../entities/game"
import { CreateGamesController } from "./create-games-controller"
import { getArrayFromObjectValues } from "../utils/get-array-from-object-values"

it("should be receiving data from create games service", async () => {
  const sut = new CreateGamesController()
  const games = await sut.handle("qgames.log")
  const gamesArray = getArrayFromObjectValues(games)

  // 21 is the number of lines initializing a new game in qgames.log
  expect(gamesArray.length).toEqual(21)

  gamesArray.forEach(game => {
    expect(game).toBeInstanceOf(Game)
  })
})
