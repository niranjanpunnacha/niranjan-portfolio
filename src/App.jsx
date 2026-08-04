import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaRocket, FaBrain, FaLaptopCode } from 'react-icons/fa';

const navItems = ['About', 'Skills', 'Projects', 'Contact'];

const skillGroups = [
    {
        title: 'Programming',
        items: ['Python', 'Java', 'C', 'C++']
    },
    {
        title: 'AI',
        items: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'LLM Integration', 'NLP', 'Generative AI', 'Computer Vision']
    },
    {
        title: 'Backend',
        items: ['Flask', 'REST API', 'MongoDB', 'MySQL', 'SQLite']
    },
    {
        title: 'Tools',
        items: ['Git', 'GitHub', 'VS Code', 'Prompt Engineering', 'API Integration']
    }
];

const projects = [
    {
        title: 'AI Data-to-Database Automation',
        description: 'Turns natural language into structured JSON and stores it dynamically into MongoDB.',
        stack: ['Python', 'Flask', 'Gemini AI', 'MongoDB', 'NLP', 'REST API']
    },
    {
        title: 'AI Receptionist',
        description: 'An intelligent receptionist that understands user queries and responds autonomously.',
        stack: ['Python', 'LLM', 'Speech Recognition', 'Automation']
    },
    {
        title: 'Sign Language to Text',
        description: 'Real-time sign language recognition system converting gestures into readable text.',
        stack: ['Python', 'OpenCV', 'Machine Learning']
    },
    {
        title: 'Automated Trading Bot',
        description: 'A smart trading bot implementing moving average crossover and data analysis.',
        stack: ['Python', 'Backtesting', 'Data Analysis']
    }
];

const services = ['Machine Learning', 'Generative AI', 'Computer Vision', 'Backend Development', 'API Integration', 'Automation'];

const chatbotResponses = {
    default: 'I can help with who Niranjan is, his skills, projects, resume, or contact details.',
    intro: "Hi, I'm Niranjan Punacha — an AI & Machine Learning Engineer focused on building intelligent solutions.",
    skills: 'His core strengths include Python, ML, Deep Learning, NLP, Generative AI, Computer Vision, Flask, and API integration.',
    projects: 'He has worked on AI data automation, an AI receptionist, sign language recognition, and an automated trading bot.',
    resume: 'You can download his resume using the button in the hero section.',
    contact: 'Reach out via email at niranjanpunnacha143@gmail.com or through the contact section.'
};

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        { from: 'bot', text: chatbotResponses.intro }
    ]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        document.documentElement.classList.toggle('dark', darkMode);
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(height > 0 ? (scrollTop / height) * 100 : 0);
        };
        const onMove = (event) => setMousePosition({ x: event.clientX, y: event.clientY });
        window.addEventListener('scroll', onScroll);
        window.addEventListener('mousemove', onMove);
        onScroll();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMove);
            clearTimeout(timer);
        };
    }, [darkMode]);

    const handleChatSubmit = (e) => {
        e.preventDefault();
        const value = chatInput.trim().toLowerCase();
        if (!value) return;

        const reply = getReply(value);
        setMessages((prev) => [...prev, { from: 'user', text: chatInput }, { from: 'bot', text: reply }]);
        setChatInput('');
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setFormStatus('EmailJS is not configured yet. Please set your environment variables.');
            return;
        }

        emailjs.send(serviceId, templateId, formData, publicKey).then(
            () => {
                setFormStatus('Message sent successfully. Thanks for reaching out!');
                setFormData({ name: '', email: '', message: '' });
            },
            () => {
                setFormStatus('Something went wrong while sending the message.');
            }
        );
    };

    const getReply = (value) => {
        if (value.includes('skill')) return chatbotResponses.skills;
        if (value.includes('project')) return chatbotResponses.projects;
        if (value.includes('resume')) return chatbotResponses.resume;
        if (value.includes('contact')) return chatbotResponses.contact;
        if (value.includes('who') || value.includes('name')) return chatbotResponses.intro;
        return chatbotResponses.default;
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <AnimatePresence>{loading ? <LoadingScreen key="loading" /> : null}</AnimatePresence>

            <div className="min-h-screen text-slate-100 transition-colors duration-500">
                <div className="fixed left-0 top-0 z-[60] h-[3px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${scrollProgress}%` }} />
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,229,255,0.12),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(124,58,237,0.18),_transparent_30%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-30 blur-3xl">
                        <div className="absolute left-[-10%] top-0 h-72 w-72 rounded-full bg-cyan-400/30" />
                        <div className="absolute right-[-5%] top-20 h-80 w-80 rounded-full bg-violet-500/30" />
                    </div>
                </div>

                <div className="pointer-events-none fixed inset-0 -z-10">
                    <div className="absolute h-40 w-40 rounded-full bg-cyan-400/20 blur-[120px]" style={{ left: mousePosition.x - 160, top: mousePosition.y - 160 }} />
                </div>

                <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <a href="#home" className="text-lg font-semibold tracking-[0.3em] text-cyan-300">NIRANJAN</a>
                        <nav className="hidden items-center gap-6 md:flex">
                            {navItems.map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-slate-300 transition hover:text-cyan-300">
                                    {item}
                                </a>
                            ))}
                        </nav>
                        <button onClick={() => setDarkMode((prev) => !prev)} className="rounded-full border border-cyan-400/30 bg-white/10 px-3 py-2 text-sm text-cyan-200">
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>
                </header>

                <main id="home">
                    <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="glass relative w-full max-w-6xl overflow-hidden px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                            <div className="absolute inset-0 grid-pattern opacity-30" />
                            <div className="relative z-10">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                                    <FaBrain /> AI & Machine Learning Engineer
                                </div>
                                <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl">
                                    Building Intelligent <span className="text-gradient">AI Solutions</span>
                                </h1>
                                <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl">
                                    I’m Niranjan Punacha, a student and builder passionate about machine learning, generative AI, NLP, computer vision, and backend development.
                                </p>
                                <TypingText />
                                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                                    <a href="/resume.pdf" download className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105">
                                        <span className="inline-flex items-center gap-2"><FaDownload /> Download Resume</span>
                                    </a>
                                    <a href="#projects" className="rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition hover:scale-105">
                                        <span className="inline-flex items-center gap-2"><FaRocket /> View Projects</span>
                                    </a>
                                    <a href="#contact" className="rounded-full border border-violet-400/30 bg-violet-500/10 px-6 py-3 font-semibold text-violet-200 transition hover:scale-105">
                                        <span className="inline-flex items-center gap-2"><FaEnvelope /> Hire Me</span>
                                    </a>
                                </div>
                                <div className="mt-10 flex justify-center gap-4 text-xl text-cyan-200">
                                    <a href="https://linkedin.com/in/niranjanpunachaba" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-3 transition hover:text-white"><FaLinkedin /></a>
                                    <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-3 transition hover:text-white"><FaGithub /></a>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass p-8">
                                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About Me</p>
                                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Hello, I’m Niranjan Punacha.</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-300">
                                    Hi, I'm Niranjan Punacha, an AI & Machine Learning Engineering student passionate about Machine Learning, Generative AI, NLP, Computer Vision, and Backend Development.
                                </p>
                                <p className="mt-4 text-lg leading-8 text-slate-300">
                                    I enjoy building AI-powered applications that solve real-world problems and continuously learning new technologies. I’m looking for opportunities to contribute to innovative AI products.
                                </p>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass flex min-h-[320px] items-center justify-center p-8">
                                <div className="h-56 w-56 rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-transparent p-2">
                                    <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-6xl font-bold text-cyan-300">
                                        NP
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="mb-10 flex flex-col gap-3 text-center">
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Skills</p>
                            <h2 className="text-3xl font-semibold sm:text-4xl">Technologies I use to build intelligent products.</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {skillGroups.map((group, index) => (
                                <motion.div key={group.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass p-6">
                                    <h3 className="text-xl font-semibold text-cyan-200">{group.title}</h3>
                                    <div className="mt-5 flex flex-wrap gap-3">
                                        {group.items.map((item) => (
                                            <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">{item}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="mb-10 flex flex-col gap-3 text-center">
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Projects</p>
                            <h2 className="text-3xl font-semibold sm:text-4xl">Selected work that blends AI, automation, and real-world utility.</h2>
                        </div>
                        <div className="grid gap-6 lg:grid-cols-2">
                            {projects.map((project, index) => (
                                <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass group overflow-hidden p-6 transition hover:-translate-y-1">
                                    <div className="mb-5 h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-violet-500/15 to-transparent" />
                                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                                    <p className="mt-3 text-slate-300">{project.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.stack.map((tech) => (
                                            <span key={tech} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex gap-3">
                                        <a href="#" className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm">GitHub</a>
                                        <a href="#" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Live Demo</a>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="glass p-8">
                            <div className="mb-10 flex flex-col gap-3 text-center">
                                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Experience & Education</p>
                                <h2 className="text-3xl font-semibold sm:text-4xl">Building momentum through learning and real-world opportunities.</h2>
                            </div>
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div>
                                    <h3 className="text-xl font-semibold text-cyan-200">Education</h3>
                                    <div className="mt-4 space-y-4">
                                        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                                            <p className="font-semibold">Bachelor of Engineering</p>
                                            <p className="text-slate-400">Artificial Intelligence & Machine Learning</p>
                                            <p className="text-sm text-slate-500">Coorg Institute of Technology • Expected 2027</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-cyan-200">Experience</h3>
                                    <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-slate-300">
                                        Currently looking for internship opportunities in AI/ML/GenAI. Open to contributing to innovative teams.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="glass p-8">
                                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Services</p>
                                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What I can help build.</h2>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {services.map((service) => (
                                        <div key={service} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-slate-200">{service}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass p-8">
                                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Achievements</p>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    <Metric value="4+" label="Projects Completed" />
                                    <Metric value="6+" label="Certificates" />
                                    <Metric value="10+" label="Technologies Learned" />
                                    <Metric value="100+" label="GitHub Contributions" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="glass p-8">
                            <div className="mb-8 flex flex-col gap-3 text-center">
                                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Blog</p>
                                <h2 className="text-3xl font-semibold sm:text-4xl">Future AI articles and ideas.</h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                {['Building with LLMs', 'Computer Vision in Practice', 'From Prototype to Production'].map((post) => (
                                    <div key={post} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-slate-200">{post}</div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="glass p-8">
                                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</p>
                                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Let’s build something meaningful together.</h2>
                                <div className="mt-8 space-y-4 text-slate-300">
                                    <p><span className="font-semibold text-white">Email:</span> niranjanpunnacha143@gmail.com</p>
                                    <p><span className="font-semibold text-white">Location:</span> Kodagu, Karnataka, India</p>
                                    <p>
                                        <span className="font-semibold text-white">Phone:</span> +91 7795927396
                                    </p>
                                    <div className="flex gap-3 pt-4 text-xl text-cyan-200">
                                        <a href="https://linkedin.com/in/niranjanpunachaba" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-3"><FaLinkedin /></a>
                                        <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-3"><FaGithub /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="glass p-8">
                                <form onSubmit={handleContactSubmit} className="space-y-4">
                                    <input value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none ring-0" placeholder="Your name" required />
                                    <input type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none ring-0" placeholder="Your email" required />
                                    <textarea value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none ring-0" placeholder="Tell me about your idea" required />
                                    <button className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950">Send Message</button>
                                    {formStatus ? <p className="text-sm text-cyan-200">{formStatus}</p> : null}
                                </form>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400">
                    <p>© 2026 Niranjan Punacha. Designed with care and built for the future.</p>
                    <div className="mt-3 flex justify-center gap-4">
                        <a href="#home" className="text-cyan-300">Back to top</a>
                        <a href="https://linkedin.com/in/niranjanpunachaba" className="text-cyan-300">LinkedIn</a>
                    </div>
                </footer>

                <button onClick={() => setChatOpen((prev) => !prev)} className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 p-4 text-xl text-slate-950 shadow-glow">
                    <FaLaptopCode />
                </button>

                <AnimatePresence>
                    {chatOpen ? (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="fixed bottom-24 right-6 z-50 w-[320px] rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="font-semibold text-cyan-200">AI Assistant</p>
                                <button onClick={() => setChatOpen(false)} className="text-sm text-slate-400">✕</button>
                            </div>
                            <div className="mb-3 max-h-52 space-y-2 overflow-y-auto rounded-2xl bg-slate-900/60 p-3">
                                {messages.map((message, index) => (
                                    <div key={`${message.from}-${index}`} className={`rounded-2xl px-3 py-2 text-sm ${message.from === 'bot' ? 'bg-cyan-400/10 text-cyan-100' : 'ml-auto bg-white/10 text-slate-100'}`}>
                                        {message.text}
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleChatSubmit} className="flex gap-2">
                                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm outline-none" placeholder="Ask about Niranjan" />
                                <button className="rounded-full bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950">Go</button>
                            </form>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}

function TypingText() {
    const [text, setText] = useState('');
    const fullText = 'Specializing in AI products, automation, and scalable backend systems.';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index));
            index += 1;
            if (index > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return <p className="mt-4 text-lg text-cyan-200">{text}<span className="animate-pulse">|</span></p>;
}

function Metric({ value, label }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-center">
            <p className="text-3xl font-semibold text-cyan-200">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{label}</p>
        </div>
    );
}

function LoadingScreen() {
    return (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950">
            <div className="text-center">
                <div className="mb-4 h-2 w-40 overflow-hidden rounded-full bg-white/10">
                    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                </div>
                <p className="text-lg font-semibold text-cyan-200">Preparing experience...</p>
            </div>
        </motion.div>
    );
}

export default App;
