import { it, expect, describe } from "vitest"
import { getGamePropsByLine, clearGameProps } from "./get-game-props"

describe("Get game props by line", () => {
  it("should return the correct data from a kill line", () => {
    clearGameProps()

    const line = "21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT"
    const { totalKills, kills, killsByMeans, playerRanking } = getGamePropsByLine(line)

    expect(totalKills).toEqual(1)
    expect(kills).toEqual({ Isgalamido: -1 })
    expect(killsByMeans).toEqual({ MOD_TRIGGER_HURT: 1 })
    expect(playerRanking).toEqual({ Isgalamido: { deaths: 1 } })
  })

  it("should return the correct data from a client line", () => {
    clearGameProps()

    const line =
      "20:54 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel"
    const { players, playerRanking, kills } = getGamePropsByLine(line)

    expect(players).toEqual(["Isgalamido"])
    expect(kills).toEqual({ Isgalamido: 0 })
    expect(playerRanking).toEqual({ Isgalamido: { kills: 0, deaths: 0 } })
  })

  it("should return the correct data from multiple kill and client lines", () => {
    clearGameProps()

    const lines = [
      "20:54 ClientUserinfoChanged: 2 n\\Dono da bola\\t\\0\\model\\uriel/zael\\hmodel\\uriel",
      "20:54 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel",
      "20:54 ClientUserinfoChanged: 2 n\\Mocinha\\t\\0\\model\\uriel/zael\\hmodel\\uriel",
      "20:54 ClientUserinfoChanged: 2 n\\Zeh\\t\\0\\model\\uriel/zael\\hmodel\\uriel",
      "21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT",
      "21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT",
      "21:07 Kill: 1022 2 22: Zeh killed Isgalamido by MOD_ROCKET_SPLASH",
      "21:07 Kill: 1022 2 22: Mocinha killed Dono da bola by MOD_SHOTGUN",
      "21:07 Kill: 1022 2 22: <world> killed Mocinha by MOD_FALLING"
    ]

    const { totalKills, kills, killsByMeans, playerRanking, players } = lines.reduce(
      (acc, line) => getGamePropsByLine(line),
      {
        totalKills: 0,
        kills: {},
        killsByMeans: {},
        playerRanking: {},
        players: [] as string[]
      }
    )

    expect(totalKills).toEqual(5)
    expect(players).toEqual(["Dono da bola", "Isgalamido", "Mocinha", "Zeh"])
    expect(kills).toEqual({ Isgalamido: -2, Zeh: 1, Mocinha: 0, "Dono da bola": 0 })
    expect(killsByMeans).toEqual({
      MOD_TRIGGER_HURT: 2,
      MOD_ROCKET_SPLASH: 1,
      MOD_SHOTGUN: 1,
      MOD_FALLING: 1
    })
    expect(playerRanking).toEqual({
      Isgalamido: { kills: 0, deaths: 3 },
      Zeh: { kills: 1, deaths: 0 },
      Mocinha: { kills: 1, deaths: 1 },
      "Dono da bola": { kills: 0, deaths: 1 }
    })
  })
})
