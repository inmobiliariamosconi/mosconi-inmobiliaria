"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Makes every framer-motion animation in the app respect the OS-level
// "reduce motion" preference automatically, without branching initial/
// animate props per-component (which would cause hydration mismatches).
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
