import { startBrowserAgent } from "magnitude-core";
import z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const agent = await startBrowserAgent({
        // Starting URL for agent
        url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        // Show thoughts and actions
        narrate: true,
        // LLM configuration
        llm: {
            provider: 'anthropic',
            options: {
                model: 'claude-sonnet-4-20250514',
                apiKey: process.env.ANTHROPIC_API_KEY
            }
        },
    });

    // Intelligently extract data based on the DOM content matching a provided zod schema
    // const gettingStarted = await agent.extract('Extract how to get started with Magnitude', z.object({
    //     // Agent can extract existing data or new insights
    //     difficulty: z.enum(['easy', 'medium', 'hard']),
    //     steps: z.array(z.string()),
    // }));

    // Navigate to a new URL
    await agent.nav('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Magnitude can handle high-level tasks
    await agent.act(
        'login to OrangeHRM',
        {
            data: {
                username: 'Admin',
                password: 'admin123'
            }
        });

    await agent.act([
        'go to my info page',
        'click on my emergency contacts',
        'add a new emergency contact: Lucy (spouse)',
        'log out'
    ])

    // It can also handle low-level actions
    await agent.act('Drag "Get started with Magnitude" to the top of the in progress column');

    // Stop agent and browser
    await agent.stop();
}

main();
