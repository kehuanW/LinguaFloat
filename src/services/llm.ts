/**
 * LLM Service for communicating with OpenAI-compatible APIs
 * Handles both Refine and Write-from-Intent modes
 */

export interface RefineRequest {
  originalText: string;
  tone: string;
  style: string;
  context?: string;
}

export interface IntentRequest {
  intent: string;
  tone: string;
  style: string;
  context?: string;
}

export interface LLMResponse {
  success: boolean;
  result?: string;
  error?: string;
}

/**
 * Build the system and user prompts for Refine mode
 */
function buildRefinePrompt(request: RefineRequest): { system: string; user: string } {
  const system = `You are a writing assistant for non-native English speakers in professional environments.
GOAL: Refine the following text while keeping the original meaning. Improve clarity, grammar, tone, and naturalness.
Tone: ${request.tone}
Style: ${request.style}
${request.context ? `Context: ${request.context}` : ''}
LanguageMode: EN→EN

IMPORTANT: Return ONLY the refined text. Do not include explanations, introductions, or any other commentary.`;

  const user = request.originalText;

  return { system, user };
}

/**
 * Build the system and user prompts for Write-from-Intent mode
 */
function buildIntentPrompt(request: IntentRequest): { system: string; user: string } {
  const system = `You help users write natural, concise English messages based on their intent.
GOAL: Generate a clear and context-appropriate message.
Tone: ${request.tone}
Style: ${request.style}
${request.context ? `Context: ${request.context}` : ''}

IMPORTANT: Return ONLY the generated message. Do not include explanations, introductions, or any other commentary.`;

  const user = request.intent;

  return { system, user };
}

/**
 * Call OpenAI-compatible API
 */
async function callLLM(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  apiEndpoint: string = 'https://api.openai.com/v1/chat/completions'
): Promise<LLMResponse> {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return {
        success: false,
        error: errorData.error?.message || `API error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return {
        success: false,
        error: 'No response from API',
      };
    }

    return {
      success: true,
      result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Refine existing text
 */
export async function refineText(
  apiKey: string,
  request: RefineRequest
): Promise<LLMResponse> {
  if (!apiKey) {
    return {
      success: false,
      error: 'API key is required. Please configure it in Settings.',
    };
  }

  if (!request.originalText.trim()) {
    return {
      success: false,
      error: 'Please provide text to refine.',
    };
  }

  const { system, user } = buildRefinePrompt(request);
  return callLLM(apiKey, system, user);
}

/**
 * Generate text from user intent
 */
export async function generateFromIntent(
  apiKey: string,
  request: IntentRequest
): Promise<LLMResponse> {
  if (!apiKey) {
    return {
      success: false,
      error: 'API key is required. Please configure it in Settings.',
    };
  }

  if (!request.intent.trim()) {
    return {
      success: false,
      error: 'Please describe what you want to say.',
    };
  }

  const { system, user } = buildIntentPrompt(request);
  return callLLM(apiKey, system, user);
}
