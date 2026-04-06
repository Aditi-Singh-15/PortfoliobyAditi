"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue
} from "framer-motion";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";

const heroStickers = [
  {
    id: "sticker-b-laptop",
    src: "/images/img2.png",
    position: { x: -360, y: -280 },
    rotation: "-6deg",
    width: 360
  },
  {
    id: "sticker-d-hairtuck",
    src: "/images/img4.png",
    position: { x: 130, y: -280 },
    rotation: "15deg",
    width: 360
  },
  {
    id: "sticker-a-hello",
    src: "/images/img1.png",
    position: { x: 110, y: 10 },
    rotation: "-4deg",
    width: 340
  },
  {
    id: "sticker-c-glasses",
    src: "/images/img3.png",
    position: { x: -450, y: -20 },
    rotation: "6deg",
    width: 380
  }
] as const;

const talkCard = {
  position: { x: 370, y: 20 },
  rotation: "8deg"
} as const;

const profileCard = {
  position: { x: -120, y: 120 },
  rotation: "1deg"
} as const;

const cardStacks = [
  {
    id: "projects",
    title: "Projects",
    tags: ["Web dev", "AI/ML", "Side Projects"],
    thumbnail: "/images/img4.png",
    position: { x: -620, y: -70 },
    rotation: "-3deg",
    stackCount: 4
  },
  {
    id: "blogging",
    title: "Blogging",
    tags: ["tech", "poetry", "random"],
    thumbnail: "/images/img1.png",
    position: { x: 420, y: -290 },
    rotation: "5deg",
    stackCount: 4
  }
] as const;

const extraStickers = [
  {
    id: "extra-6",
    src: "/images/img6.png",
    position: { x: -330, y: -50 },
    rotation: "-54deg",
    width: 220
  },
  {
    id: "extra-7",
    src: "/images/img7.png",
    position: { x: -340, y: -270 },
    rotation: "4deg",
    width: 200
  },
  // {
  //   id: "extra-8",
  //   src: "/images/img8.png",
  //   position: { x: 470, y: -120 },
  //   rotation: "-3deg",
  //   width: 280
  // },
  {
    id: "extra-9",
    src: "/images/img9.png",
    position: { x: -690, y: -170 },
    rotation: "140deg",
    width: 210
  },
  {
    id: "extra-10",
    src: "/images/img10.png",
    position: { x: 60, y: -220 },
    rotation: "-5deg",
    width: 220
  },
  {
    id: "extra-11",
    src: "/images/img11.png",
    position: { x: 150, y: -40 },
    rotation: "7deg",
    width: 200
  },
  {
    id: "extra-12",
    src: "/images/img12.png",
    position: { x: -450, y: -240 },
    rotation: "-170deg",
    width: 230
  }
] as const;

export default function CanvasBoard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bgPosition = useMotionTemplate`${x}px ${y}px`;
  const [isDragging, setIsDragging] = useState(false);
  const lastPoint = useRef({ x: 0, y: 0, time: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const xAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const yAnimation = useRef<ReturnType<typeof animate> | null>(null);

  const stopInertia = () => {
    xAnimation.current?.stop();
    yAnimation.current?.stop();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    stopInertia();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    lastPoint.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now()
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const now = performance.now();
    const dx = event.clientX - lastPoint.current.x;
    const dy = event.clientY - lastPoint.current.y;
    const dt = Math.max(now - lastPoint.current.time, 16);

    x.set(x.get() + dx);
    y.set(y.get() + dy);

    velocity.current = {
      x: (dx / dt) * 1000,
      y: (dy / dt) * 1000
    };

    lastPoint.current = { x: event.clientX, y: event.clientY, time: now };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    xAnimation.current = animate(x, x.get(), {
      type: "inertia",
      velocity: velocity.current.x,
      power: 0.6,
      timeConstant: 260
    });

    yAnimation.current = animate(y, y.get(), {
      type: "inertia",
      velocity: velocity.current.y,
      power: 0.6,
      timeConstant: 260
    });
  };

  const recenter = () => {
    stopInertia();
    animate(x, 0, { type: "spring", stiffness: 140, damping: 18 });
    animate(y, 0, { type: "spring", stiffness: 140, damping: 18 });
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <motion.div
        className={`absolute inset-0 touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div
          className="absolute inset-0 dot-grid"
          style={{ backgroundPosition: bgPosition }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div className="relative h-0 w-0" style={{ x, y }}>
            <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[620px] text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#6d6a63]">
                Aditi Singh - Portfolio
              </p>
              <h1 className="mt-3 font-[Fraunces,serif] text-[58px] text-[#191917]">
                Non-Linear{" "}
                <span className="bg-[#f0e36b] px-3 py-1">Creative</span>
              </h1>
              <p className="mt-4 text-[15px] text-[#6d6a63]">
                A playful, drag-to-explore canvas for my work and ideas.
              </p>
            </div>

            {heroStickers.map((sticker) => (
              <div
                key={sticker.id}
                className="absolute left-0 top-0 z-20"
                style={{
                  transform: `translate(${sticker.position.x}px, ${sticker.position.y}px) rotate(${sticker.rotation})`,
                  width: `${sticker.width}px`,
                  height: `${sticker.width}px`,
                  backgroundImage: `url(${sticker.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain"
                }}
              />
            ))}

            {extraStickers.map((sticker) => (
              <div
                key={sticker.id}
                className="absolute left-0 top-0 z-10"
                style={{
                  transform: `translate(${sticker.position.x}px, ${sticker.position.y}px) rotate(${sticker.rotation})`,
                  width: `${sticker.width}px`,
                  height: `${sticker.width}px`,
                  backgroundImage: `url(${sticker.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain"
                }}
              />
            ))}

            {cardStacks.map((stack) => (
              <div
                key={stack.id}
                className="absolute left-0 top-0 z-15 group"
                style={{
                  transform: `translate(${stack.position.x}px, ${stack.position.y}px) rotate(${stack.rotation})`
                }}
              >
                <div className="relative">
                  {Array.from({ length: stack.stackCount }).map((_, index) => {
                    const depth = stack.stackCount - 1 - index;
                    return (
                      <div
                        key={`${stack.id}-${index}`}
                        className="absolute left-0 top-0 h-[230px] w-[220px] rounded-[24px] bg-white shadow-sm transition-transform duration-300 group-hover:shadow-md"
                        style={{
                          transform: `translate(${depth * 5}px, ${depth * -4}px)`,
                          opacity: 0.9 - depth * 0.06,
                          border: "1px solid rgba(25, 25, 23, 0.06)"
                        }}
                      />
                    );
                  })}
                  <div className="relative h-[230px] w-[220px] rounded-[24px] bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                    <div className="h-[140px] w-full overflow-hidden rounded-[18px]">
                      <div
                        className="h-full w-full"
                        style={{
                          backgroundImage: `url(${stack.thumbnail})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat"
                        }}
                      />
                    </div>
                    <div className="mt-3 text-[14px] font-semibold text-[#191917]">
                      {stack.title}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {stack.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f2efe9] px-2 py-1 text-[10px] text-[#6d6a63]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="absolute left-0 top-0 z-10"
              style={{
                transform: `translate(${talkCard.position.x}px, ${talkCard.position.y}px) rotate(${talkCard.rotation})`
              }}
            >
              <div className="relative w-[260px] rounded-[28px] bg-[#f49ac2] px-5 py-4 text-white shadow-lg">
                <h3 className="text-[18px] font-semibold">Let&apos;s Talk</h3>
                <p className="mt-2 text-[12px] text-white/90">
                  Good work starts with good conversations.
                </p>
                <div className="mt-6 text-[12px] font-semibold underline underline-offset-4">
                  aditiworks7@gmail.com
                </div>
                <div className="mt-2 text-[11px] text-white/80">Say hello →</div>
              </div>
            </div>

            <div
              className="absolute left-0 top-0 z-10"
              style={{
                transform: `translate(${profileCard.position.x}px, ${profileCard.position.y}px) rotate(${profileCard.rotation})`
              }}
            >
              <div className="w-[280px] rounded-[28px] bg-[#6ee7a8] px-5 py-5 text-[#113321] shadow-lg">
                <h3 className="text-[18px] font-semibold">Hola, I&apos;m Aditi</h3>
                <div className="mt-3 h-[140px] w-full overflow-hidden rounded-[18px] bg-white/60">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: "url(/images/img5.jpeg)",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                  />
                </div>
                <div className="mt-3 text-[11px] font-medium text-[#1c3a2a]">
                  Get to know me →
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-6 top-6 flex flex-col gap-3">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] shadow-lg">
          <span className="font-[Fraunces,serif] text-[18px]">AditiSingh</span>
        </div>
      </div>

      <button
        type="button"
        onClick={recenter}
        className="fixed right-6 top-6 rounded-full bg-white px-4 py-2 text-[13px] shadow-lg"
      >
        Recenter
      </button>
    </section>
  );
}
