"use client";

import { motion } from "motion/react";

type SkillsGridProps = {
  skills: string[];
  color: string;
};

export default function SkillsGrid({ skills, color }: SkillsGridProps) {
  return (
    <div className="h-full w-full">
      <motion.div
        className="
          grid gap-x-3 gap-y-6 h-full content-stretch justify-center
          grid-cols-3 grid-rows-5
        "
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: 1.85,
              staggerChildren: 0.07,
            },
          },
        }}
      >
        {skills.map((skill, i) => (
          <motion.article
            key={i}
            className={`flex items-center justify-center rounded-xl bg-[${color}] px-4 py-6 border border-[#404566]`}
            variants={{
              hidden: { scale: 0.6, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                },
              },
            }}
          >
            <h3 className="font-medium text-[#DBD0C3] whitespace-nowrap">
              {skill}
            </h3>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}