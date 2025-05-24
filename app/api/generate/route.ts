import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';

export const runtime = 'edge';

// Initialize KV client
const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { description, walletAddress } = await request.json();
    
    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Generate a unique project ID
    const projectId = `proj_${uuidv4().replace(/-/g, '')}`;
    const projectPath = `projects/${projectId}`;

    // Generate project structure using AI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert Web3 developer. Generate a complete project structure for a Web3 application based on the user's description. 
          The project should include:
          1. Smart contracts (Solidity)
          2. Frontend (Next.js, React, Tailwind CSS)
          3. Deployment scripts
          4. Testing
          
          Respond with a JSON object containing the file structure and file contents.`,
        },
        {
          role: 'user',
          content: `Create a Web3 project with this description: ${description}`,
        },
      ],
      temperature: 0.7,
    });

    const projectData = completion.choices[0]?.message?.content;
    
    if (!projectData) {
      throw new Error('Failed to generate project data');
    }

    // Store project data in KV store
    await kv.set(`project:${projectId}`, {
      id: projectId,
      description,
      walletAddress,
      createdAt: new Date().toISOString(),
      projectData: JSON.parse(projectData),
    });

    // In a real app, you would create a GitHub repository and push the code
    // For now, we'll return a mock GitHub URL
    const githubUrl = `https://github.com/your-org/${projectId}`;

    return NextResponse.json({
      projectId,
      projectUrl: githubUrl,
      message: 'Project generated successfully',
    });
  } catch (error) {
    console.error('Error generating project:', error);
    return NextResponse.json(
      { error: 'Failed to generate project' },
      { status: 500 }
    );
  }
}
