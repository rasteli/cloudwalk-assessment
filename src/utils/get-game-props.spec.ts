import { it, expect, describe } from "vitest"
import { getGamePropsByLine } from "./get-game-props"

describe("Get game props by line", () => {
  it("should return the correct data from kill line", () => {
    const line = "21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT"
    const { totalKills, kills, killsByMeans, playerRanking } = getGamePropsByLine(line)

    expect(totalKills).toEqual(1)
    expect(kills).toEqual({ Isgalamido: -1 })
    expect(killsByMeans).toEqual({ MOD_TRIGGER_HURT: 1 })
    expect(playerRanking).toEqual({ Isgalamido: { deaths: 1 } })
  })

  it("should return the correct data from client line", () => {
    const line =
      "20:54 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel"
    const { players, playerRanking } = getGamePropsByLine(line)

    expect(players).toEqual(["Isgalamido"])
    expect(playerRanking).toEqual({ Isgalamido: { deaths: 0, kills: 0 } })
  })
})
