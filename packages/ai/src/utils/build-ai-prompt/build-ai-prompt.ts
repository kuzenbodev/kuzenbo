export interface BuildAiPromptInput {
  instruction: string;
  subject: string;
}

export const buildAiPrompt = ({
  instruction,
  subject,
}: BuildAiPromptInput): string =>
  `${instruction.trim()}\n\nSubject: ${subject.trim()}`;
