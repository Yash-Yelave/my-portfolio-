"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // We have 3 panels of 100vw width. To show the last one, we translate 2/3 of the way (-66.6%).
    // Adding a slight buffer for gaps.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

    return (
        <section ref={targetRef} id="about" className="relative h-[300vh] bg-bg-secondary">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">

                    {/* Intro Panel */}
                    <div className="relative h-[80vh] w-screen flex flex-col items-center justify-center px-8 shrink-0">
                        <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-8">
                            Who Am I?
                        </h2>
                        <p className="text-xl md:text-2xl text-text-muted max-w-2xl text-center">
                            Scroll right to discover my journey through the digital realm.
                        </p>
                    </div>

                    {/* Profile & Story Panel */}
                    <div className="relative h-[80vh] w-screen flex items-center justify-center px-8 shrink-0 bg-bg-primary/30 rounded-3xl border border-glass-border backdrop-blur-sm mx-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
                            {/* Morphing Blob Image wrapper */}
                            {/* Morphing Blob Image wrapper */}
                            <div className="relative w-full aspect-square max-w-md mx-auto flex items-end justify-center">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan to-accent-neon rounded-full blur-2xl opacity-20 animate-pulse" />

                                {/* Morphing Background Blob */}
                                <div className="absolute bottom-0 w-full h-[90%] bg-white/5 border-2 border-white/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-morph shadow-2xl backdrop-blur-sm z-0"></div>

                                {/* Pop-out Image */}
                                <div className="relative z-10 w-full h-[110%] -mb-4 transition-transform duration-500 hover:scale-105">
                                    <Image
                                        src="/my-image.png"
                                        alt="Yash Yelave"
                                        fill
                                        className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-4xl font-bold text-white">The Person Behind the Code</h3>
                                <div className="space-y-6">
                                    <h3 className="text-4xl font-bold text-white">Engineer by Training, Creator by Passion</h3>
                                    <p className="text-lg text-text-muted leading-relaxed">
                                        I'm Yash Yelave, an AI/ML Engineer and Creative Technologist based in Shirpur, Maharashtra.
                                        Currently pursuing my Bachelor's in Artificial Intelligence and Machine Learning while working
                                        as a Graphics Designer at SPWEBDEVS. Most people choose between logic and art—I chose both.
                                    </p>
                                    <p className="text-lg text-text-muted leading-relaxed">
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
                    <div className="relative h-[80vh] w-screen flex flex-col items-center justify-center px-8 shrink-0">
                        <h3 className="text-5xl font-bold mb-16 text-accent-neon">Education & Journey</h3>

                        <div className="flex gap-8 relative">
                            {/* Timeline Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0" />

                            {[
                                { year: "2021", title: "Diploma CSE", desc: "R.C. Patel Polytechnic (Completed)" },
                                { year: "2022", title: "Started B.Tech", desc: "AI & ML at R.C. Patel Institute" },
                                { year: "2024", title: "Deep Learning", desc: "Specializing in Computer Vision & NLP" },
                                { year: "2026", title: "Graduation", desc: "Future AI Architect" },
                            ].map((item, i) => (
                                <div key={i} className="relative z-10 w-64 p-6 glass rounded-xl hover:scale-105 transition-transform duration-300 group">
                                    <div className="text-4xl font-bold text-accent-cyan mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{item.year}</div>
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-text-muted">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
