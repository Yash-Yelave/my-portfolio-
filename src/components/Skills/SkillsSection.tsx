"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    Code2,
    Brain,
    Database,
    Terminal,
    Cpu,
    Layers,
    Globe,
    Palette
} from "lucide-react";

// Skill Data
const skills = [
    { name: "Languages", icon: <Globe size={32} />, items: ["TypeScript", "Python", "C++", "Java"] },
    { name: "Frontend", icon: <Layers size={32} />, items: ["Next.js", "React", "Three.js", "Tailwind (Expert)"] },
    { name: "AI / ML", icon: <Brain size={32} />, items: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"] },
    { name: "Backend", icon: <Database size={32} />, items: ["Node.js", "FastAPI", "PostgreSQL", "MongoDB"] },
    { name: "Tools", icon: <Terminal size={32} />, items: ["Docker", "Git", "AWS", "Linux"] },
    { name: "Design", icon: <Palette size={32} />, items: ["Figma", "Blender", "Adobe CC", "UI/UX"] },
];

function SkillCard({ skill, index }: { skill: any; index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative w-full h-64 rounded-2xl bg-bg-secondary border border-glass-border p-6 flex flex-col justify-between group perspective-1000 cursor-pointer"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="text-accent-cyan group-hover:text-accent-neon transition-colors duration-300"
            >
                {skill.icon}
            </div>

            <div style={{ transform: "translateZ(25px)" }}>
                <h3 className="text-2xl font-bold text-white mb-2">{skill.name}</h3>
                <div className="flex flex-wrap gap-2">
                    {skill.items.map((item: string) => (
                        <span key={item} className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/5 text-text-muted">{item}</span>
                    ))}
                </div>
            </div>

            {/* Hover Gradient Overlay */}
            <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ transform: "translateZ(0px)" }}
            />
        </motion.div>
    );
}

export default function SkillsSection() {
    return (
        <section id="skills" className="min-h-screen py-32 px-6 relative bg-bg-primary overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-neon/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-neon">Arsenal</span>
                    </h2>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        A curated set of tools and technologies I use to build independent, intelligent digital solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
