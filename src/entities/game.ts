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
    let killsByMeansSum = 0
    let rankingDeathsSum = 0

    Object.entries(playerRanking).forEach(([, value]) => {
      rankingDeathsSum += value.deaths
    })

    Object.entries(killsByMeans).forEach(([, value]) => {
      killsByMeansSum += value
    })

    if (totalKills !== killsByMeansSum || totalKills !== rankingDeathsSum) {
      throw new Error("Total kills must be equal to kills by means and player deaths")
    }

    if (players.length === 0) {
      throw new Error("Players array must not be empty")
    }

    this.kills = kills
    this.players = players
    this.totalKills = totalKills
    this.killsByMeans = killsByMeans
    this.playerRanking = playerRanking
  }
}
