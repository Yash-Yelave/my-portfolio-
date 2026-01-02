"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
    {
        id: 1,
        role: "AI/ML Engineer",
        company: "Tech Innovations Inc.",
        period: "2024 - Present",
        desc: "Developing advanced computer vision models for autonomous systems. Optimizing inference pipelines for edge devices.",
        type: "work",
    },
    {
        id: 2,
        role: "Graphics Designer Intern",
        company: "Creative Studio",
        period: "2023 - 2024",
        desc: "Designed UI/UX for mobile applications and marketing assets. Bridged the gap between design and frontend implementation.",
        type: "internship",
    },
    {
        id: 3,
        role: "Full Stack Developer",
        company: "Freelance",
        period: "2022 - 2023",
        desc: "Built custom web applications using Next.js and Node.js. Delivered robust e-commerce solutions and portfolio sites.",
        type: "freelance",
    },
    {
        id: 4,
        role: "Computer Science Degree",
        company: "University of Technology",
        period: "2020 - 2024",
        desc: "Specialized in Artificial Intelligence and Data Science. Graduated with honors.",
        type: "education",
    },
];

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" ref={containerRef} className="py-32 bg-bg-secondary relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        Journey <span className="text-accent-cyan">So Far</span>
                    </h2>
                </motion.div>

                {/* Vertical Line */}
                <div className="absolute left-6 md:left-1/2 top-32 bottom-0 w-1 bg-white/5 -translate-x-1/2">
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-cyan to-accent-neon"
                    />
                </div>

                <div className="space-y-24">
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                            {/* Date/Period Block */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`w-full md:w-5/12 text-center md:text-${index % 2 === 0 ? 'right' : 'left'}`}
                            >
                                <span className="text-8xl font-bold text-white/5 absolute -z-10 select-none scale-150 translate-y-4">{exp.period.split(' ')[0]}</span>
                                <div className="text-accent-cyan font-mono mb-2 text-lg font-bold">{exp.period}</div>
                                <h3 className="text-3xl font-bold text-white mb-2">{exp.role}</h3>
                                <div className="text-xl text-text-muted font-medium">{exp.company}</div>
                            </motion.div>

                            {/* Timeline Node */}
                            <div className="relative z-10 w-16 h-16 rounded-full glass flex items-center justify-center border-2 border-accent-cyan box-content shadow-[0_0_20px_rgba(0,217,255,0.2)] bg-bg-primary">
                                {exp.type === 'education' ? <GraduationCap size={28} className="text-accent-neon" /> : <Briefcase size={28} className="text-accent-cyan" />}
                                <div className="absolute inset-0 bg-accent-cyan rounded-full animate-ping opacity-20" />
                            </div>

                            {/* Content Card */}
                            <motion.div
                                initial={{ opacity: 0, rotateY: 90 }}
                                whileInView={{ opacity: 1, rotateY: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className="w-full md:w-5/12"
                                style={{ perspective: 1000 }}
                            >
                                <div className="glass p-8 rounded-3xl border-l-4 border-l-accent-neon bg-white/5 hover:bg-white/10 transition-colors duration-300 shadow-xl">
                                    <p className="text-lg text-text-main leading-relaxed">{exp.desc}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
