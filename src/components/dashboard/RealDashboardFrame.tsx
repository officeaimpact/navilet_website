"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { scaleIn } from "@/lib/animations";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Code2,
  Activity,
  UserCircle,
  Search,
  Clock,
} from "lucide-react";

type Screen =
  | "overview"
  | "analytics"
  | "conversations"
  | "widget"
  | "system"
  | "account";

const NAV_ITEMS: { id: Screen; icon: typeof LayoutDashboard; label: string }[] =
  [
    { id: "overview", icon: LayoutDashboard, label: "Обзор" },
    { id: "conversations", icon: MessageSquare, label: "Диалоги" },
    { id: "analytics", icon: BarChart3, label: "Аналитика" },
    { id: "widget", icon: Code2, label: "Виджет" },
    { id: "system", icon: Activity, label: "Система" },
    { id: "account", icon: UserCircle, label: "Аккаунт" },
  ];

const SCREEN_TITLES: Record<Screen, string> = {
  overview: "Обзор",
  analytics: "Аналитика",
  conversations: "Диалоги",
  widget: "Настройки виджета",
  system: "Статус системы",
  account: "Аккаунт",
};

interface RealDashboardFrameProps {
  activeScreen: Screen;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  compact?: boolean;
}

export default function RealDashboardFrame({
  activeScreen,
  children,
  className = "",
  animate = true,
  compact = false,
}: RealDashboardFrameProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const sideW = compact ? 44 : 52;
  const headerH = compact ? 30 : 36;
  const logoH = compact ? 36 : 42;
  const iconSize = compact ? 14 : 16;
  const contentPad = compact ? 8 : 10;

  const content = (
    <div
      className={`overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-lg ${className}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-[10px] text-[#64748B]">
          dashboard.navylet.ai
        </div>
      </div>

      {/* Dashboard layout: sidebar + main */}
      <div className="flex" style={{ minHeight: compact ? 300 : 420 }}>
        {/* Sidebar */}
        <div
          className="flex flex-col border-r border-[#E2E8F0] bg-white/95 backdrop-blur-sm shrink-0"
          style={{ width: sideW }}
        >
          {/* Logo area */}
          <div
            className="flex items-center justify-center border-b border-[#E2E8F0]"
            style={{ height: logoH }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/globe-logo.svg"
              alt="навылет AI"
              style={{
                width: compact ? 26 : 32,
                height: compact ? 26 : 32,
              }}
              draggable={false}
            />
          </div>

          {/* Nav icons */}
          <div
            className="flex flex-1 flex-col items-center gap-0.5 py-2"
            style={{ paddingInline: compact ? 5 : 6 }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeScreen;
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative w-full">
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full bg-[#0038FF]"
                      style={{
                        width: 2.5,
                        height: compact ? 14 : 16,
                      }}
                    />
                  )}
                  <div
                    className={`flex items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#F0F4FF] text-[#0038FF]"
                        : "text-[#94A3B8]"
                    }`}
                    style={{
                      height: compact ? 30 : 34,
                      width: "100%",
                    }}
                    title={item.label}
                  >
                    <Icon size={iconSize} strokeWidth={1.8} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* User avatar */}
          <div className="flex items-center justify-center border-t border-[#E2E8F0] py-2.5">
            <div
              className="rounded-full bg-gradient-to-br from-[#0038FF] to-[#3B82F6] flex items-center justify-center"
              style={{
                width: compact ? 22 : 26,
                height: compact ? 22 : 26,
              }}
            >
              <span
                className="font-semibold text-white"
                style={{ fontSize: compact ? 8 : 9 }}
              >
                A
              </span>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          <div
            className="flex items-center justify-between border-b border-[#E2E8F0] bg-white/80 backdrop-blur-sm px-3"
            style={{ height: headerH }}
          >
            <span
              className="font-semibold text-[#1E293B] truncate"
              style={{ fontSize: compact ? 10 : 11 }}
            >
              {SCREEN_TITLES[activeScreen]}
            </span>
            <div className="flex items-center gap-2">
              <div
                className="hidden sm:flex items-center gap-1 text-[#94A3B8]"
                style={{ fontSize: compact ? 7 : 8 }}
              >
                <Clock size={compact ? 7 : 8} />
                <span>Только что</span>
              </div>
              <div
                className="flex items-center gap-1 rounded-lg bg-[#F1F5F9] px-2"
                style={{
                  height: compact ? 18 : 20,
                  fontSize: compact ? 7 : 8,
                }}
              >
                <Search
                  size={compact ? 8 : 9}
                  className="text-[#94A3B8]"
                />
                <span className="text-[#94A3B8]">Поиск</span>
                <span
                  className="hidden sm:inline rounded border border-[#E2E8F0] bg-white px-0.5 text-[#94A3B8] font-mono ml-0.5"
                  style={{ fontSize: compact ? 5 : 6 }}
                >
                  ⌘K
                </span>
              </div>
              <div
                className="rounded-full bg-gradient-to-br from-[#0038FF] to-[#3B82F6] flex items-center justify-center"
                style={{
                  width: compact ? 16 : 20,
                  height: compact ? 16 : 20,
                }}
              >
                <span
                  className="font-semibold text-white"
                  style={{ fontSize: compact ? 7 : 8 }}
                >
                  A
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="flex-1 overflow-hidden bg-[#F8FAFC]"
            style={{ padding: contentPad }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  if (!animate) return <div ref={ref}>{content}</div>;

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {content}
    </motion.div>
  );
}
