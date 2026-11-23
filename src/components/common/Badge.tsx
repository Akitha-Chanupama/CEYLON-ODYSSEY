import React from "react";
import { StoryClassification, StopPriority } from "@/types";

interface BadgeProps {
  type?: StoryClassification | StopPriority | "verified" | "check-again";
  label?: string;
  className?: string;
}

export function Badge({ type, label, className = "" }: BadgeProps) {
  let badgeStyle = "bg-sage text-ink border-line";
  let displayLabel = label;

  switch (type) {
    case "tradition":
      badgeStyle = "bg-[#F7EAD7] text-[#7A4B13] border-[#E8D0B1]";
      displayLabel = displayLabel || "Tradition & Legend";
      break;
    case "historical":
      badgeStyle = "bg-sage text-forest border-line";
      displayLabel = displayLabel || "Documented History";
      break;
    case "observable":
      badgeStyle = "bg-[#E6EFF2] text-[#1E4E5B] border-[#C8DFE5]";
      displayLabel = displayLabel || "What You'll See";
      break;
    case "uncertain":
      badgeStyle = "bg-warning-bg text-warning-text border-[#F4E0BE]";
      displayLabel = displayLabel || "Local Accounts Vary";
      break;
    case "primary":
      badgeStyle = "bg-forest text-white border-forest";
      displayLabel = displayLabel || "Must Visit";
      break;
    case "optional":
      badgeStyle = "bg-sage-light text-muted border-line";
      displayLabel = displayLabel || "Optional";
      break;
    case "conditional":
      badgeStyle = "bg-warning-bg text-warning-text border-[#F4E0BE]";
      displayLabel = displayLabel || "Conditional";
      break;
    case "verified":
      badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-200";
      displayLabel = displayLabel || "Verified";
      break;
    case "check-again":
      badgeStyle = "bg-amber-50 text-amber-800 border-amber-200";
      displayLabel = displayLabel || "To Confirm";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide uppercase ${badgeStyle} ${className}`}
    >
      {displayLabel}
    </span>
  );
}

