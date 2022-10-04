import { it, expect, describe } from "vitest"
import { Game } from "./game"

describe("Create a single game", () => {
  it("should be able to create a game", () => {
    const totalKills = 2
    const players = ["Isgalamido", "Dono da Bola", "Zeh"]

    const kills = {
      Isgalamido: 0,
      "Dono da Bola": -1,
      Zeh: 0
    }

    const killsByMeans = {
      MOD_ROCKET_SPLASH: 1,
      MOD_TRIGGER_HURT: 1
    }

    const playerRanking = {
      Isgalamido: { kills: 0, deaths: 0 },
      "Dono da Bola": { kills: 0, deaths: 1 },
      Zeh: { kills: 1, deaths: 1 }
    }

    const game = new Game({ totalKills, playerRanking, kills, killsByMeans, players })

    expect(game).toBeInstanceOf(Game)
  })

  it("should not be able to create a game if total kills is not equal to the sum of kills by means or the sum of player deaths", () => {
    const totalKills = 5
    const players = ["Isgalamido", "Dono da Bola", "Zeh"]

    const kills = {
      Isgalamido: 0,
      "Dono da Bola": -1,
      Zeh: 0
    }

    const killsByMeans = {
      MOD_ROCKET_SPLASH: 1,
      MOD_TRIGGER_HURT: 3
    }

    const playerRanking = {
      Isgalamido: { kills: 0, deaths: 1 },
      "Dono da Bola": { kills: 0, deaths: 1 },
      Zeh: { kills: 1, deaths: 1 }
    }

    expect(() => {
      return new Game({ totalKills, playerRanking, kills, killsByMeans, players })
    }).toThrow()
  })

  it("should not be able to create a game with no players", () => {
    const totalKills = 2
    const players: string[] = []

    const kills = {
      Isgalamido: 0,
      "Dono da Bola": -1,
      Zeh: 0
    }

    const killsByMeans = {
      MOD_ROCKET_SPLASH: 1,
      MOD_TRIGGER_HURT: 1
    }

    const playerRanking = {
      Isgalamido: { kills: 0, deaths: 0 },
      "Dono da Bola": { kills: 0, deaths: 1 },
      Zeh: { kills: 1, deaths: 1 }
    }

    expect(() => {
      return new Game({ totalKills, playerRanking, kills, killsByMeans, players })
    }).toThrow()
  })
})
