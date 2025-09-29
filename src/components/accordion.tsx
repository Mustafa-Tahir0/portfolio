"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type Project = {
  title: string;
  link: string;
  image: string;
};

const projects: Project[] = [
  { title: "Media Menu", link: "https://mediamenu.vercel.app", image: "/assets/mediamenu.png" },
  { title: "Outfit of the Day", link: "https://github.com/Mustafa-Tahir0/OutfitOfTheDay", image: "/assets/ootd.png" },
  { title: "RepoIntel", link: "https://elcalzalt.pythonanywhere.com", image: "/assets/repointel.png" },
  { title: "Simple MNIST Neural Network", link: "https://www.kaggle.com/code/tahiro09/neural-network", image: "/assets/mnist.png" },
  { title: "WashU4Wellness", link: "https://github.com/ambijani/WashU4Wellness", image: "/assets/wellness.png" },
  { title: "Yappers", link: "https://github.com/Mustafa-Tahir0/Yappers", image: "/assets/yappers.webp" },
];

export default function ProjectAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="hide-scrollbar flex h-full flex-col overflow-y-auto max-lg:overflow-y-visible"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: 1.85,
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {projects.map((project, index) => {
        const isOpen = openIndex === index;
        const isHovered = hoveredIndex === index;

        return (
          <motion.button
            key={project.title}
            className="button relative pb-[calc(1.8rem-2px)] text-left pt-[1.8rem]"
            onClick={() => setOpenIndex(index)}
            variants={{}}
          >
            <div className="flex w-full items-baseline justify-between">
              <h3 className="overflow-hidden font-heading text-2xl font-normal leading-[100%]">
                <motion.span
                  className="block pb-[2px]"
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    show: {
                      y: "0%",
                      opacity: 1,
                      transition: {
                        duration: 0.65,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                >
                  {project.title}
                </motion.span>
              </h3>
              <motion.div
                className={"inline-block px-2"}
                animate={
                  isHovered
                    ? {
                        x: [0, 5, 0],
                        y: [0, -5, 0],
                      }
                    : { x: 0, y: 0 }
                }
                transition={
                  isHovered
                    ? {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.6
                      }
                    : { duration: 0.3 }
                }
              >
                <Image
                  src="/assets/arrow-icon-custom.svg"
                  alt="arrow"
                  width={16}
                  height={16}
                  className={`transform-gpu size-[0.9rem] transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="thumbnail pointer-events-auto relative mt-4 block aspect-[3/2] w-full origin-top overflow-hidden rounded-[16px] bg-secondary"
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1, scale: 0.95 }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                      priority
                    />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>

            {index < projects.length - 1 && (
              <motion.div
                className="work-border absolute bottom-0 left-0 h-[1px] w-full bg-[#DBD0C3] origin-left"
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { 
                      duration: 0.65, 
                      ease: "easeOut",
                      delay: index * 0.2 + 1.65
                    },
                  },
                }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}