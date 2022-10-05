import { it, expect } from "vitest"
import { Game } from "../entities/game"
import { CreateGamesController } from "./create-games-controller"

it("should be receiving data from create games service", async () => {
  const sut = new CreateGamesController()
  const games = await sut.handle("qgames.log")

  Object.entries(games).forEach(([, game]) => {
    expect(game).toBeInstanceOf(Game)
  })
})
