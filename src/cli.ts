#!/usr/bin/env node
import { mastra } from './mastra/index.js'

async function main() {
  const agent = mastra.getAgent('planningAgent')

  console.log('')
  console.log('🌅 Good morning! Let\'s plan your day.')
  console.log('')
  console.log('I\'m your Dayflow planning assistant.')
  console.log('What would you like to focus on today?')
  console.log('')

  try {
    const result = await agent.generate([
      {
        role: 'user',
        content: 'Help me plan my day. Ask me about my tasks and priorities.',
      },
    ])

    console.log(result.text)
    console.log('')
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

main()
