
import Prompt from "@models/prompt"
import { connectionToDB } from "@utils/database"

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectionToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    new Response('Failed to fetch prompt', { status: 500 })
  }
}

// PATCH (upate)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()
  try {
    await connectionToDB()

    const existingPrompt = await Prompt.findById(params.id).populate('creator')
    if (!existingPrompt) return new Response('Prompt not found', { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    new Response('Failed to update prompt', { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectionToDB()

    await Prompt.findByIdAndDelete(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    new Response('Failed to delete prompt', { status: 500 })
  }
}