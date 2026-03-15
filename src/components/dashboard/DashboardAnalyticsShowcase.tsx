"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import RealDashboardFrame from "./RealDashboardFrame";
import RealOverviewContent from "./RealOverviewContent";
import RealAnalyticsContent from "./RealAnalyticsContent";
import {
  BarChart3,
  TrendingUp,
  Globe,
  Calendar,
  Download,
  Zap,
  MessagesSquare,
  Search,
  BookmarkCheck,
  Clock,
  Check,
} from "lucide-react";

function FeaturePoint({
  icon: Icon,
  text,
}: {
  icon: typeof Check;
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

export default function DashboardAnalyticsShowcase() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: "-80px" });
  const isInView2 = useInView(ref2, { once: true, margin: "-80px" });

  return (
    <>
      {/* Block A: Overview Panel */}
      <SectionWrapper>
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
            Аналитика, которая{" "}
            <span className="text-accent">продаёт</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
            Отслеживайте каждый диалог, каждый поиск, каждый лид — от первого
            сообщения клиента до запроса на бронирование
          </p>
        </motion.div>

        <div ref={ref1} className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5">
              <BarChart3 className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                Обзорная панель
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-heading">
              Вся картина бизнеса на одном экране
            </h3>
            <div className="space-y-3">
              <FeaturePoint
                icon={MessagesSquare}
                text="Метрики в реальном времени: диалоги, поиски, бронирования — со спарклайнами и динамикой"
              />
              <FeaturePoint
                icon={TrendingUp}
                text="Воронка конверсии: от первого сообщения до потенциального лида с процентами каждого этапа"
              />
              <FeaturePoint
                icon={Zap}
                text="AI-инсайты: топ-направления, время ответа, % обращений вне рабочих часов"
              />
              <FeaturePoint
                icon={Clock}
                text="Динамика за любой период: 7 дней, 30 дней, 90 дней — переключение в один клик"
              />
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
          >
            <RealDashboardFrame activeScreen="overview" animate={false}>
              <RealOverviewContent />
            </RealDashboardFrame>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Block B: Deep Analytics */}
      <SectionWrapper alt>
        <div ref={ref2} className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-12 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <RealDashboardFrame activeScreen="analytics" animate={false}>
              <RealAnalyticsContent />
            </RealDashboardFrame>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            className="space-y-5 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5">
              <Globe className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                Глубокая аналитика
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-heading">
              Понимайте спрос лучше, чем конкуренты
            </h3>
            <div className="space-y-3">
              <FeaturePoint
                icon={Globe}
                text="География спроса: популярные страны и города вылета — знайте, куда хотят ваши клиенты"
              />
              <FeaturePoint
                icon={Calendar}
                text="Тепловая карта активности 7×24: когда клиенты обращаются к ассистенту"
              />
              <FeaturePoint
                icon={Search}
                text="Матрица звёздность × питание: какие комбинации популярнее всего"
              />
              <FeaturePoint
                icon={BookmarkCheck}
                text="Бюджет vs найденная цена: AI находит варианты дешевле ожиданий клиента"
              />
              <FeaturePoint
                icon={Download}
                text="Экспорт всех данных в CSV: загружайте для своих отчётов"
              />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
