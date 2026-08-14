import { Cpu, Zap } from "lucide-react";
import type { AssistantVersionId } from "./content";

/**
 * Одна пара иконок версий на весь сайт: «Лид» — молния (быстрый сбор заявок),
 * «Про» — процессор (полноценный ИИ-инструмент менеджера).
 * Держим здесь, чтобы иконки не разъезжались между демо, тарифами и /versii.
 */
export const versionIcons: Record<AssistantVersionId, typeof Zap> = {
  lid: Zap,
  pro: Cpu,
};
