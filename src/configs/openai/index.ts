import axios from 'axios';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';

const BASE_URL = 'https://api.openai.com/v1';

const OPENAI_API_KEY = "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"

// Create an axios instance with common configuration
const openaiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
});

const analysisSchema = z.object(
    {
        total_score: z.number(),
        short_list_score: z.number(),
        selection_score: z.number(),
        should_apply: z.boolean(),
        next_steps: z.array(z.string()),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string())
    })


const getProfileAnalysis = async (profile: any, jobDescription: string) => {

    console.log(process.env.OPENAI_API_KEY);


    const response = await openaiClient.post('/chat/completions', {
        model: 'gpt-4o',
        response_format: zodResponseFormat(analysisSchema, "analysisSchema"),
        messages: [
            {
                role: 'system',
                content: `You have to act as a Profile Analysis AI.
        You will be given a profile and a job description. Your task is to analyze the profile and provide feedback on how well it matches the job description. 
        Please provide a detailed analysis of the strengths and weaknesses of the profile in relation to the job description.
         Also, suggest any improvements that could be made to the profile to better match the job description.
         
         Here's the structure of the profile:

         total_score - number ( 0-100)
        short_list_score - number ( 0-100) [ Based on chances of being shortlisted for a job interview queue ]
        selection_score - number ( 0-100) [ Based on chances of being selected for a job interview ]
        should_apply - boolean ( true/false )
        next_steps - array of strings ( suggestions for improvement )
        

         Please analyze the profile based on the given job description
         
         JOB DESCRIPTION: ${jobDescription}
         
         and STRICYLY provide feedback in the following format:
         
         {
            total_score: <number>,
            short_list_score: <number>,
            selection_score: <number>,
            should_apply: <boolean>,
            next_steps: ["<suggestion1>", "<suggestion2>"]
            strengths: ["<strength1>", "<strength2>"],
            weaknesses: ["<weakness1>", "<weakness2>"]
         }

         `,
            },
            {
                role: 'user',
                content: `
                USER PROFILE:
                - Professional Headline : ${profile.title}
                - Professional Summary : ${profile.bio}
                - Skills : ${profile.skills.join(', ')}
                - Main Skill : ${profile.mainSkill}
                - Portfolio : ${profile.portfolio}
                - Projects ( LINKS ) : ${profile.projectLinks.map((project: any) => project).join(', ')}
        
               `,
            }
        ],
        max_tokens: 500,
        temperature: 0.5,
    });

    try {
        return response.data.choices[0].message.content;
    } catch (error) {
        return `Some error occured : ${error}`;
    }
}

export {
    getProfileAnalysis,
}