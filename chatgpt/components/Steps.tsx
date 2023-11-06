"use client";

import { QueryStep } from "@/lib";
import { useMemo } from "react";

export default function Steps({ steps }: { steps: QueryStep[] }) {
  console.log("from steps", { steps });
  return steps.map((step, index) => {
    console.log("yo here", step);
    if (step.isLast) {
      console.log("her here ");
      return <></>;
    }
    <div key={index}>
      <div>YOOO{step.summary}</div>
      {step.summary}
    </div>;
  });
}
