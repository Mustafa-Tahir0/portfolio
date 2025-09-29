"use client";
import { EnterAnimation } from "@/components/animations";
import { motion } from "motion/react";
import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import ProjectAccordion from "@/components/accordion";
import SkillsGrid from "@/components/grid";

export default function Home() {
  const purpleRef = useRef<HTMLDivElement | null>(null);
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    if (!purpleRef.current) return;

    const rect = purpleRef.current.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    setCenterOffset({
      x: viewportCenterX - elementCenterX,
      y: viewportCenterY - elementCenterY,
    });
  }, []);

  return (
    <main className="w-full bg-[#0F1320]">
      <motion.div
        className="fixed left-0 top-0 h-[2px] w-full origin-left bg-[#DBD0C3]"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 1, ease: "easeOut" },
          opacity: { delay: 1, duration: 0.5 },
        }}
      />
      <div className="grid h-screen max-h-[75rem] min-h-[50rem] grid-cols-12 grid-rows-10 gap-4 p-4 max-lg:h-auto max-lg:max-h-none max-lg:grid-rows-none max-lg:py-6">
        <div className="col-span-full row-span-1">
          <EnterAnimation className="bg-[#313658]">
            <nav className="flex size-full items-center justify-between max-lg:gap-4 max-md:flex-col max-md:justify-center">
              <div className="logo flex items-center gap-2 overflow-hidden font-heading text-2xl font-normal">
                <span className="block">Mustafa Tahir</span>
                <motion.img
                  src="/assets/cat.svg"
                  alt="Cat"
                  className="w-8 h-8"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.85 }}
                />
              </div>

              <div className="cta flex items-center gap-4">
                <a
                  href="mailto:mustafa.tahir0427@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-[#19233C] rounded-xl border px-4 py-3 pt-3.5 font-medium uppercase text-primary">
                    Get in Touch
                  </button>
                </a>
              </div>
            </nav>
          </EnterAnimation>
        </div>
        <div className="col-span-8 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4">
          <div className="col-span-5 row-span-5 max-lg:col-span-8 max-md:col-span-full">
            <EnterAnimation className="bg-[#313658] w-full h-full overflow-hidden flex items-center justify-center" offset={[false, false]} centerAnimation={true}>
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  className="absolute top-0 right-0"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  style={{ width: '7rem', height: '7rem' }}
                  transition={{
                    delay: 1.85,
                    duration: 1.0,
                    ease: "easeOut",
                  }}
                >
                  <Image src="/assets/kscope.svg" alt="enhance icon" fill />
                </motion.div>

                <p className="text-xl max-w-[30rem] leading-[135%] text-center">
                  I'm Mustafa Tahir, a Computer Science and Economics student at WashU ('27)
                  with experience in full-stack development and machine learning.
                  I enjoy building scalable, user-focused projects that blend technical depth with real-world impact.
                </p>

                <motion.div
                  className="absolute bottom-0 left-0"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  style={{ width: '7rem', height: '7rem' }}
                  transition={{
                    delay: 1.85,
                    duration: 1.0,
                    ease: "easeOut",
                  }}
                >
                  <Image src="/assets/kscope.svg" alt="enhance icon" fill />
                </motion.div>
              </div>
            </EnterAnimation>
          </div>
          <div className="relative col-span-3 row-span-5 max-lg:col-span-4 max-md:col-span-full">
            {!centerOffset && (
              <div
                ref={purpleRef}
                className="absolute w-full h-full pointer-events-none opacity-0"
                style={{ zIndex: 10 }}
              />
            )}
            {centerOffset && (
              <motion.div
                ref={purpleRef}
                className="absolute w-full h-full z-10 overflow-hidden"
                style={{ borderRadius: '16px', transformOrigin: "center center" }}
                initial={{ x: centerOffset.x, y: centerOffset.y, scale: 1.5 }}
                animate={{
                  scale: [1.25, 1],
                  x: [centerOffset.x, 0],
                  y: [centerOffset.y, 0],
                }}
                transition={{
                  scale: { delay: 1, duration: 0.4, ease: "easeOut" },
                  x: { delay: 1.6, duration: 0.4, ease: "easeOut" },
                  y: { delay: 1.6, duration: 0.4, ease: "easeOut" },
                }}
              >
                <Image
                  src="/assets/Profile2.JPG"
                  className="w-full h-full object-cover transform-gpu"
                  fill
                  alt="masked"
                />
              </motion.div>
            )}
          </div>
          <div className="col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:col-span-full">
            <EnterAnimation className="bg-[#313658] w-full h-full" offset={[true, false]} centerAnimation={true}>
              <SkillsGrid
                skills={['Anaconda', 'Android Studio', 'AWS EC2', 'Firebase', 'Git',
                  'Godot', 'JetBrains', 'Jira', 'JUnit', 'Jupyter', 'Linux',
                  'MariaDB', 'MongoDB', 'SQL', 'VS Code']}
                color={"#19233C"}
              />
            </EnterAnimation>
          </div>
          <div className="col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:hidden">
            <EnterAnimation className="bg-[#19233C] w-full h-full" offset={[false, false]} centerAnimation={true}>
              <SkillsGrid
                skills={['Bash', 'C/C++', 'HTML/CSS', 'Java', 'JavaScript',
                  'Kotlin', 'Next.js', 'PHP', 'Python', 'R', 'React',
                  'Swift', 'SwiftUI', 'Tailwind', 'TypeScript']}
                color={"#313658"}
              />
            </EnterAnimation>
          </div>
        </div>
        <div className="col-span-4 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4">
          <div className="col-span-4 row-span-8 max-lg:col-span-full">
            <EnterAnimation className="relative bg-[#313658] w-full h-full" offset={[false, false]} centerAnimation={true} noVerticalPadding>
              <div className="relative h-full">
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    opacity: { delay: 1.85, duration: 0.5 },
                  }}
                >
                  <ProjectAccordion />
                  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[1.5rem] bg-gradient-to-t from-[#313658] to-transparent" />
                  <div className="pointer-events-none absolute top-0 left-0 w-full h-[1.5rem] bg-gradient-to-b from-[#313658] to-transparent" />
                </motion.div>
              </div>
            </EnterAnimation>
          </div>
          <div className="col-span-4 row-span-1 max-lg:col-span-full max-lg:min-h-[5rem]">
            <EnterAnimation className="bg-[#313658] w-full h-full">
              <motion.div
                className="flex size-full items-center justify-evenly gap-2"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { delayChildren: 1.85, staggerChildren: 0.15 },
                  },
                }}
              >
                {[
                  { href: "https://github.com/Mustafa-Tahir0", label: "Github" },
                  { href: "https://www.linkedin.com/in/mustafatahir09", label: "LinkedIn" },
                  { href: "/assets/Mustafa Tahir Portfolio.pdf", label: "Résumé" },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex overflow-hidden text-base font-medium uppercase leading-[100%]"
                  >
                    <motion.span
                      className="social-link inline-block"
                      variants={{
                        hidden: { y: "100%", opacity: 0 },
                        show: {
                          y: "0%",
                          opacity: 1,
                          transition: {
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          },
                        },
                      }}
                    >
                      {link.label}
                    </motion.span>
                  </a>
                ))}
              </motion.div>
            </EnterAnimation>
          </div>
        </div>
      </div>
    </main>
  );
}