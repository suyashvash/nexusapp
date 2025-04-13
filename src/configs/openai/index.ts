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

const coldMailSchema = z.object({
    subject_line: z.string(),
    greeting: z.string(),
    intro_paragraph: z.string(),
    skills_alignment: z.string(),
    value_proposition: z.string(),
    relevant_experience: z.string(),
    call_to_action: z.string(),
    closing: z.string()
})



const getProfileAnalysis = async (profile: any, jobDescription: string) => {

    console.log(process.env.OPENAI_API_KEY);


    const response = await openaiClient.post('/chat/completions', {
        model: 'gpt-4o',
        response_format: zodResponseFormat(analysisSchema, "analysisSchema"),
        messages: [
            {
                role: 'system',
                content: `You are a Professional Profile Analyzer that helps job seekers evaluate their candidacy for specific positions.

TASK: Analyze the provided user profile against the job description to determine match quality and provide actionable feedback.

JOB DESCRIPTION:
${jobDescription}

EVALUATION CRITERIA:
1. Skills alignment: Match between candidate skills and job requirements
2. Experience relevance: How well the candidate's background fits the role
3. Portfolio/project quality: Evidence of relevant practical skills
4. Overall presentation: How effectively the profile communicates candidate value

SCORING EXPLANATION:
- total_score (0-100): Overall match between profile and job requirements
- short_list_score (0-100): Probability of being included in the interview candidate pool
- selection_score (0-100): Likelihood of receiving a job offer following interviews
- should_apply (true/false): Strategic recommendation on whether to pursue this position

Your analysis must be balanced, highlighting both strengths and areas for improvement. Provide specific, actionable next steps that would improve the candidate's competitive position.

RESPONSE FORMAT:
{
  "total_score": <number between 0-100>,
  "short_list_score": <number between 0-100>,
  "selection_score": <number between 0-100>,
  "should_apply": <boolean>,
  "next_steps": [
    "<specific, actionable improvement suggestion>",
    "<specific, actionable improvement suggestion>",
    "<specific, actionable improvement suggestion>"
  ],
  "strengths": [
    "<specific strength relative to this job>", 
    "<specific strength relative to this job>",
    "<specific strength relative to this job>"
  ],
  "weaknesses": [
    "<specific weakness or gap relative to this job>",
    "<specific weakness or gap relative to this job>",
    "<specific weakness or gap relative to this job>"
  ]
}`,
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

const generateColdMail = async (profile: any, jobDescription: string, receiverInfo: string) => {
    const response = await openaiClient.post('/chat/completions', {
        model: 'gpt-4o',
        response_format: zodResponseFormat(coldMailSchema, "coldMailSchema"),
        messages: [
            {
                role: 'system',
                content: `You are an expert AI Cold Mail Writer that helps job seekers craft compelling outreach messages to potential employers.

TASK: Create a professional, concise, and impactful cold mail that will grab attention and generate genuine interest in the candidate.

JOB DESCRIPTION:
${jobDescription}

RECEIVER INFORMATION:
${receiverInfo}

GUIDELINES:
1. Keep the message concise but impactful (300-400 words maximum)
2. Personalize the content based on the receiver's information
3. Demonstrate clear understanding of the company's needs and industry
4. Show how the candidate's specific skills/experience directly address those needs
5. Balance confidence with humility
6. Include a clear call to action

Your cold mail should effectively cover:
- A brief, memorable introduction of who the candidate is
- Specific value the candidate can bring to the company
- Why the candidate is particularly well-suited for this role
- How the candidate's experience aligns with company vision and industry needs

RESPONSE FORMAT:
{
  "subject_line": "<attention-grabbing but professional subject line>",
  "greeting": "<personalized greeting>",
  "intro_paragraph": "<concise introduction establishing connection and purpose>",
  "skills_alignment": "<paragraph highlighting key skills that match job requirements>",
  "value_proposition": "<paragraph explaining specific impact candidate can make>",
  "relevant_experience": "<paragraph connecting candidate's experience to company vision>",
  "call_to_action": "<clear next step request>",
  "closing": "<professional sign-off>"
}`,
            },
            {
                role: 'user',
                content: `
USER PROFILE:
- Professional Headline: ${profile.title}
- Professional Summary: ${profile.bio}
- Skills: ${profile.skills.join(', ')}
- Main Skill: ${profile.mainSkill}
- Portfolio: ${profile.portfolio}
- Projects (LINKS): ${profile.projectLinks.map((project: any) => project).join(', ')}
                `,
            }
        ],
        max_tokens: 700,
        temperature: 0.7,
    });

    try {
        const mailContent = response.data.choices[0].message.content;
        return mailContent;
    } catch (error) {
        return `An error occurred while generating your cold mail: ${error}`;
    }
}

export {
    getProfileAnalysis,
    generateColdMail
}