import { it, expect } from "vitest"
import { Game } from "../entities/game"
import { CreateGamesController } from "./create-games-controller"
import { getArrayFromObjectValues } from "../utils/get-array-from-object-values"

it("should be receiving data from create games service", async () => {
  const sut = new CreateGamesController()
  const games = await sut.handle("qgames.log")
  const gamesArray = getArrayFromObjectValues(games)

  expect(gamesArray.length).toBeGreaterThan(0)

  gamesArray.forEach(game => {
    expect(game).toBeInstanceOf(Game)
  })
})
