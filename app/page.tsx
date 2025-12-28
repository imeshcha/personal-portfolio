"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Code2, Diamond, Video } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll();

  // Digital Wave Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; base_y: number; speed: number; angle: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: (canvas.width / particleCount) * i,
          y: canvas.height / 2,
          base_y: canvas.height / 2,
          speed: 0.02 + Math.random() * 0.02,
          angle: i * 0.2
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(156, 163, 175, 0.5)"; 

      particles.forEach((p, i) => {
        p.angle += p.speed;
        p.y = p.base_y + Math.sin(p.angle) * 50; 

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (i > 0) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(156, 163, 175, 0.1)";
          ctx.moveTo(particles[i - 1].x, particles[i - 1].y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const { scrollYProgress: eduScroll } = useScroll({ target: educationRef, offset: ["start start", "end end"] });
  const { scrollYProgress: skillsScroll } = useScroll({ target: skillsRef, offset: ["start start", "end end"] });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const syncEduSpring = useSpring(eduScroll, { stiffness: 100, damping: 30 });
  const syncSkillsSpring = useSpring(skillsScroll, { stiffness: 100, damping: 30 });

  const maskPosition = useTransform(smoothProgress, [0, 0.15], ["0% 0%", "160% 0%"], { clamp: true });
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0], { clamp: true });

  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start 0.95", "start 0.3"] });
  const textScale = useTransform(aboutScroll, [0, 0.6], [1.8, 1.2], { clamp: true });
  const imageOpacity = useTransform(aboutScroll, [0, 0.6], [0, 1], { clamp: true });
  const imageX = useTransform(aboutScroll, [0, 0.6], [120, 0], { clamp: true }); 
  const textContainerX = useTransform(aboutScroll, [0, 0.6], ["25%", "0%"], { clamp: true });

  const unifiedXEdu = useTransform(syncEduSpring, [0, 1], ["0%", "-65%"]); 
  const unifiedXSkills = useTransform(syncSkillsSpring, [0, 1], ["0%", "-65%"]); 

  const educationData = [
    { primary: "Bachelor (Hons) in Information and Communication Technology", secondary: "Specializing in Networking & Cyber Security", third: "South Eastern University of Sri Lanka", period: "2024-Present" },
    { primary: "G.C.E. Advanced Level Examination", secondary: "Technology Stream", third: "St. Aloysius College, Ratnapura", period: "2022/23" },
    { primary: "G.C.E. Ordinary Level Examination", third: "St. Aloysius College, Ratnapura", period: "2019" }
  ];

  const skillsData = [
    { title: "Frontend Development", skill: "Next.js, React, Tailwind CSS", level: "Intermediate", desc: "Building high-performance, responsive web applications.", icon: <Code2 size={48} /> },
    { title: "Web3 Development", skill: "Blockchain, Smart Contract, Solidity", level: "Intermediate", desc: "Building decentralized apps, tokens, and secure smart contracts.", icon: <Diamond size={48} /> },
    { title: "Content Creation", skill: "Davinci Resolve, Photoshop, Illustrator, Canva", level: "Intermediate", desc: "Designing high-quality visuals and engaging video content.", icon: <Video size={48} /> } 
  ];

  return (
    <main ref={containerRef} className="bg-white text-black w-full overflow-x-hidden relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
        <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
        {[...Array(3)].map((_, i) => (
          <motion.div key={i} animate={{ scale: 2.8, opacity: [0, 0.45, 0] }} transition={{ duration: 12, repeat: Infinity, delay: i * 4 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[90vw] h-[120vw] md:h-[90vw] rounded-full border border-blue-500/30 blur-[3px]" />
        ))}
      </div>

      <section className="h-screen w-full flex items-center justify-start px-8 md:px-24 sticky top-0 z-10">
        <motion.h1 style={{ WebkitMaskPosition: maskPosition, opacity: heroOpacity }} className="text-6xl md:text-[12vw] font-bold tracking-tighter leading-[0.85] uppercase text-black mix-blend-difference">Imesh <br /> Chathura</motion.h1>
      </section>

      {/* SECTION 2: About (Responsive Text Fix) */}
      <section ref={aboutRef} className="min-h-screen w-full flex items-center justify-center relative z-20 px-4 py-20 mt-[10vh] md:mt-[20vh]">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center bg-white/90 backdrop-blur-3xl border border-black/5 p-6 md:p-20 rounded-[2rem] shadow-2xl overflow-hidden">
          <motion.div 
            className="w-full text-black" 
            style={{ 
              scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : textScale, 
              x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : textContainerX 
            }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.5em] mb-4 text-slate-500 font-bold">About</h2>
            {/* 🚀 ජංගම දුරකථන සඳහා text-lg ලෙස අකුරු කුඩා කළා */}
            <div className="text-lg md:text-xl font-light leading-relaxed text-black">
              <p>I am <span className="font-medium text-blue-600">Imesh Chathura</span>, an ICT undergraduate at SEUSL researching <span className="font-semibold">Artificial Intelligence</span> and <span className="font-semibold">Decentralized Technology</span>.</p>
              <br />
              <p className="text-slate-700 font-light">I am passionate about exploring modern tech frontiers and building innovative solutions.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: imageOpacity, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : imageX }} className="relative aspect-square md:aspect-[4/5] w-full max-w-sm bg-slate-200 rounded-2xl border border-black/5 mx-auto shadow-inner" />
        </div>
      </section>

      <section ref={educationRef} className="relative h-[250vh] z-20">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: unifiedXEdu }} className="flex items-center pl-6 md:pl-[10vw]">
            <div className="flex-shrink-0 w-[80vw] md:w-[50vw] mr-16 md:mr-[25vw]">
              <h2 className="text-5xl md:text-[8vw] font-bold uppercase text-black mix-blend-difference">Education <br /> Journey</h2>
            </div>
            <div className="flex gap-10 md:gap-16 pr-[62vw] md:pr-[15vw]">
              {educationData.map((edu, index) => (
                <div key={index} className="flex-shrink-0 w-[85vw] md:w-[65vw]">
                  <div className="h-[60vh] md:h-[65vh] w-full bg-white/30 backdrop-blur-2xl border border-white/40 p-10 md:p-16 rounded-[3rem] shadow-xl flex flex-col justify-center">
                    <span className="text-slate-700 font-mono text-xs md:text-sm uppercase tracking-widest mb-4 font-bold">{edu.period}</span>
                    <h3 className="text-2xl md:text-[3.8vw] font-bold text-black mb-3">{edu.primary}</h3>
                    <p className="text-lg md:text-[1.8vw] text-slate-900 font-medium mb-6">{edu.secondary}</p>
                    <p className="text-sm md:text-[1.4vw] text-slate-700 italic border-l-4 border-black pl-5">{edu.third}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={skillsRef} className="relative h-[250vh] z-20 bg-black">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: unifiedXSkills }} className="flex items-center pl-6 md:pl-[10vw]">
            <div className="flex-shrink-0 w-[80vw] md:w-[50vw] mr-16 md:mr-[25vw]">
              <h2 className="text-5xl md:text-[8vw] font-bold uppercase text-white mix-blend-difference">My <br /> Skills</h2>
            </div>
            <div className="flex gap-10 md:gap-16 pr-[62vw] md:pr-[15vw]">
              {skillsData.map((skill, index) => (
                <div key={index} className="flex-shrink-0 w-[85vw] md:w-[65vw]">
                  <div className="h-[60vh] md:h-[65vh] w-full bg-white/90 backdrop-blur-2xl p-10 md:p-16 rounded-[3.5rem] flex flex-col justify-center relative">
                    <div className="absolute top-8 right-10 text-slate-900 opacity-40 group-hover:opacity-100 transition-opacity duration-500">{skill.icon}</div>
                    <span className="text-slate-600 font-mono text-xs md:text-sm uppercase tracking-widest font-bold">{skill.level}</span>
                    <h3 className="text-2xl md:text-[4vw] font-bold mt-6 uppercase text-black">{skill.title}</h3>
                    <p className="text-lg md:text-[2.5vw] text-slate-800 mt-6 font-medium">{skill.skill}</p>
                    <p className="text-sm md:text-[1.6vw] text-slate-600 mt-8 italic max-w-2xl">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="h-screen w-full flex items-center justify-center bg-black relative z-30 px-6">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold uppercase tracking-widest text-white/80">Still loading...</h2>
          <p className="text-slate-500 mt-2 text-sm">Scroll more to reach me</p>
        </div>
      </section>

    </main>
  );
}