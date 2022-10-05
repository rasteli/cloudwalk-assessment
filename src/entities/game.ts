import { getArrayFromObjectValues } from "../utils/get-array-from-object-values"

export interface Kills {
  [key: string]: number
}

export interface PlayerRanking {
  [key: string]: {
    kills: number
    deaths: number
  }
}

interface GameProps {
  kills: Kills
  players: string[]
  totalKills: number
  killsByMeans: Kills
  playerRanking: PlayerRanking
}

export class Game {
  private kills: Kills
  private players: string[]
  private totalKills: number
  private killsByMeans: Kills
  private playerRanking: PlayerRanking

  constructor({ totalKills, playerRanking, players, kills, killsByMeans }: GameProps) {
    if (players.length === 0) {
      throw new Error("Players array must not be empty")
    }

    let killsByMeansSum = 0
    let playerDeathsSum = 0

    getArrayFromObjectValues(playerRanking).forEach(value => {
      playerDeathsSum += value.deaths
    })

    getArrayFromObjectValues(killsByMeans).forEach(value => {
      killsByMeansSum += value
    })

    if (totalKills !== killsByMeansSum || totalKills !== playerDeathsSum) {
      throw new Error("Total kills must be equal to kills by means and player deaths")
    }

    this.totalKills = totalKills
    this.players = players
    this.kills = kills
    this.killsByMeans = killsByMeans
    this.playerRanking = playerRanking
  }
}
