import Prompt from "@models/prompt"
import { connectionToDB } from "@utils/database"

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json()
  console.log({ userId, prompt, tag });

  try {
    await connectionToDB()

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response('Failed to create new prompt', { status: 500 })
  }
}