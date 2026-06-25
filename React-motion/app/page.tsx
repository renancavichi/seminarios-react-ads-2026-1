"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function MotionDemoPage() {
  const [show, setShow] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll();

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* BARRA DE SCROLL */}
      <motion.div
        style={{ width }}
        className="fixed top-0 left-0 h-1 bg-yellow-400 z-50 shadow-[0_0_15px_rgba(250,204,21,0.8)]"
      />

      <div className="max-w-[1700px] mx-auto p-8">
        <div className="mb-14">
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {/* HOVER */}
          <Card title="1. whileHover">
            <div className="h-40 flex items-center justify-center">
              <motion.div
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className="w-24 h-24 bg-yellow-400 rounded-2xl cursor-pointer shadow-[0_0_30px_rgba(250,204,21,0.45)]"
              />
            </div>

            <Code>
{`<motion.div
  whileHover={{
    scale: 1.2,
    rotate: 10
  }}
/>`}
            </Code>
          </Card>

          {/* TAP */}
          <Card title="2. whileTap">
            <div className="h-40 flex items-center justify-center">
              <motion.button
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
                className="w-24 h-24 bg-yellow-400 rounded-2xl text-black font-black tracking-wider shadow-[0_0_30px_rgba(250,204,21,0.45)]"
              >
                TAP
              </motion.button>
            </div>

            <Code>
{`<motion.button
  whileTap={{
    scale: 0.8
  }}
/>`}
            </Code>
          </Card>

          {/* ANIMATE */}
          <Card title="3. animate">
            <div className="h-40 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 border-2 border-yellow-400 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.2)_inset]"
              />
            </div>

            <Code>
{`<motion.div
  animate={{
    y: [0, -20, 0]
  }}
    transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
/>`}
            </Code>
          </Card>

          {/* INITIAL + ANIMATE */}
          <Card title="4. initial + animate">
            <div className="h-40 flex items-center justify-center overflow-hidden">
              <motion.div
                initial={{
                  x: -200,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="w-24 h-24 bg-yellow-400 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,0.45)]"
              />
            </div>

            <Code>
{`initial={{ x: -200 }}
animate={{ x: 0 }}`}
            </Code>
          </Card>

          {/* ANIMATE PRESENCE */}
          <Card title="5. AnimatePresence">
            <div
              className="h-40 flex items-center justify-center cursor-pointer"
              onClick={() => setShow(!show)}
            >
              <AnimatePresence mode="wait">
                {show ? (
                  <motion.div
                    key="box"
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      rotate: 180,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center text-black font-black shadow-[0_0_30px_rgba(250,204,21,0.45)]"
                  >
                    EXIT
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold"
                  >
                    voltar
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <Code>
{`<AnimatePresence>
  {show && (
    <motion.div
      exit={{ scale: 0 }}
    />
  )}
</AnimatePresence>`}
            </Code>
          </Card>

          {/* LAYOUT */}
          <Card title="6. layout">
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className={`h-40 bg-[#111] rounded-2xl border border-yellow-400/10 flex items-center px-6 cursor-pointer transition-all ${
                isExpanded ? "justify-end" : "justify-start"
              }`}
            >
              <motion.div
                layout
                className="w-20 h-20 rounded-full bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.45)]"
              />
            </div>

            <Code>
{`<motion.div
  layout
/>`}
            </Code>
          </Card>

          {/* WHILE IN VIEW */}
          <Card title="7. whileInView">
            <div className="h-40 flex items-center justify-center overflow-hidden">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                }}
                className="w-24 h-24 bg-yellow-400 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,0.45)]"
              />
            </div>

            <Code>
{`whileInView={{
  opacity: 1
}}`}
            </Code>
          </Card>

          {/* ROTATE */}
          <Card title="8. rotate">
            <div className="h-40 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
                className="w-24 h-24 border-4 border-yellow-400 border-t-transparent rounded-full"
              />
            </div>

            <Code>
{`animate={{
  rotate: 360
}}`}
            </Code>
          </Card>

          {/* SCALE */}
          <Card title="9. scale">
            <div className="h-40 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="w-24 h-24 bg-yellow-400 rounded-full shadow-[0_0_30px_rgba(250,204,21,0.45)]"
              />
            </div>

            <Code>
{`animate={{
  scale: [1, 1.3, 1]
}}`}
            </Code>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="mt-20 border-t border-yellow-400/10 pt-8">
          <p className="text-zinc-500 text-sm">
            Vitor R. 
          </p>
        </div>
      </div>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-[#0a0a0a] border border-yellow-400/10 rounded-3xl p-6 shadow-[0_0_25px_rgba(250,204,21,0.04)]"
    >
      <h2 className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black mb-8">
        {title}
      </h2>

      {children}
    </motion.div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-8 bg-black border border-yellow-400/10 rounded-2xl p-4 overflow-x-auto text-[11px] text-yellow-400/80 leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}