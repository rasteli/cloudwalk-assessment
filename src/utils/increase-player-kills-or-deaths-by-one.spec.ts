import { it, expect, describe } from "vitest"
import { PlayerRanking } from "../entities/game"
import { increasePlayerKillsOrDeathsByOne } from "./increase-player-kills-or-deaths-by-one"

describe("Update player's rank", () => {
  it("should update the player's rank by their death and kill counts", () => {
    const player = "player1"
    const playerRanking: PlayerRanking = {
      player1: {
        kills: 1,
        deaths: 2
      }
    }

    playerRanking[player] = increasePlayerKillsOrDeathsByOne(playerRanking, player, "kills")
    playerRanking[player] = increasePlayerKillsOrDeathsByOne(playerRanking, player, "deaths")

    expect(playerRanking[player].kills).toEqual(2)
    expect(playerRanking[player].deaths).toEqual(3)
  })

  it("should add the player to the ranking if they don't exist", () => {
    const player = "player1"
    const playerRanking: PlayerRanking = {}

    playerRanking[player] = increasePlayerKillsOrDeathsByOne(playerRanking, player, "kills")

    expect(playerRanking[player].kills).toEqual(1)
  })
})
