"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section
            ref={targetRef}
            id="about"
            className={`relative bg-bg-secondary ${isMobile ? 'h-auto' : 'h-[300vh]'}`}
        >
            <div className={`${isMobile ? 'relative' : 'sticky top-0'} flex ${isMobile ? 'flex-col' : 'h-screen items-center overflow-hidden'}`}>
                <motion.div
                    style={{ x: isMobile ? "0%" : x }}
                    className={`flex ${isMobile ? 'flex-col space-y-20 pb-20' : 'gap-4'}`}
                >

                    {/* Intro Panel */}
                    <div className={`relative flex flex-col items-center justify-center px-8 shrink-0 ${isMobile ? 'w-full py-20 min-h-[50vh]' : 'h-[80vh] w-screen'}`}>
                        <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-8 text-center">
                            Who Am I?
                        </h2>
                        {!isMobile && (
                            <p className="text-xl md:text-2xl text-text-muted max-w-2xl text-center">
                                Scroll right to discover my journey through the digital realm.
                            </p>
                        )}
                        {isMobile && (
                            <p className="text-lg text-text-muted max-w-xl text-center">
                                A journey from curiosity to creation.
                            </p>
                        )}
                    </div>

                    {/* Profile & Story Panel */}
                    <div className={`${isMobile ? 'w-full px-6' : 'relative h-[80vh] w-screen flex items-center justify-center px-8 shrink-0 mx-4'}`}>
                        <div className={`bg-bg-primary/30 rounded-3xl border border-glass-border backdrop-blur-sm ${isMobile ? 'p-6' : 'p-12'} grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full mx-auto`}>

                            {/* Morphing Blob Image wrapper */}
                            <div className="relative w-full aspect-square max-w-xs md:max-w-md mx-auto flex items-end justify-center perspective-1000">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan to-accent-neon rounded-full blur-2xl opacity-20 animate-pulse" />

                                {/* Morphing Background Blob */}
                                <div className="absolute bottom-0 w-full h-[90%] bg-white/5 border-2 border-white/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-morph shadow-2xl backdrop-blur-sm z-0"></div>

                                {/* Pop-out Image */}
                                <div className="relative z-10 w-full h-[110%] -mb-4">
                                    <Image
                                        src="/my-image.png"
                                        alt="Yash Yelave"
                                        fill
                                        className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="space-y-6 text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-bold text-white">The Person Behind the Code</h3>
                                <div className="space-y-6">
                                    <h4 className="text-xl md:text-2xl font-bold text-accent-cyan">Engineer by Training, Creator by Passion</h4>
                                    <p className="text-base md:text-lg text-text-muted leading-relaxed">
                                        I'm Yash Yelave, an AI/ML Engineer and Creative Technologist based in Shirpur, Maharashtra.
                                        Currently pursuing my Bachelor's in Artificial Intelligence and Machine Learning while working
                                        as a Graphics Designer at SPWEBDEVS. Most people choose between logic and art—I chose both.
                                    </p>
                                    <p className="text-base md:text-lg text-text-muted leading-relaxed">
                                        My journey began with curiosity about how games worked, leading me to programming during my
                                        Computer Engineering diploma. But I quickly realized great technology needs great design. While
                                        others chose between development and design, I was building Unreal Engine games, training YOLO
                                        models, creating brand identities, and developing medical management systems—often simultaneously.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Education Timeline Panel */}
                    <div className={`relative flex flex-col items-center justify-center px-8 shrink-0 ${isMobile ? 'w-full py-20 gap-8' : 'h-[80vh] w-screen'}`}>
                        <h3 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-accent-neon text-center">Education & Journey</h3>

                        <div className={`flex ${isMobile ? 'flex-col w-full max-w-md gap-6' : 'gap-8 relative'}`}>
                            {/* Timeline Line (Desktop only) */}
                            {!isMobile && <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0" />}

                            {[
                                { year: "2021", title: "Diploma CSE", desc: "R.C. Patel Polytechnic (Completed)" },
                                { year: "2022", title: "Started B.Tech", desc: "AI & ML at R.C. Patel Institute" },
                                { year: "2024", title: "Deep Learning", desc: "Specializing in Computer Vision & NLP" },
                                { year: "2026", title: "Graduation", desc: "Future AI Architect" },
                            ].map((item, i) => (
                                <div key={i} className={`relative z-10 glass rounded-xl transition-transform duration-300 group ${isMobile ? 'flex flex-row items-center gap-4 p-4 border border-white/5' : 'w-64 p-6 hover:scale-105'}`}>
                                    <div className={`font-bold text-accent-cyan opacity-50 group-hover:opacity-100 transition-opacity ${isMobile ? 'text-2xl min-w-[60px]' : 'text-4xl mb-2'}`}>{item.year}</div>
                                    <div className={isMobile ? 'text-left' : ''}>
                                        <h4 className={`font-bold text-white mb-1 ${isMobile ? 'text-lg' : 'text-xl'}`}>{item.title}</h4>
                                        <p className="text-sm text-text-muted">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
