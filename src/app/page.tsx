'use client'
import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// --- TYPES ---

type Theme = "light" | "dark";

interface Contact {
    email: string;
    phone: string;
    location: string;
}

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

interface PortfolioData {
    name: string;
    title: string;
    summary: string;
    contact: Contact;
    skills: Record<string, string[]>;
    experience: Experience[];
}

// --- THEME & DATA ---

const themes: Record<
    Theme,
    {
        bg: string;
        text: string;
        cardBg: string;
        cardText: string;
        headerBg: string;
        tagBg: string;
        tagText: string;
        activeTab: string;
        inactiveTab: string;
    }
> = {
    light: {
        bg: "bg-slate-100",
        text: "text-slate-800",
        cardBg: "bg-white",
        cardText: "text-slate-600",
        headerBg: "bg-white/80",
        tagBg: "bg-slate-200",
        tagText: "text-slate-800",
        activeTab: "bg-indigo-600 text-white",
        inactiveTab: "bg-slate-200 text-slate-700",
    },
    dark: {
        bg: "bg-gray-900",
        text: "text-slate-200",
        cardBg: "bg-gray-800",
        cardText: "text-slate-400",
        headerBg: "bg-gray-900/80",
        tagBg: "bg-gray-700",
        tagText: "text-slate-200",
        activeTab: "bg-indigo-500 text-white",
        inactiveTab: "bg-gray-700 text-slate-300",
    },
};

const portfolioData: PortfolioData = {
    name: "Mehul Saxena",
    title: "Software Engineer | Full-Stack & Mobile",
    summary:
        "Software Engineer with 4+ years of experience in full-stack web and mobile development, specializing in JavaScript (ES6+), React.js, Next.js, Node.js, and React Native. Adept at debugging, solving complex challenges, and leveraging AI-powered tools to accelerate development.",
    contact: {
        email: "mehulsaxena45@gmail.com",
        phone: "7380526501",
        location: "Bangalore",
    },
    skills: {
        Frontend: ["React.js", "Next.js", "Redux", "Context API", "HTML5", "CSS3", "Video.js"],
        Mobile: ["React Native", "iOS & Android Apps", "Responsive Layouts"],
        Backend: ["Node.js", "Express.js", "REST APIs", "Microservices", "JWT", "OAuth"],
        Databases: ["MySQL", "PostgreSQL", "MongoDB", "Query Optimization"],
        "Cloud & DevOps": ["AWS", "Azure", "GCP", "CI/CD", ],
        Languages: ["JavaScript (ES6+)", "C++"],
    },
    experience: [
        {
            company: "Innodeed Systems",
            role: "Software Engineer",
            duration: "Jan 2024 - Present",
            description:
                "I developed Medilink, a doctor consultation platform leveraging React.js, Next.js, Node.js, WebSockets, MongoDB, and AWS to enable secure real-time video and chat consultations. I engineered a low-latency chat system with Node.js WebSockets and React.js using a scalable event-driven architecture, and implemented multi-tenant architecture to support seamless onboarding of multiple organizations with strict data isolation. Additionally, I contributed to a finance tracking system by optimizing PostgreSQL queries and introducing role-based access control for secure operations. I also built CampaignOne, a SaaS platform for multi-channel marketing campaigns (SMS, WhatsApp, Email), designed with microservices, Redis queues, and AWS SES/SNS, ensuring scalability, high availability, and reliable campaign execution.",
        },
        {
            company: "Qburst",
            role: "Software Engineer",
            duration: "July 2023 - Dec 2023",
            description:
                "I developed an in-house website builder (similar to WordPress) using React.js, Redux, Node.js, and PostgreSQL, featuring a drag-and-drop UI and modular components for seamless website creation. I integrated template management to accelerate development cycles and improve client productivity. On the frontend, I optimized performance through lazy loading, caching, and code splitting, reducing load times by ~40%. On the backend, I built scalable APIs with Express.js and deployed them on AWS to efficiently handle multi-client traffic with reliability and scalability.",
        },
        {
            company: "Arena Investors LLP",
            role: "Software Engineer",
            duration: "Aug 2022 - July 2023",
            description:
                "I developed fund transfer workflows for secure and high-speed transactions using Node.js, Express.js, and PostgreSQL. To ensure security and compliance, I implemented an access control system with RBAC and JWT authentication. I further optimized PostgreSQL queries and transaction management, enabling the system to scale seamlessly to handle millions of dollars in daily transactions. Additionally, I deployed the applications on Azure Cloud, incorporating monitoring and logging to ensure reliability and operational efficiency.",
        },
        {
            company: "Baaz.live",
            role: "Software Engineer",
            duration: "March 2022 - Aug 2022",
            description:
                "I developed a custom video player for the reels section using Video.js and React.js, optimized for low-latency streaming and seamless playback. I implemented real-time product interactions within live video streams, which increased user engagement by 25%. Additionally, I contributed to the development of cross-platform mobile apps (iOS & Android) using React Native, ensuring smooth performance and consistency across devices. For real-time scalability, I integrated WebSockets and Redis Pub/Sub to handle high-volume event-driven interactions efficiently.",
        },
        {
            company: "Moshi Moshi Media",
            role: "Software Engineer",
            duration: "Aug 2021 - March 2022",
            description:
                "I developed Udyogini (eCommerce) and KUSAD (EdTech) platforms using React.js, Redux, Node.js, MongoDB, and AWS, delivering scalable and user-friendly digital solutions. I also built the MOXD platform, streamlining delivery agent workflows with real-time tracking via Google Maps APIs and scaling the system to support thousands of active users. In addition, I designed and implemented scalable REST APIs and an analytics dashboard for tracking user behavior and insights. I also contributed to publishing mobile applications, ensuring seamless accessibility across devices.",
        },
        {
            company: "Electrovese Solution",
            role: "Software Engineer",
            duration: "Sept 2020 - August 2021",
            description:
                "I developed eCommerce and travel booking platforms using React.js, Node.js, and MongoDB, including GUBB World (Beauty & Healthcare) and Let’s Tuxi (Tourism Platform). For GUBB World, I designed a comprehensive product catalog, while for Let’s Tuxi, I implemented a dynamic booking system with Razorpay and PayPal integrations. To enhance performance, I optimized APIs and improved frontend efficiency using Next.js SSR for faster response times. I also built cross-platform React Native apps (iOS & Android) for both platforms, ensuring a consistent user experience. Finally, I deployed the applications on AWS (EC2, S3, CloudFront) to deliver scalability, high availability, and reliability.",
        },
    ],
};

// --- UI COMPONENTS ---

const ThemeSwitcher: React.FC<{ theme: Theme; setTheme: (t: Theme) => void }> = ({
    theme,
    setTheme,
}) => {
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === "light"
                ? "bg-slate-200 text-slate-800 focus:ring-indigo-500"
                : "bg-gray-700 text-slate-200 focus:ring-indigo-500"
                }`}
        >
            {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1z..."
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </button>
    );
};

const Header: React.FC<{ theme: Theme; setTheme: (t: Theme) => void }> = ({ theme, setTheme }) => {
    const currentTheme = themes[theme];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
            {["skills", "experience", "contact"].map((section) => (
                <a
                    key={section}
                    href={`#${section}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-700"
                        }`}
                >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
            ))}
        </div>
    );

    return (
        <header className={`${currentTheme.headerBg} backdrop-blur-md sticky top-0 z-50`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl font-bold">Mehul Saxena</h1>
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks}
                        <ThemeSwitcher theme={theme} setTheme={setTheme} />
                    </div>
                    <div className="md:hidden flex items-center">
                        <ThemeSwitcher theme={theme} setTheme={setTheme} />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`ml-2 inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${theme === "light" ? "hover:bg-slate-200" : "hover:bg-gray-700"
                                }`}
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            {isMenuOpen && <div className="md:hidden px-4 pb-3">{navLinks}</div>}
        </header>
    );
};

const SkillsChart: React.FC<{ skills: Record<string, string[]>; theme: Theme }> = ({
    skills,
    theme,
}) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        const textColor = theme === "light" ? "#334155" : "#cbd5e1";

        const chartInstance = new Chart(ctx, {
            type: "radar",
            data: {
                labels: Object.keys(skills),
                datasets: [
                    {
                        label: "Skill Proficiency",
                        data: Object.values(skills).map((s) => s.length),
                        backgroundColor: "rgba(79, 70, 229, 0.2)",
                        borderColor: "rgba(79, 70, 229, 1)",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" },
                        grid: { color: theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" },
                        pointLabels: { color: textColor, font: { size: 12 } },
                        ticks: { color: textColor, backdropColor: "transparent", stepSize: 2 },
                    },
                },
            },
        });

        return () => chartInstance.destroy();
    }, [skills, theme]);

    return <canvas ref={chartRef}></canvas>;
};

const ExperienceTimeline: React.FC<{ experience: Experience[]; theme: Theme }> = ({
    experience,
    theme,
}) => {
    const currentTheme = themes[theme];
    return (
        <div className="relative border-l-2 border-indigo-500/30 ml-4 md:ml-0">
            {experience.map((job, index) => (
                <div key={index} className="mb-10 ml-8">
                    <h3 className={`flex items-center mb-1 text-lg font-semibold ${currentTheme.text}`}>
                        {job.company}
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-indigo-500">
                        {job.duration}
                    </time>
                    <p className={`text-base font-normal ${currentTheme.cardText}`}>{job.description}</p>
                </div>
            ))}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const PortfolioPage: React.FC = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const [activeSkillCategory, setActiveSkillCategory] = useState<string>(
        Object.keys(portfolioData.skills)[0]
    );

    useEffect(() => {
        const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const currentTheme = themes[theme];

    return (
        <div
            className={`${currentTheme.bg} ${currentTheme.text} min-h-screen transition-colors duration-300`}
        >
            <Header theme={theme} setTheme={setTheme} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* --- HERO --- */}
                <section id="summary" className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                        <span className="block">{portfolioData.name}</span>
                        <span className="block text-indigo-500">{portfolioData.title}</span>
                    </h1>
                    <p className={`max-w-3xl mx-auto text-lg ${currentTheme.cardText} md:text-xl`}>
                        {portfolioData.summary}
                    </p>
                </section>

                {/* --- SKILLS --- */}
                <section id="skills" className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Technical Skillset</h2>
                    <div
                        className={`grid md:grid-cols-5 gap-8 ${currentTheme.cardBg} rounded-2xl p-6 md:p-8 shadow-lg`}
                    >
                        <div className="md:col-span-2">
                            <div className="chart-container" style={{ height: "350px" }}>
                                <SkillsChart skills={portfolioData.skills} theme={theme} />
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <div className="mb-6 flex flex-wrap gap-2">
                                {Object.keys(portfolioData.skills).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveSkillCategory(category)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition ${activeSkillCategory === category
                                            ? currentTheme.activeTab
                                            : `${currentTheme.inactiveTab} hover:bg-slate-300 dark:hover:bg-gray-600`
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {portfolioData.skills[activeSkillCategory].map((skill) => (
                                    <span
                                        key={skill}
                                        className={`${currentTheme.tagBg} ${currentTheme.tagText} text-sm font-semibold px-4 py-2 rounded-full flex items-center`}
                                    >
                                        <span className="mr-2 text-indigo-400">&#9679;</span> {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- EXPERIENCE --- */}
                <section id="experience" className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Career Journey</h2>
                    <div className={`${currentTheme.cardBg} rounded-2xl p-6 md:p-8 shadow-lg`}>
                        <ExperienceTimeline experience={portfolioData.experience} theme={theme} />
                    </div>
                </section>

                {/* --- CONTACT --- */}
                <section
                    id="contact"
                    className={`text-center ${currentTheme.cardBg} rounded-2xl p-8 md:p-12 shadow-lg`}
                >
                    <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                    <p className={`max-w-xl mx-auto mb-6 ${currentTheme.cardText}`}>
                        I'm currently open to new opportunities. Feel free to reach out via email or connect with
                        me on social media.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-lg">
                        <a
                            href={`mailto:${portfolioData.contact.email}`}
                            className="font-medium text-indigo-500 hover:text-indigo-400 transition"
                        >
                            {portfolioData.contact.email}
                        </a>
                        <span className="hidden sm:block">|</span>
                        <a href="https://www.linkedin.com/in/mehul-saxena-826a1812b/" className="font-medium text-indigo-500 hover:text-indigo-400 transition">
                            LinkedIn
                        </a>
                        <span className="hidden sm:block">|</span>
                        <a href="https://github.com/Beast2502" className="font-medium text-indigo-500 hover:text-indigo-400 transition">
                            GitHub
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PortfolioPage;
