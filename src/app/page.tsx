"use client";
import { EnterAnimation } from "@/components/animations";
import { motion } from "motion/react";
import { useRef, useLayoutEffect, useState } from "react";

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
    <main className="w-full">
      <motion.div
        className="fixed left-0 top-0 h-[2px] w-full origin-left bg-blue-200"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 1, ease: "easeInOut" },
          opacity: { delay: 1, duration: 0.5 },
        }}
      />
      <div className="grid h-screen max-h-[75rem] min-h-[50rem] grid-cols-12 grid-rows-10 gap-4 p-4 max-lg:h-auto max-lg:max-h-none max-lg:grid-rows-none max-lg:py-6">
        <div className="col-span-full row-span-1">
          <EnterAnimation className="bg-blue-200" />
        </div>
        <div className="col-span-8 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4">
          <div className="col-span-5 row-span-5 max-lg:col-span-8 max-md:col-span-full">
            <EnterAnimation className="bg-blue-200 w-full h-full" offset={[false, false]} centerAnimation={true} />
          </div>
          <div className="relative col-span-3 row-span-5 max-lg:col-span-4 max-md:col-span-full">
            {!centerOffset && (
              <div
                ref={ purpleRef }
                className="absolute w-full h-full pointer-events-none opacity-0"
                style={{ zIndex: 10 }}
              />
            )}
            {centerOffset && (
              <motion.div
                ref={ purpleRef }
                className="absolute bg-purple-200 w-full h-full z-10"
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
              />
            )}
          </div>
          <div className="col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:col-span-full">
            <EnterAnimation className="bg-blue-200 w-full h-full" offset={[true, false]} centerAnimation={true} />
          </div>
          <div className="col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:hidden">
            <EnterAnimation className="bg-blue-200 w-full h-full" offset={[false, false]} centerAnimation={true} />
          </div>
        </div>
        <div className="col-span-4 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4">
          <div className="col-span-4 row-span-8 max-lg:col-span-full">
            <EnterAnimation className="bg-blue-200 w-full h-full" offset={[false, false]} centerAnimation={true}  />
          </div>
          <div className="col-span-4 row-span-1 max-lg:col-span-full max-lg:min-h-[5rem]">
            <EnterAnimation className="bg-blue-200 w-full h-full" />
          </div>
        </div>
      </div>
    </main>
  );
}