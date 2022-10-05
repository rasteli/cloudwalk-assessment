import { CreateGames } from "../services/create-games"

export class CreateGamesController {
  async handle(filePath: string) {
    const service = new CreateGames()
    const result = await service.execute(filePath)

    return result
  }
}
