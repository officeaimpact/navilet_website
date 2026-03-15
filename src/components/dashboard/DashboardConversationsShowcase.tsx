"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import RealDashboardFrame from "./RealDashboardFrame";
import RealConversationsContent from "./RealConversationsContent";
import {
  MessageSquare,
  Search,
  UserCheck,
  GitBranch,
  Filter,
  Eye,
} from "lucide-react";

function FeaturePoint({
  icon: Icon,
  text,
}: {
  icon: typeof Eye;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-ice">
        <Icon className="h-3.5 w-3.5 text-accent" />
      </div>
      <span className="text-sm leading-relaxed text-body">{text}</span>
    </div>
  );
}

export default function DashboardConversationsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper>
      <div
        ref={ref}
        className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12 items-center"
      >
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Управление диалогами
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-heading">
            Каждый диалог — под контролем
          </h3>
          <p className="text-body leading-relaxed">
            Просматривайте полную историю каждого разговора клиента с
            AI-ассистентом, включая карточки туров и результаты поиска.
          </p>
          <div className="space-y-3">
            <FeaturePoint
              icon={Eye}
              text="Chat replay: полное воспроизведение переписки с карточками туров в реальном виде"
            />
            <FeaturePoint
              icon={UserCheck}
              text="Профиль клиента: устройство, браузер, длительность диалога, среднее время ответа"
            />
            <FeaturePoint
              icon={GitBranch}
              text="Путь клиента: визуальный timeline от начала до завершения разговора"
            />
            <FeaturePoint
              icon={Filter}
              text="Умные фильтры: по статусу, дате, с карточками, с запросами на бронь"
            />
            <FeaturePoint
              icon={Search}
              text="Полнотекстовый поиск: по сообщениям, странам, городам, отелям"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            {[
              { dot: "bg-emerald-400", label: "Запрос на бронь" },
              { dot: "bg-amber-400", label: "Карточки показаны" },
              { dot: "bg-[#CBD5E1]", label: "Только чат" },
            ].map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-1.5 text-xs text-muted"
              >
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <RealDashboardFrame activeScreen="conversations" animate={false}>
            <RealConversationsContent />
          </RealDashboardFrame>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
