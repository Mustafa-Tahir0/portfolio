"use client";
import { EnterAnimation } from "@/components/animations";
import { motion } from "motion/react";
import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";

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
              <div className="logo overflow-hidden font-heading text-2xl font-normal">
                <span className="block">Mustafa Tahir</span>
              </div>
              <div className="cta flex items-center gap-4">
                <a href="mailto:mustafa.tahir0427@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <button className="bg-[#19233C] rounded-xl border px-4 py-3 pt-3.5 font-medium uppercase text-primary">Get in Touch</button>
                </a>
              </div>
            </nav>
          </EnterAnimation>
        </div>
        <div className="col-span-8 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4">
          <div className="col-span-5 row-span-5 max-lg:col-span-8 max-md:col-span-full">
            <EnterAnimation className="bg-[#313658] w-full h-full" offset={[false, false]} centerAnimation={true} />
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
            <EnterAnimation className="bg-[#313658] w-full h-full" offset={[true, false]} centerAnimation={true} />
          </div>
          <div className="col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:hidden">
            <EnterAnimation className="bg-[#19233C] w-full h-full" offset={[false, false]} centerAnimation={true} />
          </div>
        </div>
        <div className="col-span-4 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4">
          <div className="col-span-4 row-span-8 max-lg:col-span-full">
            <EnterAnimation className="bg-[#313658] w-full h-full" offset={[false, false]} centerAnimation={true} />
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
                    transition: { delayChildren: 1.8, staggerChildren: 0.15 },
                  },
                }}
              >
                {[
                  { href: "https://github.com/Mustafa-Tahir0", label: "Github" },
                  { href: "https://www.linkedin.com/in/mustafatahir09", label: "LinkedIn" },
                  { href: "/assets/Mustafa Tahir Resume.pdf", label: "Résumé" },
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