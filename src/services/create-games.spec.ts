import { it, expect, describe } from "vitest"

import { Game } from "../entities/game"
import { CreateGames } from "./create-games"
import { getArrayFromObjectValues } from "../utils/get-array-from-object-values"

describe("Create multiple games", () => {
  it("should be able to create every game from a valid log file", async () => {
    const sut = new CreateGames()
    const games = await sut.execute("qgames.log")
    const gamesArray = getArrayFromObjectValues(games)

    expect(gamesArray.length).toBeGreaterThan(0)

    gamesArray.forEach(game => {
      expect(game).toBeInstanceOf(Game)
    })
  })

  it("should not be able to create any games if log file is not found", () => {
    const sut = new CreateGames()

    expect(sut.execute("invalid.log")).rejects.toThrow()
  })
})
