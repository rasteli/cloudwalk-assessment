import { PlayerRanking } from "../entities/game"

type Prop = "kills" | "deaths"

export function updatePlayerRank(playerRanking: PlayerRanking, player: string, prop: Prop) {
  const playerInRanking = playerRanking[player]

  return {
    ...playerInRanking,
    [prop]: playerInRanking ? (playerInRanking[prop] ? playerInRanking[prop] + 1 : 1) : 1
  }
}
