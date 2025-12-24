"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "center center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const smoothAbout = useSpring(aboutScroll, { stiffness: 100, damping: 30 });

  const maskPosition = useTransform(smoothProgress, [0, 0.15], ["0% 0%", "160% 0%"], { clamp: true });
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0], { clamp: true });

  
  const textContainerX = useTransform(smoothAbout, [0, 1], ["25%", "0%"]); 
  const textScale = useTransform(smoothAbout, [0, 1], [1.8, 1.2]);
  const textAlign = useTransform(smoothAbout, [0, 0.3], ["center", "left"]);

  const imageOpacity = useTransform(smoothAbout, [0, 1], [0, 1]);
  const imageX = useTransform(smoothAbout, [0, 1], [120, 0]); 
  const imageScale = useTransform(smoothAbout, [0, 1], [0.8, 1]);

  return (
    <main ref={containerRef} className="bg-[#e5e7eb] text-black w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="h-screen w-full flex items-center justify-center px-12 sticky top-0 z-0">
        <motion.h1 
          style={{ 
            WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
            WebkitMaskSize: "250% 100%",
            WebkitMaskPosition: maskPosition,
            opacity: heroOpacity,
          }}
          className="text-[10vw] font-semibold tracking-tighter leading-tight uppercase text-center whitespace-nowrap text-black w-full"
        >
          Imesh Chathura
        </motion.h1>
      </section>

      {/* 2. ABOUT SECTION */}
      <section ref={aboutRef} className="h-screen w-full flex items-center justify-center bg-white px-12 md:px-32 relative z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            style={{ 
              x: textContainerX, 
              scale: textScale,
              textAlign: textAlign as any,
              transformOrigin: "left center"
            }}
            className="w-full flex flex-col justify-center origin-left"
          >
            <h2 className="text-[10px] uppercase tracking-[0.5em] mb-4 text-slate-400 font-bold">About</h2>
            <div className="text-lg md:text-xl font-light tracking-tight leading-relaxed text-slate-800">
              <p>
                I am <span className="font-medium text-black">Imesh Chathura</span>, an ICT undergraduate at SEUSL researching <span className="italic font-normal">Artificial Intelligence</span> and <span className="italic font-normal">Decentralized Technology</span>.
              </p>
              <br />
              <p>
                I am passionate about exploring modern tech frontiers and building innovative solutions using intelligent systems and decentralized frameworks. I aim to stay at the forefront of the next digital revolution.
              </p>
            </div>
          </motion.div>

          {/* same speed*/}
          <motion.div 
            style={{ opacity: imageOpacity, x: imageX, scale: imageScale }}
            className="relative aspect-[4/5] w-full max-w-sm ml-auto bg-slate-100 border border-slate-200 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
          >
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 uppercase tracking-widest text-[10px]">
              Profile Image
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. EDUCATION SECTION */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 px-12 md:px-32 relative z-10">
        <h2 className="text-xs uppercase tracking-[0.5em] mb-16 text-slate-400 font-bold text-center">Education</h2>
        <div className="text-center text-black">
          <h3 className="text-3xl md:text-4xl font-semibold uppercase text-slate-900">South Eastern University</h3>
          <p className="text-lg md:text-xl text-slate-600 mt-4 tracking-widest font-light">BSc in Computer Science (ICT) • 2021—2025</p>
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-12 md:px-32 relative z-10">
        <h2 className="text-xs uppercase tracking-[0.5em] mb-16 text-slate-400 font-bold text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl text-black">
          {['Next.js', 'React', 'Tailwind', 'TypeScript', 'Node.js', 'Figma', 'AI/ML', 'Web3'].map((skill) => (
            <span key={skill} className="px-8 py-3 border border-black rounded-full text-lg font-semibold uppercase hover:bg-black hover:text-white transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* OTHER SECTIONS... */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-12 md:px-32 relative z-10">
        <h2 className="text-xs uppercase tracking-[0.5em] mb-10 text-slate-500 font-bold text-center">Contact</h2>
        <a href="mailto:hello@imesh.com" className="text-3xl md:text-[5vw] font-semibold tracking-tighter hover:text-blue-400 transition-all uppercase text-center break-all">
          hello@imesh.com
        </a>
      </section>

    </main>
  );
}