import { z } from "zod";

export const contactTriageInput = z.object({ message: z.string().trim().min(10).max(10000) });
export const contactTriageResult = z.object({
  summary: z.string().min(1).max(1200),
  category: z.enum(["Account", "Betaling", "Technisch", "Privacy & veiligheid", "Verificatie", "Overig"]),
  priority: z.enum(["Laag", "Normaal", "Hoog", "Urgent"]),
  nextStep: z.string().min(1).max(1000),
});
export type ContactTriage = z.infer<typeof contactTriageResult>;

/** Remove obvious credentials and contact addresses before external analysis. */
export function prepareContactMessage(message: string): string {
  return message
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[e-mailadres]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [verwijderd]")
    .replace(/\b(password|wachtwoord|secret|token|api[_ -]?key)\s*[:=]\s*\S+/gi, "$1: [verwijderd]");
}