/**
 * Veilige foutafhandeling voor publieke eindpunten (pure functies).
 *
 * Bezoekers krijgen alleen een generieke melding; de technische details gaan
 * naar de serverlog, met e-mailadressen gemaskeerd en zonder volledige objecten.
 */
import { maskEmailsInText } from "./redact";

export const GENERIC_TEMPORARY_ERROR = "Er is een tijdelijk verbindingsprobleem opgetreden.";

/** Log-veilige samenvatting van een fout: naam, gemaskeerde melding en stack. */
export function describeErrorForLog(error: unknown): { name: string; message: string; stack?: string } {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: maskEmailsInText(error.message).slice(0, 500),
      ...(error.stack ? { stack: maskEmailsInText(error.stack).slice(0, 2000) } : {}),
    };
  }
  return { name: "NonError", message: "(non-error value thrown)" };
}

export function logServerError(scope: string, error: unknown): void {
  console.error(`[${scope}]`, describeErrorForLog(error));
}
