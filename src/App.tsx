import { useEffect, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Binary, Cpu, Database, Layout, Sun, Moon, ArrowDown } from 'lucide-react';

// --- Types ---
interface CVData {
  name: string;
  role: string;
  experience: { company: string; position: string; period: string; description: string }[];
  skills: { name: string; color: string; category: string }[];
  education: { school: string; degree: string; year: string; institution: string }[];
}

// --- Components ---

const SkillIcon = ({ skill, isDarkMode }: { skill: { name: string; color: string; slug?: string; logoPath?: string }, isDarkMode: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getLogoUrl = (type: 'base' | 'hover') => {
    if (skill.logoPath) return skill.logoPath;
    
    const slug = skill.slug || skill.name.toLowerCase().replace('.', '');
    if (type === 'base') {
      return `https://cdn.simpleicons.org/${slug}/${isDarkMode ? 'ffffff' : '000000'}`;
    }
    return `https://cdn.simpleicons.org/${slug}/${skill.color.replace('#', '')}`;
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.15 }}
      className="relative flex flex-col items-center justify-center group"
    >
      <div className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-3xl border transition-all duration-500 relative overflow-hidden
        ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}
      `}
      style={{
        borderColor: isHovered ? skill.color + '44' : undefined,
        backgroundColor: isHovered ? skill.color + '08' : undefined,
        boxShadow: isHovered ? `0 0 40px ${skill.color}11` : 'none'
      }}
      >
        {/* Base State Icon */}
        <img 
          src={getLogoUrl('base')}
          alt={skill.name}
          className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-500 pointer-events-none absolute object-contain
            ${isHovered ? 'opacity-0 scale-75' : 'opacity-[0.25] grayscale lg:opacity-[0.2]'}
          `}
        />
        {/* Hovered State Icon */}
        <img 
          src={getLogoUrl('hover')}
          alt={skill.name}
          className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-500 pointer-events-none object-contain
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute'}
          `}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 5 : 10 }}
        className="absolute -bottom-6 flex flex-col items-center"
      >
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: skill.color }}>
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

const BlackboardBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 80 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`fixed inset-0 pointer-events-none -z-10 transition-colors duration-700 ${isDarkMode ? 'bg-[#080808]' : 'bg-[#e0e0e0]'}`}>
      {/* Texture Layers */}
      <div className={`absolute inset-0 blackboard-texture ${isDarkMode ? 'opacity-[0.03] text-white' : 'opacity-[0.05] text-black'}`} />
      <div className="absolute inset-0 rough-texture" />
      <div className={`absolute inset-0 chalk-dust ${isDarkMode ? 'text-white/20' : 'text-black/10'}`} />

      {/* Dynamic Background Spotlight */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full blur-[140px] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          mixBlendMode: isDarkMode ? 'screen' : 'overlay',
        }}
      />
      
      {/* Subtle Grid */}
      <div className={`absolute inset-0 grid-pattern ${isDarkMode ? 'opacity-[0.03] text-white' : 'opacity-[0.03] text-black'}`} />

      {/* Dark vignette override */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.2)_100%)]'}`} />
    </div>
  );
};

const BinaryTypewriter = () => {
  const lines = useMemo(() => [
    "{lorenz}, eat, code, debug, repeat",
    "{lorenz}, think, code, break, fix",
    "{lorenz}, compile, run, fail, learn",
    "{lorenz}, code, test, refine, loop",
    "{lorenz}, build, break, rebuild, repeat",
    "{lorenz}, sleep, code, survive, repeat",
    "{lorenz}, dream, code, deploy, repeat",
    "{lorenz}, logic, code, persist, repeat",
  ], []);

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  
  const currentLine = lines[index];
  const characters = "010101110010101!@#$%^&*";

  useEffect(() => {
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const animateChar = () => {
      if (charIndex <= currentLine.length) {
        setDisplayText(currentLine.slice(0, charIndex) + 
          (charIndex < currentLine.length ? characters[Math.floor(Math.random() * characters.length)] : ""));
        
        if (charIndex === currentLine.length) {
          timeoutId = setTimeout(() => {
            setIndex((prev) => (prev + 1) % lines.length);
          }, 4000);
        } else {
          charIndex++;
          timeoutId = setTimeout(animateChar, 40);
        }
      }
    };

    animateChar();
    return () => clearTimeout(timeoutId);
  }, [index, currentLine, lines]);

  return (
    <div className="font-mono font-bold text-4xl md:text-7xl leading-[1.1] tracking-tighter min-h-[2.4em] max-w-4xl">
      <span className="text-current opacity-90">{displayText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="inline-block w-4 h-12 md:w-6 md:h-16 bg-blue-500 ml-4 align-middle"
      />
    </div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const cvData: CVData = {
    name: "Lorenz Liu Leovonchiong",
    role: "SOFTWARE ENGINEER - DATA ANALYST",
    experience: [
      {
        company: "CodeNexus Systems",
        position: "Senior Software Engineer",
        period: "2023 — Present",
        description: "Leading development of high-performance React architectures and robust security protocols. Architecting scalable microservices and infrastructure."
      },
      {
        company: "Digital Forge",
        position: "Backend Developer",
        period: "2021 — 2023",
        description: "Managed complex database schemas and built scalable API endpoints using Node.js and Rust. Optimized query performance by 40%."
      },
      {
        company: "CloudCore",
        position: "Platform Engineer",
        period: "2019 — 2021",
        description: "Implemented CI/CD pipelines and managed Kubernetes clusters for high-traffic applications."
      }
    ],
    skills: [
      { name: "JavaScript", color: "#F7DF1E", category: "Development", slug: "javascript" },
      { name: "HTML5", color: "#E34F26", category: "Development", slug: "html5" },
      { name: "CSS3", color: "#1572B6", category: "Development", slug: "css3" },
      { name: "Bootstrap", color: "#7952B3", category: "Frameworks", slug: "bootstrap" },
      { name: "Flask", color: "#000000", category: "Frameworks", slug: "flask" },
      { name: "Vue.js", color: "#4FC08D", category: "Frameworks", slug: "vuedotjs" },
      { name: "React.js", color: "#61DAFB", category: "Frameworks", slug: "react" },
      { name: "Tailwind CSS", color: "#06B6D4", category: "Frameworks", slug: "tailwindcss" },
      { name: "Python", color: "#3776AB", category: "Backend", slug: "python" },
      { name: "Java", color: "#007396", category: "Backend", slug: "openjdk" },
      { name: "Node.js", color: "#339933", category: "Backend", slug: "nodedotjs" },
      { name: "Firebase", color: "#FFCA28", category: "Database", slug: "firebase" },
      { name: "MongoDB", color: "#47A248", category: "Database", slug: "mongodb" },
      { name: "MySQL", color: "#4479A1", category: "Database", slug: "mysql" },
      { name: "Pandas", color: "#150458", category: "Data Science", slug: "pandas" },
      { name: "Matplotlib", color: "#11557C", category: "Data Science", slug: "matplotlib" },
      { name: "Git", color: "#F05032", category: "Dev Tools", slug: "git" },
      { name: "GitHub", color: "#181717", category: "Dev Tools", slug: "github" },
      { name: "Figma", color: "#F24E1E", category: "Dev Tools", slug: "figma" },
    ],
    education: [
      {
        institution: "Stanford Institute of Technology",
        degree: "B.S. Computer Science",
        year: "Class of 2018"
      }
    ]
  };

  return (
    <div className="relative min-h-screen font-sans">
      <BlackboardBackground isDarkMode={isDarkMode} />
      
      {/* Theme Toggle & Header */}
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono font-bold text-lg tracking-[0.2em] text-white uppercase"
        >
          {cvData.name}
        </motion.div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-full hover:bg-white/10 transition-all text-white border border-white/20"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Expansive Hero Section */}
      <section className="min-h-screen flex flex-col justify-end p-8 md:p-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-[2px] bg-blue-500" />
            <span className="text-xs font-mono tracking-[0.5em] opacity-40 uppercase">{cvData.role}</span>
          </div>
          <BinaryTypewriter />
          <p className="text-lg md:text-xl max-w-2xl opacity-60 font-light leading-relaxed">
            I build resilient digital architectures where performance meets logical precision. 
            Focused on bridging high-throughput backend services with refined, human-centric interfaces.
          </p>
        </motion.div>
        
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ArrowDown size={32} />
        </div>
      </section>

      {/* Expansive Content Sections */}
      <div className="max-w-7xl mx-auto px-8 md:px-24 space-y-48 pb-64">
        
        {/* Experience Section - Far more spaced out */}
        <section id="experience" className="space-y-24 pt-32">
          <div className="space-y-4">
            <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase underline underline-offset-8">Exp. Log</h2>
            <div className="text-5xl md:text-8xl font-bold tracking-tighter opacity-25 dark:opacity-20 select-none transition-opacity">PREVIOUS_STACKS</div>
          </div>

          <div className="grid grid-cols-1 gap-32">
            {cvData.experience.map((job, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
              >
                <div className="absolute -left-12 top-0 h-full w-[2px] bg-blue-500/10 group-hover:bg-blue-500/40 transition-all duration-700" />
                <div className="space-y-8 max-w-3xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                      {job.position}
                    </h3>
                    <span className="text-xs font-mono px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-full tracking-widest uppercase">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-blue-500 font-mono tracking-widest uppercase text-sm">{job.company}</div>
                  <p className="text-lg opacity-50 font-light leading-loose">
                    {job.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dynamic Grid: Bio & Education */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase">The Objective</h2>
              <h3 className="text-4xl font-bold tracking-tight">Engineering for Scale.</h3>
            </div>
            <p className="text-lg opacity-60 font-light leading-relaxed">
              I specialize in complex system integration, developing distributed services that handle millions of requests while ensuring a flawless developer experience. My approach is rooted in the philosophy that software should be as resilient as it is intuitive.
            </p>
          </div>

          <div className="space-y-12 bg-white/5 p-12 md:p-20 border border-white/5 rounded-3xl backdrop-blur-sm">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase">Academic</h2>
              <Cpu className="text-blue-500" />
            </div>
            {cvData.education.map((edu, i) => (
              <div key={i} className="space-y-4">
                <p className="text-2xl font-bold tracking-tight">{edu.degree}</p>
                <p className="text-lg opacity-60 font-light">{edu.institution}</p>
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase opacity-30">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section - Unified ARCHITECTURE Segment */}
        <section className="space-y-32">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase">System Core</h2>
              <div className="text-5xl md:text-9xl font-bold tracking-tighter opacity-25 dark:opacity-20 select-none uppercase transition-opacity">ARCHITECTURE</div>
            </div>
            <Database size={64} className="opacity-20 hidden md:block" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {cvData.skills.map(skill => (
              <SkillIcon key={skill.name} skill={skill} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>

      </div>

      {/* Expansive Footer */}
      <footer className="relative border-t border-white/5 pt-32 pb-64 px-8 md:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-24">
          <div className="space-y-24">
            <div className="text-7xl md:text-9xl font-bold tracking-tighter opacity-15 dark:opacity-10 select-none leading-none">
              COMMENCE<br/>CONSTRUCTION
            </div>
            <div className="space-y-8">
              <div className="w-12 h-1 bg-blue-500" />
              <p className="text-xl opacity-60 dark:opacity-50 font-mono tracking-widest max-w-sm">Ready to integrate? Reach out for collaboration or consulting.</p>
            </div>
          </div>

          <div className="flex gap-12 mb-4">
            <a href="#" className="opacity-40 hover:opacity-100 hover:text-blue-500 transition-all"><Github size={32} /></a>
            <a href="#" className="opacity-40 hover:opacity-100 hover:text-blue-500 transition-all"><Linkedin size={32} /></a>
            <a href="#" className="opacity-40 hover:opacity-100 hover:text-blue-500 transition-all"><Mail size={32} /></a>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.8em] opacity-10 uppercase">
          © 2026 Lorenz / System Status: Nominal
        </div>
      </footer>
    </div>
  );
}
