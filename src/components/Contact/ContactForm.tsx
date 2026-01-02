"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

export default function ContactForm() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        confetti({
            particleCount: 150,
            spread: 60,
            colors: ['#00D9FF', '#00FF94', '#ffffff']
        });

        // Reset form after delay
        setTimeout(() => {
            setIsSuccess(false);
            setFormState({ name: "", email: "", message: "" });
        }, 3000);
    };

    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden bg-bg-secondary">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,217,255,0.05),transparent_70%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Contact Info */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-neon">Talk</span>
                    </motion.h2>
                    <p className="text-xl text-text-muted mb-8">
                        Have an idea? Want to collaborate? Or just want to say hi?
                        Drop me a message and let's create something amazing together.
                    </p>

                    <div className="flex flex-col gap-6">
                        <a href="mailto:contact@yashyelave.com" className="flex items-center gap-4 text-white hover:text-accent-cyan transition-colors group">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail size={20} />
                            </div>
                            <span className="text-lg">contact@yashyelave.com</span>
                        </a>

                        <div className="flex gap-4 mt-4">
                            {[Github, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all text-white">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="glass p-8 rounded-3xl border border-glass-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group relative">
                            <input
                                type="text"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors peer"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-text-muted transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-cyan peer-valid:-top-2 peer-valid:text-xs">
                                Your Name
                            </label>
                        </div>

                        <div className="group relative">
                            <input
                                type="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors peer"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-text-muted transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-cyan peer-valid:-top-2 peer-valid:text-xs">
                                Your Email
                            </label>
                        </div>

                        <div className="group relative">
                            <textarea
                                required
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors peer resize-none"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-text-muted transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent-cyan peer-valid:-top-2 peer-valid:text-xs">
                                Your Message
                            </label>
                        </div>

                        <button
                            disabled={isSubmitting || isSuccess}
                            className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${isSuccess
                                    ? "bg-accent-neon text-bg-primary hover:bg-accent-neon/90"
                                    : "bg-gradient-to-r from-accent-cyan to-accent-neon text-bg-primary hover:opacity-90 hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:-translate-y-1"
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : isSuccess ? (
                                "Message Sent!"
                            ) : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
