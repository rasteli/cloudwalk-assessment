import { PlayerRanking } from "../entities/game"

type Prop = "kills" | "deaths"

export function increasePlayerKillsOrDeathsByOne(
  playerRanking: PlayerRanking,
  player: string,
  prop: Prop
) {
  const playerInRanking = playerRanking[player]

  // If player is in the ranking and there is prop, increments it by 1
  // else starts it with value 1

  return {
    ...playerInRanking,
    [prop]: playerInRanking && playerInRanking[prop] ? playerInRanking[prop] + 1 : 1
  }
}
