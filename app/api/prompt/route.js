import Prompt from "@models/prompt"
import { connectionToDB } from "@utils/database"

export const GET = async (req) => {
  try {
    await connectionToDB()

    const prompts = await Prompt.find({}).populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    new Response('Failed to fetch all prompts', { status: 500 })
  }
}