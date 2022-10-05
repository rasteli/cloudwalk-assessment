import { PlayerRanking, Kills } from "../entities/game"
import { createPlayerRank, updatePlayerRank } from "./rank-player"

let totalKills = 0
let kills: Kills = {}
let players: string[] = []
let killsByMeans: Kills = {}
let playerRanking: PlayerRanking = {}

export function clearGameProps() {
  kills = {}
  players = []
  totalKills = 0
  killsByMeans = {}
  playerRanking = {}

  return {
    kills,
    players,
    totalKills,
    killsByMeans,
    playerRanking
  }
}

export function getGamePropsByLine(line: string) {
  if (line.includes("Kill")) {
    // Example of kill line -> 21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
    totalKills++

    const info = line.split(":")[3] // -> " <world> killed Isgalamido by MOD_TRIGGER_HURT"
    const actors = info.split("killed") // -> [" <world> ", " Isgalamido by MOD_TRIGGER_HURT"]

    const killer = actors[0].trim() // -> "<world>"
    const killed = actors[1].split("by")[0].trim() // -> "Isgalamido"
    const means = actors[1].split("by")[1].trim() // -> "MOD_TRIGGER_HURT"

    // If means is not in the killsByMeans object, adds it with value 1
    // else increments its value by 1
    killsByMeans[means] = killsByMeans[means] ? killsByMeans[means] + 1 : 1

    // If the world killed the player or the player killed themselves, they lose a kill
    if (killer === "<world>" || killer === killed) {
      // If player killed is not in the kills object, adds it with value -1
      // else decrements its value by 1
      kills[killed] = kills[killed] ? kills[killed] - 1 : -1
    } else {
      // If killer is not in the kills object, adds it with value 1
      // else increments its value by 1
      kills[killer] = kills[killer] ? kills[killer] + 1 : 1
      // Updates player's ranking by their kill count
      playerRanking[killer] = updatePlayerRank(playerRanking, killer, "kills")
    }
    // Updates player's ranking by their death count
    playerRanking[killed] = updatePlayerRank(playerRanking, killed, "deaths")
  }

  if (line.includes("ClientUserinfoChanged")) {
    // Example of client line -> 20:54 ClientUserinfoChanged: 2 n\Isgalamido\t\0\model\uriel/zael\hmodel\uriel
    const player = line.split("\\")[1] // -> "Isgalamido"

    if (!players.includes(player)) {
      players.push(player)
      playerRanking[player] = createPlayerRank()
    }
  }

  return { totalKills, kills, players, killsByMeans, playerRanking }
}
