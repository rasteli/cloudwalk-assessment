import { PlayerRanking } from "../entities/game"

type Prop = "kills" | "deaths"

export function createPlayerRank() {
  return {
    kills: 0,
    deaths: 0
  }
}

export function updatePlayerRank(playerRanking: PlayerRanking, player: string, prop: Prop) {
  return {
    ...playerRanking[player],
    [prop]: playerRanking[player][prop] + 1
  }
}
