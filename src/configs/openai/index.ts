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
                content: `You are a specialized technical recruiter with 10+ years experience in candidate evaluation for tech roles.

TASK: Perform a precise candidate-job fit analysis based on the NexusCard profile data and job description.

REQUIRED APPROACH:
1. First, identify the EXACT key technical skills, experience levels, and qualifications from the job description
2. Then analyze the NexusCard profile data point-by-point against these requirements
3. Use specific evidence from the profile (e.g., project links, portfolio items) in your evaluation
4. Apply industry hiring standards for this specific role/domain
5. Be honest and quantitative - avoid inflating scores
6. If profile is not a fit, provide clear, actionable feedback on how to improve and provide low scores

SCORING METHODOLOGY:
- total_score (0-100): Weighted average based on skills match (40%), experience fit (30%), portfolio evidence (20%), presentation (10%) 
- short_list_score (0-100): Probability of resume passing ATS and initial HR screening
- selection_score (0-100): Probability of receiving an offer after completing all interview stages
- should_apply (true/false): Strategic recommendation with 70% match as minimum threshold for "true"

For actionable feedback:
* Be ultra-specific about skill gaps relative to job requirements
* Recommend precise skill demonstrations for the portfolio
* Suggest concrete resume/profile optimizations for ATS systems
* Identify quantifiable achievements that would strengthen the application

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
    "<specific strength relative to this job with evidence>", 
    "<specific strength relative to this job with evidence>",
    "<specific strength relative to this job with evidence>"
  ],
  "weaknesses": [
    "<specific skill/experience gap with recommended remedy>",
    "<specific skill/experience gap with recommended remedy>",
    "<specific skill/experience gap with recommended remedy>"
  ]
}`
            },
            {
                role: 'user',
                content: `
JOB DESCRIPTION:
${jobDescription}

NEXUSCARD PROFILE:
- Professional Title: ${profile.title}
- Professional Summary: ${profile.bio}
- Core Skills: ${profile.skills.join(', ')}
- Primary Expertise: ${profile.mainSkill}
- Portfolio URL: ${profile.portfolio}
- Project URLs: ${profile.projects.map((project: any) => project.link).join(', ')}
- Project Evidence: ${profile.projects.map((project: any) => project.name).join(', ')}
               `
            }
        ],
        max_tokens: 600,
        temperature: 0.4,
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
                content: `You are an expert cold email strategist who specializes in helping tech professionals secure interviews through high-conversion outreach messages.

TASK: Craft a tailored, professional cold email optimized for 40%+ response rate that positions the candidate as the ideal solution for the company's specific needs.

STRUCTURE REQUIREMENTS:
1. Subject line: Must include a metric/achievement and position name (8-10 words)
2. Opening: Direct reference to receiver's company/team/recent company news (1-2 sentences)
3. Skills alignment: Highlight 2-3 *exact match* skills from job description using validation from projects/portfolio
4. Value proposition: One specific, quantifiable achievement most relevant to role's challenges
5. Differentiation factor: One unique qualification that other candidates likely won't have
6. Call to action: Propose a specific time/date for a 20-minute discussion or request a particular next step

OPTIMIZATION RULES:
- Total length: 150-220 words maximum (scannable in 30 seconds)
- Tone: Confident but not arrogant, professionally conversational
- No generic statements ("I'm a hard worker", "passionate developer") 
- Avoid obvious templated language
- Include 1-2 technical specifics that demonstrate deep domain knowledge
- Personalize based on the receiver's role (technical vs. HR)
- NO life story, entire work history, or irrelevant personal details

RESPONSE FORMAT:
{
  "subject_line": "<achievement/metric + position - 8-10 words>",
  "greeting": "<personalized greeting with name>",
  "intro_paragraph": "<company-specific opening with recent news/achievement>",
  "skills_alignment": "<2-3 exact-match skills with evidence>",
  "value_proposition": "<one quantifiable achievement most relevant to role>",
  "relevant_experience": "<unique qualification + direct company benefit>",
  "call_to_action": "<specific meeting proposal/next step>",
  "closing": "<professional sign-off>"
}`
            },
            {
                role: 'user',
                content: `
JOB DESCRIPTION:
${jobDescription}

RECEIVER INFORMATION:
${receiverInfo}

NEXUSCARD PROFILE:
- Professional Title: ${profile.title}
- Professional Summary: ${profile.bio}
- Core Skills: ${profile.skills.join(', ')}
- Primary Expertise: ${profile.mainSkill}
- Portfolio URL: ${profile.portfolio}
- Project URLs: ${profile.projects.map((project: any) => project.link).join(', ')}
- Project Evidence: ${profile.projects.map((project: any) => project.name).join(', ')}
                `
            }
        ],
        max_tokens: 700,
        temperature: 0.5,
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