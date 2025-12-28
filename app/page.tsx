"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  
  const { scrollYProgress } = useScroll();

  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start 0.95", "start 0.3"] 
  });

  const { scrollYProgress: eduScroll } = useScroll({
    target: educationRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: skillsScroll } = useScroll({
    target: skillsRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const syncEduSpring = useSpring(eduScroll, { stiffness: 100, damping: 30, mass: 1 });
  const syncSkillsSpring = useSpring(skillsScroll, { stiffness: 100, damping: 30, mass: 1 });

  const maskPosition = useTransform(smoothProgress, [0, 0.15], ["0% 0%", "160% 0%"], { clamp: true });
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0], { clamp: true });

  const syncRange = [0, 0.6];
  const textScale = useTransform(aboutScroll, syncRange, [1.8, 1.2], { clamp: true });
  const textContainerX = useTransform(aboutScroll, syncRange, ["25%", "0%"], { clamp: true });
  const imageOpacity = useTransform(aboutScroll, syncRange, [0, 1], { clamp: true });
  const imageX = useTransform(aboutScroll, syncRange, [120, 0], { clamp: true }); 

  // 🚀 කාඩ්පත් ගණන වැඩි වූ නිසා unifiedX හි අගය -160% දක්වා වැඩි කළා (ගමන සම්පූර්ණ කිරීමට)
  const unifiedXEdu = useTransform(syncEduSpring, [0, 1], ["0%", "-72%"]); 
  const unifiedXSkills = useTransform(syncSkillsSpring, [0, 1], ["0%", "-70%"]); 

  // 🚀 කාඩ්පත් 3ක් සහිත Education Data
  const educationData = [
    { 
      primary: "Bachelor (Hons) in Information and Communication Technology", 
      secondary: "Specializing in Networking & Cyber Security", 
      third: "South Eastern University of Sri Lanka",
      period: "2024-Present" 
    },
    { 
      primary: "G.C.E. Advanced Level Examination", 
      secondary: "Technology Stream", 
      third: "St. Aloysius College, Ratnapura",
      period: "2022/23" 
    },
    { 
      primary: "G.C.E. Ordinary Level Examination", 
      third: "St. Aloysius College, Ratnapura",
      period: "2019" 
    }
  ];

  const skillsData = [
    { title: "Frontend Development", skill: "Next.js, React, Tailwind CSS", level: "Expert", desc: "Building high-performance, responsive web applications." },
    { title: "Backend Systems", skill: "Node.js, Python, PostgreSQL", level: "Advanced", desc: "Designing scalable APIs and managing databases." }
  ];

  return (
    <main ref={containerRef} className="bg-slate-200 text-black w-full overflow-x-hidden relative">
      
      <div className="fixed inset-0 z-[-2] pointer-events-none" style={{ backgroundImage: "url('/BgSky.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.85)' }} />
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="h-screen w-full flex items-center justify-start px-12 md:px-24 sticky top-0 z-0">
        <motion.h1 style={{ WebkitMaskPosition: maskPosition, opacity: heroOpacity }} className="text-[12vw] font-bold tracking-tighter leading-[0.85] uppercase text-left text-black w-full mix-blend-difference">Imesh <br /> Chathura</motion.h1>
      </section>

      <section ref={aboutRef} className="h-screen w-full flex items-center justify-center relative z-10 px-6 mt-[20vh]">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/40 backdrop-blur-2xl border border-white/50 p-12 md:p-20 rounded-[2rem] shadow-2xl">
          <motion.div style={{ x: textContainerX, scale: textScale, transformOrigin: "left center" }} className="w-full flex flex-col justify-center origin-left">
            <h2 className="text-[10px] uppercase tracking-[0.5em] mb-4 text-slate-500 font-bold">About</h2>
            <div className="text-lg md:text-xl font-light tracking-tight leading-relaxed text-slate-900">
              <p>I am <span className="font-medium text-black">Imesh Chathura</span>, an ICT undergraduate at SEUSL researching <span className="italic font-normal">Artificial Intelligence</span> and <span className="italic font-normal">Decentralized Technology</span>.</p>
              <br />
              <p>I am passionate about exploring modern tech frontiers and building innovative solutions.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: imageOpacity, x: imageX }} className="relative aspect-[4/5] w-full max-w-sm ml-auto bg-white/20 backdrop-blur-md border border-white/40 overflow-hidden rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* SECTION 3: Education Journey (Multiple Cards) */}
      <section ref={educationRef} className="relative h-[350vh] z-20">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: unifiedXEdu }} className="flex items-center pl-[10vw]">
            <div className="flex-shrink-0 w-[80vw] md:w-[60vw] mr-[30vw]">
              <h2 className="text-[9vw] font-bold uppercase tracking-tighter leading-[0.8] text-black mix-blend-difference">Education <br /> Journey</h2>
            </div>
            <div className="flex gap-12 pr-[10vw]">
              {educationData.map((edu, index) => (
                <div key={index} className="flex-shrink-0 w-[85vw] md:w-[75vw]">
                  <div className="h-[75vh] w-full bg-white/40 backdrop-blur-3xl border border-white/50 p-12 md:p-20 rounded-[3.5rem] shadow-2xl flex flex-col justify-center text-left">
                    <span className="text-slate-500 font-mono text-sm uppercase tracking-widest mb-6 block">{edu.period}</span>
                    <h3 className="text-4xl md:text-[4.2vw] font-bold text-black leading-tight mb-4">{edu.primary}</h3>
                    <p className="text-2xl md:text-[2.2vw] text-slate-800 font-medium mb-8">{edu.secondary}</p>
                    <p className="text-xl md:text-[1.8vw] text-slate-600 italic border-l-4 border-black pl-6">{edu.third}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: My Skills */}
      <section ref={skillsRef} className="relative h-[250vh] z-20 mt-[20vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: unifiedXSkills }} className="flex items-center pl-[10vw]">
            <div className="flex-shrink-0 w-[80vw] md:w-[60vw] mr-[30vw]">
              <h2 className="text-[9vw] font-bold uppercase tracking-tighter leading-[0.8] text-black mix-blend-difference">My <br /> Skills</h2>
            </div>
            <div className="flex gap-12 pr-[10vw]">
              {skillsData.map((skill, index) => (
                <div key={index} className="flex-shrink-0 w-[75vw]">
                  <div className="h-[75vh] w-full bg-slate-900/10 backdrop-blur-3xl border border-black/10 p-12 md:p-20 rounded-[3.5rem] shadow-2xl flex flex-col justify-center">
                    <span className="text-slate-500 font-mono text-sm uppercase tracking-widest">{skill.level}</span>
                    <h3 className="text-4xl md:text-[6vw] font-bold mt-8 uppercase text-black leading-tight">{skill.title}</h3>
                    <p className="text-2xl md:text-3xl text-slate-800 mt-8 font-light">{skill.skill}</p>
                    <p className="text-slate-600 text-lg mt-10 italic leading-relaxed max-w-4xl">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}