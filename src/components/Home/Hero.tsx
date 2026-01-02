"use client";

import { motion } from "framer-motion";
import NeuralBackground from "./NeuralBackground";
import { useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 100); // Typing speed
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

export default function Hero() {
    return (
        <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <NeuralBackground />

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-3xl text-accent-cyan font-mono mb-6 font-semibold">
                        <span className="opacity-70">&lt;</span>
                        <TypewriterText text="Hello World" delay={0.5} />
                        <span className="opacity-70"> /&gt;</span>
                    </h2>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-white leading-tight">
                        I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-neon glitch-effect font-extrabold">Yash Yelave</span>
                    </h1>

                    <div className="text-xl md:text-2xl text-text-muted mb-12 font-medium flex-col gap-4 text-center max-w-3xl mx-auto">
                        <div className="mb-4">
                            <span className="text-white">AI/ML Engineer • Full-Stack Developer • Creative Designer</span>
                        </div>
                        <p className="text-base md:text-lg leading-relaxed text-text-muted italic">
                            "Where Artificial Intelligence Meets Visual Storytelling"
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5, duration: 1 }}
                        className="flex flex-col md:flex-row gap-6 justify-center items-center"
                    >
                        <a
                            href="#projects"
                            className="px-10 py-4 rounded-full bg-accent-cyan text-bg-primary font-bold text-lg hover:bg-white hover:text-accent-cyan transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] hover:-translate-y-1"
                        >
                            Explore My Work
                        </a>
                        <a
                            href="#contact"
                            className="px-10 py-4 rounded-full bg-transparent border-2 border-text-muted text-text-muted font-bold text-lg hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            Let's Create Together
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-accent-cyan rounded-full animate-scroll" />
                </div>
            </motion.div>
        </section>
    );
}
