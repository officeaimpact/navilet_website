"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import RealDashboardFrame from "./RealDashboardFrame";
import RealForecastContent from "./RealForecastContent";
import {
  TrendingUp,
  CalendarClock,
  Sparkles,
  Globe2,
  Wallet,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

function FeaturePoint({
  icon: Icon,
  text,
}: {
  icon: typeof Wallet;
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

export default function DashboardForecastShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper alt>
      <div
        ref={ref}
        className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12"
      >
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Прогнозы и предиктивная аналитика
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-heading">
            Не только что было — но и что будет дальше
          </h2>
          <p className="leading-relaxed text-body">
            Отдельный раздел кабинета превращает диалоги ассистента в прогноз:
            сколько заявок и денег принесёт месяц и куда движется спрос.
          </p>
          <div className="space-y-3">
            <FeaturePoint
              icon={CalendarClock}
              text="Прогноз до конца месяца: ожидаемые диалоги, клиенты с интересом и сумма оплаченных туров — с вашим доходом"
            />
            <FeaturePoint
              icon={Sparkles}
              text="AI-прогноз на 4–6 недель: модель смотрит вашу динамику, тренды всей сети и сезонность направлений"
            />
            <FeaturePoint
              icon={Globe2}
              text="Барометр спроса по сети: куда смотрят туристы всех агентств прямо сейчас — обезличенно"
            />
            <FeaturePoint
              icon={Wallet}
              text="Факт за 30 дней: средний чек интереса и корзина спроса — для сайта и MAX"
            />
            <FeaturePoint
              icon={HelpCircle}
              text="«Как это посчитано»: у каждого числа — прозрачная формула, без чёрного ящика"
            />
          </div>

          <Link
            href="/prognozy"
            className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Подробнее о разделе «Прогнозы»
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <RealDashboardFrame activeScreen="reports" animate={false}>
            <RealForecastContent />
          </RealDashboardFrame>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
