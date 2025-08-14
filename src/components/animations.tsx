import * as motion from "motion/react-client";
import { useRef, useLayoutEffect, useState, useMemo } from "react";

type EnterAnimationProps = {
    className: string;
    offset?: boolean[];
    centerAnimation?: boolean;
};

export function EnterAnimation({ className, offset = [false, false], centerAnimation = false }: EnterAnimationProps) {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [finalOffset, setFinalOffset] = useState<[number, number] | null>(null);

    const memoOffset = useMemo(() => offset, [offset[0], offset[1]]);

    useLayoutEffect(() => {
        if (!centerAnimation || !elementRef.current) {
            if (finalOffset === null) setFinalOffset([0, 0]);
            return;
        }

        requestAnimationFrame(() => {
            const rect = elementRef.current!.getBoundingClientRect();
            const viewportCenterX = window.innerWidth / 2;
            const viewportCenterY = window.innerHeight / 2;
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;

            const newOffset: [number, number] = [
                !memoOffset[0] ? viewportCenterX - elementCenterX : 0,
                !memoOffset[1] ? viewportCenterY - elementCenterY : 0
            ];

            setFinalOffset((prev) =>
                prev?.[0] === newOffset[0] && prev?.[1] === newOffset[1]
                    ? prev
                    : newOffset
            );
        });
    }, [centerAnimation, memoOffset, finalOffset]);

    if (finalOffset === null) {
        return <div ref={elementRef} className={className} style={{ borderRadius: "16px", width: "100%", height: "100%" }} />;
    }

    return (
        <motion.div
            ref={elementRef}
            className={className}
            initial={{
                opacity: 0,
                scale: 0,
                x: finalOffset[0],
                y: finalOffset[1]
            }}
            animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0
            }}
            transition={{
                delay: 1.7,
                type: "spring",
                duration: 0.45,
                bounce: 0
            }}
            style={{
                borderRadius: "16px",
                width: "100%",
                height: "100%"
            }}
        />
    );
}