"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import RealDashboardFrame from "./RealDashboardFrame";
import RealWidgetContent from "./RealWidgetContent";
import { Palette, Eye, Code2, Sparkles, Layout, Image } from "lucide-react";

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

export default function DashboardWidgetShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper alt>
      <div
        ref={ref}
        className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-12 items-center"
      >
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="order-2 lg:order-1"
        >
          <RealDashboardFrame activeScreen="widget" animate={false}>
            <RealWidgetContent />
          </RealDashboardFrame>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-5 order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5">
            <Palette className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Кастомизация виджета
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-heading">
            Ваш бренд — ваш ассистент
          </h2>
          <p className="text-body leading-relaxed">
            Полностью настройте внешний вид чат-виджета под стиль вашей
            компании. Все изменения видны мгновенно в живом предпросмотре.
          </p>
          <div className="space-y-3">
            <FeaturePoint
              icon={Palette}
              text="Основной цвет с градиентом — виджет адаптируется к вашему бренду автоматически"
            />
            <FeaturePoint
              icon={Image}
              text="Загрузка логотипа или выбор из готовых аватаров: менеджер, робот, глобус"
            />
            <FeaturePoint
              icon={Eye}
              text="Живой предпросмотр: редактируйте заголовок, подзаголовок, приветственное сообщение"
            />
            <FeaturePoint
              icon={Layout}
              text="Позиция на странице: справа внизу или слева внизу — один клик"
            />
            <FeaturePoint
              icon={Code2}
              text="Одна строка кода — скопируйте и вставьте на свой сайт за 30 секунд"
            />
            <FeaturePoint
              icon={Sparkles}
              text="White-label: ассистент работает от имени вашего бренда, без сторонних упоминаний"
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
