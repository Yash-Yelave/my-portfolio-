"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

// Mock Project Data
const projects = [
    {
        id: 1,
        title: "UrbanFlow AI",
        desc: "Intelligent Traffic Management System. AI-Powered Traffic Optimization for Smarter Cities. Features real-time vehicle detection (94% accuracy) and adaptive signal control reducing wait times by 40%.",
        tech: ["Python", "YOLOv8", "OpenCV", "Flask", "ESP32"],
        image: "/project1.jpg",
        github: "#",
        demo: "#",
        size: "large"
    },
    {
        id: 2,
        title: "Project Recon",
        desc: "High-Fidelity First-Person Shooter built on Unreal Engine 5. Features realistic physics, advanced AI behavior trees, and destructible environments with Chaos Physics.",
        tech: ["Unreal Engine 5", "C++", "Blueprints", "Blender"],
        image: "/project2.jpg",
        github: "#",
        demo: "#",
        size: "large"
    },
    {
        id: 3,
        title: "CuraConnect",
        desc: "Serverless Clinic Manager. Zero-infrastructure patient registration system using Google Sheets/Apps Script. Serving 30-50 patients daily with zero downtime.",
        tech: ["Google Apps Script", "Google Sheets", "Tailwind CSS"],
        image: "/project3.jpg",
        github: "#",
        demo: "#",
        size: "small"
    },
    {
        id: 4,
        title: "SmartAttend",
        desc: "AI-Powered Attendance Tracking. Facial recognition system for automated classroom management. Processes group photos to mark attendance with 95%+ accuracy.",
        tech: ["Python", "OpenCV", "Face_recognition", "SQLite"],
        image: "/project4.jpg",
        github: "#",
        demo: "#",
        size: "small"
    },
    {
        id: 5,
        title: "MediFlow",
        desc: "Healthcare Administration Platform. Comprehensive desktop application for managing patient records, appointments, and billing with role-based security.",
        tech: ["Java", "Swing", "MySQL", "JDBC"],
        image: "/project5.jpg",
        github: "#",
        demo: "#",
        size: "small"
    },
];

function ProjectCard({ project, index }: { project: any; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group rounded-3xl overflow-hidden glass border-glass-border h-[450px] ${project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}
        >
            {/* Background Image Parallax */}
            <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
                {/* Using a gradient placeholder since we don't have actual images yet */}
                <div className={`w-full h-full bg-gradient-to-br ${index % 2 === 0 ? 'from-indigo-900 to-purple-900' : 'from-emerald-900 to-teal-900'} opacity-50`} />
            </motion.div>
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                <p className="text-text-muted mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-3">{project.desc}</p>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {project.tech.map((t: string) => (
                        <span key={t} className="text-xs font-bold px-3 py-1 rounded-full border border-accent-cyan text-accent-cyan bg-accent-cyan/10">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectGallery() {
    return (
        <section id="projects" className="py-32 px-6 bg-bg-primary">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon to-accent-cyan">Works</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-dense">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
