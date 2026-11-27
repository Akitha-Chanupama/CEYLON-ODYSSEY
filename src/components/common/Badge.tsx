import React from "react";
import { StoryClassification, StopPriority } from "@/types";

interface BadgeProps {
  type?: StoryClassification | StopPriority | "verified" | "check-again";
  label?: string;
  className?: string;
}

export function Badge({ type, label, className = "" }: BadgeProps) {
  let badgeStyle = "bg-sage text-ink border-line";
  let dotColor = "bg-forest";
  let displayLabel = label;

  switch (type) {
    case "tradition":
      badgeStyle = "bg-[#F9EFE0] text-[#7A4B13] border-[#E8D0B1]";
      dotColor = "bg-[#C0914E]";
      displayLabel = displayLabel || "Tradition & Legend";
      break;
    case "historical":
      badgeStyle = "bg-sage text-forest border-line";
      dotColor = "bg-forest";
      displayLabel = displayLabel || "Documented History";
      break;
    case "observable":
      badgeStyle = "bg-[#E6EFF2] text-[#1E4E5B] border-[#C8DFE5]";
      dotColor = "bg-ocean";
      displayLabel = displayLabel || "What You'll See";
      break;
    case "uncertain":
      badgeStyle = "bg-warning-bg text-warning-text border-[#EED7B0]";
      dotColor = "bg-[#B5761D]";
      displayLabel = displayLabel || "Local Accounts Vary";
      break;
    case "primary":
      badgeStyle = "bg-forest text-white border-forest";
      dotColor = "bg-antique-gold-light";
      displayLabel = displayLabel || "Must Visit";
      break;
    case "optional":
      badgeStyle = "bg-mist text-muted border-line";
      dotColor = "bg-muted";
      displayLabel = displayLabel || "Optional";
      break;
    case "conditional":
      badgeStyle = "bg-warning-bg text-warning-text border-[#EED7B0]";
      dotColor = "bg-[#B5761D]";
      displayLabel = displayLabel || "Conditional";
      break;
    case "verified":
      badgeStyle = "bg-emerald-50 text-emerald-900 border-emerald-200";
      dotColor = "bg-success";
      displayLabel = displayLabel || "Verified";
      break;
    case "check-again":
      badgeStyle = "bg-amber-50 text-amber-900 border-amber-200";
      dotColor = "bg-antique-gold";
      displayLabel = displayLabel || "To Confirm";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border tracking-wide whitespace-nowrap shrink-0 ${badgeStyle} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" />
      <span>{displayLabel}</span>
    </span>
  );
}
