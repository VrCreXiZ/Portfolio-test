import { useEffect, useState, useMemo, useRef, FC } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Binary, Cpu, Database, Layout, Sun, Moon, ArrowDown, ExternalLink, X, Grid, ChevronLeft, ChevronRight, Maximize2, Minimize2, Terminal, Compass, Activity } from 'lucide-react';

// --- Types ---
interface CVData {
  name: string;
  role: string;
  experience: { company: string; position: string; period: string; description: string }[];
  skills: { name: string; color: string; category: string; slug?: string; logoPath?: string }[];
  education: { degree: string; year: string; institution: string }[];
  projects: { title: string; tag: string; description: string; tech: string[]; year: string; sourceUrl?: string; liveUrl?: string }[];
}

// --- Components ---

interface SkillIconProps {
  skill: { name: string; color: string; category: string; slug?: string; logoPath?: string };
  isDarkMode: boolean;
}

const SkillIcon: FC<SkillIconProps> = ({ skill, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const slug = skill.slug || skill.name.toLowerCase().replace('.', '');

  const getCustomSvg = (colored: boolean) => {
    const mono = isDarkMode ? '#ffffff' : '#000000';

    if (slug === 'css3') {
      const c1 = colored ? '#1572B6' : mono;
      const c2 = colored ? '#0B5FA5' : mono;
      const c3 = colored ? '#33A9DC' : mono;

      return (
        <svg
          viewBox="0 0 256 256"
          width="48"
          height="48"
          aria-hidden="true"
          className="block"
        >
          <defs>
            <linearGradient id="css3Grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={c1} />
              <stop offset="1" stopColor={c2} />
            </linearGradient>
          </defs>
          <path fill="url(#css3Grad)" d="M27 0l20 256 182-70L229 0H27z" />
          <path fill={c3} opacity={colored ? '0.95' : '0.7'} d="M128 44v172l75-28-8-144H128z" />
          <path fill={mono} opacity={colored ? '0.92' : '0.5'} d="M206 71l-86 34-6 46 77-29-2 28-61 23-2 13h-18l6-58 71-28 2-18-53 20-2-18 88-34z" />
        </svg>
      );
    }

    if (slug === 'matplotlib') {
      const b1 = colored ? '#4F84C4' : mono;
      const b2 = colored ? '#1F77B4' : mono;
      const b3 = colored ? '#155E8A' : mono;
      const stroke = colored ? '#6AAED6' : mono;
      const fillLine = colored ? '#A6D8F2' : mono;

      return (
        <svg
          viewBox="0 0 256 256"
          width="48"
          height="48"
          aria-hidden="true"
          className="block"
        >
          <rect x="24" y="176" width="208" height="24" rx="8" fill={mono} opacity={colored ? '0.15' : '0.35'} />
          <circle cx="80" cy="136" r="22" fill={b1} opacity={colored ? '1' : '0.8'} />
          <rect x="118" y="88" width="18" height="96" rx="6" fill={b1} opacity={colored ? '1' : '0.8'} />
          <rect x="144" y="118" width="18" height="66" rx="6" fill={b2} opacity={colored ? '1' : '0.8'} />
          <rect x="170" y="68" width="18" height="116" rx="6" fill={b3} opacity={colored ? '1' : '0.8'} />
          <path d="M44 188V56c0-8 6-14 14-14h140c8 0 14 6 14 14v132" fill="none" stroke={stroke} strokeWidth="10" strokeLinecap="round" opacity={colored ? '0.9' : '0.6'} />
          <path d="M72 140l32-56 24 40 34-58 18 6-44 74-26-44-30 52-8-14z" fill={fillLine} opacity={colored ? '0.9' : '0.6'} />
        </svg>
      );
    }

    return null;
  };

  const getLogoUrl = (type: 'base' | 'hover') => {
    if (skill.logoPath) return skill.logoPath;

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
      <div
        className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-3xl border transition-all duration-500 relative overflow-hidden
          ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}
        `}
        style={{
          borderColor: isHovered ? skill.color + '44' : undefined,
          backgroundColor: isHovered ? skill.color + '08' : undefined,
          boxShadow: isHovered ? `0 0 40px ${skill.color}11` : 'none'
        }}
      >
        {/* Base State Icon */}
        {getCustomSvg(false) ? (
          <div
            className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-500 pointer-events-none absolute object-contain
              ${isHovered ? 'opacity-0 scale-75' : isDarkMode ? 'opacity-[0.25] grayscale lg:opacity-[0.2]' : 'opacity-100 grayscale-0'}
            `}
          >
            {getCustomSvg(false)}
          </div>
        ) : (
          <img
            src={getLogoUrl('base')}
            alt={skill.name}
            className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-500 pointer-events-none absolute object-contain
              ${isHovered ? 'opacity-0 scale-75' : isDarkMode ? 'opacity-[0.25] grayscale lg:opacity-[0.2]' : 'opacity-100 grayscale-0'}
            `}
          />
        )}

        {/* Hovered State Icon */}
        {getCustomSvg(false) ? (
          <div
            className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-500 pointer-events-none object-contain
              ${isHovered ? 'opacity-100 scale-100' : isDarkMode ? 'opacity-0 scale-50 absolute' : 'opacity-0 scale-50 absolute'}
            `}
          >
            {getCustomSvg(true)}
          </div>
        ) : (
          <img
            src={getLogoUrl('hover')}
            alt={skill.name}
            className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-500 pointer-events-none object-contain
              ${isHovered ? 'opacity-100 scale-100' : isDarkMode ? 'opacity-0 scale-50 absolute' : 'opacity-0 scale-50 absolute'}
            `}
          />
        )}
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

interface ProjectCardProps {
  project: {
    title: string;
    tag: string;
    description: string;
    tech: string[];
    year: string;
    sourceUrl?: string;
    liveUrl?: string;
  };
  isDarkMode: boolean;
  onClick: () => void;
  isCarousel?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, isDarkMode, onClick, isCarousel = false }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8 }}
      className={`p-8 md:p-10 rounded-3xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden group cursor-pointer project-glow-effect
        ${isCarousel 
          ? 'w-[290px] sm:w-[340px] md:w-[380px] shrink-0' 
          : 'w-full'
        }
        ${isDarkMode 
          ? 'border-white/5 bg-white/[0.015] hover:border-blue-500/30 hover:bg-white/[0.03] shadow-2xl shadow-black/40' 
          : 'border-black/5 bg-black/[0.01] hover:border-blue-500/30 hover:bg-black/[0.02] shadow-2xl shadow-slate-200/50'
        }
      `}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500 uppercase font-extrabold">{project.tag}</span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white group-hover:text-blue-500 transition-colors">{project.title}</h3>
          </div>
          <span className="text-xs font-mono opacity-40 shrink-0">{project.year}</span>
        </div>
        <p className="text-sm opacity-60 font-light leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t: string) => (
            <span key={t} className={`text-[10px] font-mono px-3 py-1 rounded-full border
              ${isDarkMode 
                ? 'bg-white/5 border-white/5 text-white/55' 
                : 'bg-black/5 border-black/5 text-black/65'
              }
            `}>
              {t}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-8 mt-8 border-t border-current/5">
        <div className="flex gap-6">
          {project.sourceUrl && (
            <a 
              href={project.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs font-mono text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider font-semibold"
            >
              <Github size={14} /> Source Code
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs font-mono text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider font-semibold"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
        </div>
        <span className="text-[10px] font-mono text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-extrabold tracking-wider">
          MORE SPECS →
        </span>
      </div>
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
};// --- Systems Dashboard & HUD Target Brackets ---

const TargetSpecHUD = ({ isScanning, scanTargetName, isDarkMode }: { isScanning: boolean; scanTargetName: string; isDarkMode: boolean }) => {
  return (
    <AnimatePresence>
      {isScanning && (
        <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden select-none">
          {/* Extremely elegant screen-wide scanner sweep */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 bg-blue-500/5`}
          />

          {/* Fine target corner ticks */}
          <motion.div
            initial={{ x: -20, y: -20, opacity: 0 }}
            animate={{ x: 12, y: 12, opacity: 0.6 }}
            exit={{ x: -20, y: -20, opacity: 0 }}
            className={`absolute left-0 top-0 w-8 h-8 border-l border-t ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}
          />
          <motion.div
            initial={{ x: 20, y: -20, opacity: 0 }}
            animate={{ x: -12, y: 12, opacity: 0.6 }}
            exit={{ x: 20, y: -20, opacity: 0 }}
            className={`absolute right-0 top-0 w-8 h-8 border-r border-t ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}
          />
          <motion.div
            initial={{ x: -20, y: 20, opacity: 0 }}
            animate={{ x: 12, y: -12, opacity: 0.6 }}
            exit={{ x: -20, y: 20, opacity: 0 }}
            className={`absolute left-0 bottom-0 w-8 h-8 border-l border-b ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}
          />
          <motion.div
            initial={{ x: 20, y: 20, opacity: 0 }}
            animate={{ x: -12, y: -12, opacity: 0.6 }}
            exit={{ x: 20, y: 20, opacity: 0 }}
            className={`absolute right-0 bottom-0 w-8 h-8 border-r border-b ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}
          />

          {/* Thin, graceful neon scanning line */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/80 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.5)] z-50 pointer-events-none"
          />

          {/* Center target circle indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.08 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`w-64 h-64 rounded-full border border-dashed ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}
            />
            <div className="w-2 h-2 relative flex items-center justify-center">
              <div className={`absolute w-6 h-[1px] ${isDarkMode ? 'bg-blue-500/30' : 'bg-blue-600/40'}`} />
              <div className={`absolute h-6 w-[1px] ${isDarkMode ? 'bg-blue-500/30' : 'bg-blue-600/40'}`} />
            </div>
          </div>

          {/* Minimalist tactical coordinate overlays */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            className="absolute left-8 top-20 font-mono text-left space-y-1 select-none"
          >
            <div className={`text-[10px] ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-bold tracking-[0.3em]`}>NAV_ALIGNMENT</div>
            <div className={`text-[8px] ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>DESTINATION: {scanTargetName}</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.8, y: 0 }}
            className="absolute right-8 bottom-20 font-mono text-right space-y-1 select-none"
          >
            <div className={`text-[10px] ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-bold tracking-[0.3em]`}>SYS_STATUS</div>
            <div className={`text-[8px] ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>POSITION_LOCK: SECURED</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface DashboardSection {
  id: string;
  num: string;
  title: string;
  elementId: string;
  desc: string;
}

const DASHBOARD_SECTIONS: DashboardSection[] = [
  { id: 'hero', num: '01', title: 'WELCOME', elementId: 'hero', desc: 'Main Command Deck' },
  { id: 'experience', num: '02', title: 'EXPERIENCE', elementId: 'experience', desc: 'Work History Log' },
  { id: 'bio-segment', num: '03', title: 'BIOGRAPHY', elementId: 'bio-segment', desc: 'Academic Details' },
  { id: 'architecture-segment', num: '04', title: 'COMPETENCIES', elementId: 'architecture-segment', desc: 'System Competencies' },
  { id: 'projects', num: '05', title: 'PORTFOLIO', elementId: 'projects', desc: 'Production Registry' },
  { id: 'footer-segment', num: '06', title: 'CONTACT', elementId: 'footer-segment', desc: 'Outpost Terminus' }
];

const SleekSystemDashboard = ({
  isDarkMode,
  activeSection,
  scrollProgress,
  onNavigate
}: {
  isDarkMode: boolean;
  activeSection: string;
  scrollProgress: number;
  onNavigate: (elementId: string, title: string) => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ping, setPing] = useState(14);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      setPing(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next < 10 ? 10 : next > 20 ? 20 : next;
      });
    }, 4000);
    return () => clearInterval(pingInterval);
  }, []);

  return (
    <>
      {/* Floating Toggle Hub - Sleek, simplistic, ultra modern */}
      <div className="fixed bottom-6 right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-8 z-40">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.button
              key="trigger-node"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsCollapsed(false)}
              className={`w-12 h-12 rounded-full border flex justify-center items-center backdrop-blur-md shadow-lg hover:shadow-xl transition-all relative group cursor-pointer
                ${isDarkMode 
                  ? 'border-neutral-800 bg-neutral-950/90 text-neutral-400 hover:text-white hover:border-neutral-700' 
                  : 'border-neutral-200 bg-white/90 text-neutral-600 hover:text-black hover:border-neutral-300'
                }
              `}
              title="Expand Navigation Controller"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  className="fill-none stroke-blue-500/20"
                  strokeWidth="1.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  className="fill-none stroke-blue-500"
                  strokeWidth="1.5"
                  strokeDasharray="131.9"
                  strokeDashoffset={131.9 - (131.9 * scrollProgress) / 100}
                />
              </svg>
              <Compass size={18} className="text-blue-500 group-hover:scale-110 transition-transform duration-300" />
            </motion.button>
          ) : (
            <motion.div
              key="hud-panel"
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`w-[240px] md:w-[260px] border backdrop-blur-md rounded-[1.5rem] p-5 shadow-xl flex flex-col gap-4 relative overflow-hidden
                ${isDarkMode 
                  ? 'border-neutral-800 bg-neutral-950/95 text-neutral-250 shadow-black/50' 
                  : 'border-neutral-200 bg-white/95 text-neutral-800 shadow-neutral-200/50'
                }
              `}
            >
              <div className="absolute inset-0 grid-pattern opacity-[0.01] pointer-events-none" />

              {/* Console Header */}
              <div className="flex justify-between items-center border-b border-neutral-500/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono font-medium tracking-[0.25em] text-blue-500 uppercase">SYS_COORD</h4>
                  </div>
                </div>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border transition-all
                    ${isDarkMode 
                      ? 'border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white' 
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-500 hover:text-black'
                    }
                  `}
                >
                  Hide
                </button>
              </div>

              {/* Simplistic Indicator */}
              <div className="flex justify-between items-center font-mono text-[9px] px-1 py-1">
                <div className="flex flex-col gap-0.5">
                  <span className="opacity-40 uppercase">ACTIVE_DECK</span>
                  <span className="font-bold text-blue-500 tracking-wider">
                    {DASHBOARD_SECTIONS.find(s => s.id === activeSection)?.title || 'WELCOME'}
                  </span>
                </div>
                <div className="text-right flex flex-col gap-0.5">
                  <span className="opacity-40 uppercase">LATENCY</span>
                  <span className="opacity-80 font-medium">{ping}MS</span>
                </div>
              </div>

              {/* Navigation Grid Nodes */}
              <div className="flex flex-col gap-1 mt-1">
                {DASHBOARD_SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => onNavigate(sec.elementId, sec.title)}
                      className={`w-full py-1.5 px-3 rounded-lg font-mono text-left text-[11px] transition-all relative flex justify-between items-center group/node
                        ${isActive 
                          ? 'bg-blue-500/5 text-blue-500 font-medium border border-blue-500/20' 
                          : isDarkMode
                            ? 'border border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/30' 
                            : 'border border-transparent text-neutral-600 hover:text-black hover:bg-neutral-100/40'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] tracking-normal ${isActive ? 'text-blue-500' : 'opacity-40'}`}>
                          {sec.num}
                        </span>
                        <span className="tracking-widest uppercase">{sec.title}</span>
                      </div>

                      {isActive && (
                        <motion.span 
                          layoutId="active-dot"
                          className="w-1 h-1 rounded-full bg-blue-500" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-neutral-500/10 flex justify-between text-[8px] font-mono opacity-30 mt-1">
                <span>VER: 2.1.0</span>
                <span>HUD NAVIGATION</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const isHoveringRef = useRef(false);

  // Spying navigation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanTargetName, setScanTargetName] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const sections = ['hero', 'experience', 'bio-segment', 'architecture-segment', 'projects', 'footer-segment'];
      let currentSection = 'hero';
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (elementId: string, title: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      setIsScanning(true);
      setScanTargetName(title);
      
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        setIsScanning(false);
      }, 1200);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const cvData: CVData = {
    name: "Lorenz Liu Leovonchiong",
    role: "SOFTWARE ENGINEER - DATA ANALYST",
    experience: [
      {
        company: "Tech4Youth: The Dominican Computer Society",
        position: "Vice President - Internal Affairs",
        period: "2021 - 2022",
        description: "Openly helped the organization to achieve new heights by introducing new events and activities and helping other organizations with technical events."
      },
      {
        company: "Tech4Youth: The Dominican Computer Society",
        position: "President - Internal Affairs",
        period: "2022 - 2023",
        description: "Led cross-function student teams to organize technical events, increasing participation to the student body. Coordinated with external organizations for collaborative tech workshops and competitions. Oversaw planning, execution, and post-event evaluation for multiple campus-wide events."
      },
      {
        company: "CREOTEC Philippines Inc. ",
        position: "Team Leader - Work Immersion Program",
        period: "2023 - 2023",
        description: "Assisted in organizing and facilitating robotics and coding programs, supporting fellow students and improving technical engagement during work immersion."
      },
      {
        company: "DLSU-D College of Information and Computer Studies Student Government",
        position: "Technical and Documentation Committee Member",
        period: "2023 - 2025",
        description: "Assisted in facilitating photographic documentation on university-wide events, capturing important moments and highlights of events Oversaw photographic documentation, execution, and post-event editing of images for multiple campus-wide events."
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
        institution: "De La Salle University - Dasmariñas",
        degree: "Bachelor of Science in Computer Science - Specialization in Intelligent Systems",
        year: "Class of 2027"
      }
    ],
    projects: [
      {
        title: "AetherConsensus",
        tag: "DISTRIBUTED SYSTEMS",
        description: "Autonomous high-performance key-value database built in Rust. Leverages a custom implementation of the Raft consensus protocol and an active WAL disk storage layer to manage cluster synchronization in partition heavy scenarios.",
        tech: ["Rust", "gRPC", "Protobuf", "Docker"],
        year: "2024",
        sourceUrl: "https://github.com/lorenz/aether-consensus",
        liveUrl: "https://aether-consensus.dev"
      },
      {
        title: "Hyperion Cloud Orchestrator",
        tag: "PLATFORM ORCHESTRATION",
        description: "Dynamic visual microservice orchestration dashboard. Hooks directly into Kubernetes APIs via Go hooks to generate sub-millisecond network activity telemetry, node scaling visualizer, and custom cluster threshold triggers.",
        tech: ["Go", "React.js", "K8s", "Tailwind CSS"],
        year: "2023",
        sourceUrl: "https://github.com/lorenz/hyperion-orchestration",
        liveUrl: "https://hyperion.cloud"
      },
      {
        title: "Synthetica Engine",
        tag: "MOCK GENERATION",
        description: "Declarative server-side mocking engine designed to dynamically assemble, map, and output complex nested JSON relational data. Supports direct schema parsing and exposes real-time hot-reloading mock endpoints.",
        tech: ["Node.js", "TypeScript", "Express", "MongoDB"],
        year: "2023",
        sourceUrl: "https://github.com/lorenz/synthetica-engine",
        liveUrl: "https://synthetica.dev"
      },
      {
        title: "Prism GPU Renderer",
        tag: "GRAPHICS ENGINEERING",
        description: "Highly performant web-based Ray Tracing compiler mapping light paths in real-time onto an interactive 3D grid, achieving 60 FPS utilizing native canvas WebGL shaders and optimized vertex structures.",
        tech: ["JavaScript", "WebGL", "HTML5", "CSS3"],
        year: "2022",
        sourceUrl: "https://github.com/lorenz/prism-gpu",
        liveUrl: "https://prism-grapher.dev"
      }
    ]
  };

  // Continuous smooth auto-rotation of the carousel with hover pause and seamless modular looping
  useEffect(() => {
    if (isGridView) return;

    let animFrame: number;
    let lastTime = performance.now();
    const scrollSpeed = 0.05; // px per millisecond

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (trackRef.current && !isHoveringRef.current) {
        scrollPosRef.current -= scrollSpeed * delta;

        // Seamless warp checks
        const el = trackRef.current;
        const originalLength = cvData.projects.length;
        if (el.children && el.children.length > originalLength) {
          const firstChild = el.children[0] as HTMLElement;
          const repeatChild = el.children[originalLength] as HTMLElement;
          if (firstChild && repeatChild) {
            const loopWidth = repeatChild.offsetLeft - firstChild.offsetLeft;
            if (loopWidth > 0) {
              if (Math.abs(scrollPosRef.current) >= loopWidth) {
                scrollPosRef.current += loopWidth;
              }
            }
          }
        }
        el.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;
      }
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isGridView, cvData.projects.length]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = (el.children[0] as HTMLElement)?.clientWidth || 340;
    const gap = 32; // gap-8
    const step = cardWidth + gap;

    const startX = scrollPosRef.current;
    const targetX = startX + (direction === 'left' ? step : -step);
    
    let startTime: number | null = null;
    const duration = 500; // 500ms smooth transition duration

    isHoveringRef.current = true;

    const animateStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      scrollPosRef.current = startX + (targetX - startX) * ease;
      
      if (el) {
        const originalLength = cvData.projects.length;
        const firstChild = el.children[0] as HTMLElement;
        const repeatChild = el.children[originalLength] as HTMLElement;
        if (firstChild && repeatChild) {
          const loopWidth = repeatChild.offsetLeft - firstChild.offsetLeft;
          if (loopWidth > 0) {
            if (Math.abs(scrollPosRef.current) >= loopWidth) {
              scrollPosRef.current += loopWidth;
            } else if (scrollPosRef.current > 0) {
              scrollPosRef.current -= loopWidth;
            }
          }
        }
        el.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        isHoveringRef.current = false;
      }
    };

    requestAnimationFrame(animateStep);
  };

  const duplicatedProjects = useMemo(() => {
    return [...cvData.projects, ...cvData.projects, ...cvData.projects, ...cvData.projects];
  }, [cvData.projects]);

  return (
    <div className="relative min-h-screen font-sans">
      <BlackboardBackground isDarkMode={isDarkMode} />
      
      {/* Target Spec Tactical Scan HUD Overlay */}
      <TargetSpecHUD
        isScanning={isScanning}
        scanTargetName={scanTargetName}
        isDarkMode={isDarkMode}
      />

      {/* Dynamic Systems Control Dashboard */}
      <SleekSystemDashboard
        isDarkMode={isDarkMode}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        onNavigate={handleNavigate}
      />
      
      {/* Theme Toggle & Header */}
      <header className="fixed top-0 left-0 w-full py-4 md:py-6 px-8 md:px-12 z-50 flex justify-between items-center mix-blend-difference">
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
      <section id="hero" className="min-h-[70vh] flex flex-col justify-center p-8 md:px-24 pt-20 md:pt-24 pb-12 relative scroll-mt-32">
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
        
        {/* Experience Section */}
        <section id="experience" className="space-y-24 pt-32 scroll-mt-32">
          <div className="space-y-4">
            <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase underline underline-offset-8">Exp. Log</h2>
            <div className="text-5xl md:text-8xl font-bold tracking-tighter text-black dark:text-white select-none transition-opacity">PREVIOUS_STACKS</div>
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
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
                      {job.position}
                    </h3>
                    <span className="text-xs font-mono px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-full tracking-widest uppercase whitespace-nowrap shrink-0">
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
        <section id="bio-segment" className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start scroll-mt-32">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase">The Objective</h2>
              <h3 className="text-4xl font-bold tracking-tight text-black dark:text-white">Engineering for Scale.</h3>
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
                <p className="text-2xl font-bold tracking-tight text-black dark:text-white">{edu.degree}</p>
                <p className="text-lg opacity-60 font-light">{edu.institution}</p>
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase opacity-30">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section - Unified ARCHITECTURE Segment */}
        <section id="architecture-segment" className="space-y-32 scroll-mt-32">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase">System Core</h2>
              <div className="text-5xl md:text-9xl font-bold tracking-tighter text-black dark:text-white select-none uppercase transition-opacity">ARCHITECTURE</div>
            </div>
            <Database size={64} className="opacity-20 hidden md:block" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {cvData.skills.map(skill => (
              <SkillIcon key={skill.name} skill={skill} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>

        {/* Projects Section - Place right after ARCHITECTURE section */}
        <section id="projects" className="space-y-24 scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 w-full">
            <div className="space-y-4">
              <h2 className="text-xs font-mono tracking-[0.5em] text-blue-500 font-bold uppercase underline underline-offset-8">Projects</h2>
              <div className="text-5xl md:text-8xl font-bold tracking-tighter text-black dark:text-white select-none transition-opacity">PORTFOLIO</div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Minimalist Layout View Mode Toggle */}
              <button
                onClick={() => setIsGridView(!isGridView)}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95
                  ${isDarkMode 
                    ? 'border-white/5 bg-white/[0.02] hover:border-blue-500/30 text-blue-500 hover:text-blue-400' 
                    : 'border-black/5 bg-black/[0.02] hover:border-blue-500/30 text-blue-500 hover:text-blue-600'
                  }
                `}
                title={isGridView ? "Collapse to Slider Mode" : "Expand to Grid Layout (3x3)"}
                aria-label={isGridView ? "Collapse to Slider Mode" : "Expand to Grid Layout"}
              >
                {isGridView ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isGridView ? (
              <motion.div 
                key="grid-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full pt-4"
              >
                {cvData.projects.map((project, i) => (
                  <ProjectCard 
                    key={i} 
                    project={project} 
                    isDarkMode={isDarkMode} 
                    onClick={() => setActiveProject(project)}
                    isCarousel={false}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="relative group/carousel w-full overflow-hidden py-4">
                {/* Left Floating Chevron Overlay */}
                <button 
                  onClick={() => scrollCarousel('left')}
                  className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center
                    opacity-100 md:opacity-0 group-hover/carousel:opacity-100
                    ${isDarkMode 
                      ? 'border-white/10 bg-black/60 hover:border-blue-500/50 hover:bg-black/85 text-white/85 hover:text-white' 
                      : 'border-black/10 bg-white/60 hover:border-blue-500/50 hover:bg-white/85 text-slate-900/85 hover:text-slate-900'
                    }
                  `}
                  style={{ touchAction: 'manipulation' }}
                  aria-label="Scroll Carousel Left"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right Floating Chevron Overlay */}
                <button 
                  onClick={() => scrollCarousel('right')}
                  className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center
                    opacity-100 md:opacity-0 group-hover/carousel:opacity-100
                    ${isDarkMode 
                      ? 'border-white/10 bg-black/60 hover:border-blue-500/50 hover:bg-black/85 text-white/85 hover:text-white' 
                      : 'border-black/10 bg-white/60 hover:border-blue-500/50 hover:bg-white/85 text-slate-900/85 hover:text-slate-900'
                    }
                  `}
                  style={{ touchAction: 'manipulation' }}
                  aria-label="Scroll Carousel Right"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Carousel main track container wrapper */}
                <div 
                  ref={carouselRef}
                  onMouseEnter={() => { isHoveringRef.current = true; }}
                  onMouseLeave={() => { isHoveringRef.current = false; }}
                  className="w-full relative overflow-hidden select-none cursor-grab active:cursor-grabbing pb-6"
                >
                  <div 
                    ref={trackRef}
                    className="flex gap-8 w-max transition-transform duration-75 will-change-transform"
                    style={{ transform: 'translate3d(0px, 0px, 0px)' }}
                  >
                    {duplicatedProjects.map((project, i) => (
                      <ProjectCard 
                        key={i} 
                        project={project} 
                        isDarkMode={isDarkMode} 
                        onClick={() => setActiveProject(project)}
                        isCarousel={true}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </section>

      </div>

      {/* Expansive Footer */}
      <footer id="footer-segment" className="relative border-t border-white/5 pt-32 pb-64 px-8 md:px-24 overflow-hidden scroll-mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-24">
          <div className="space-y-24">
            <div className="text-7xl md:text-9xl font-bold tracking-tighter text-black dark:text-white select-none leading-none">
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

      {/* Project Specs Detailed Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl p-8 md:p-12 rounded-[2.5rem] border relative overflow-hidden shadow-2xl
                ${isDarkMode 
                  ? 'bg-[#0f0f0f] border-white/10 text-white shadow-black/80' 
                  : 'bg-[#f7f7f7] border-black/10 text-slate-900 shadow-slate-300/40'
                }
              `}
            >
              {/* Close button inside card */}
              <button 
                onClick={() => setActiveProject(null)}
                className={`absolute top-6 right-6 p-2 rounded-full border transition-all duration-300
                  ${isDarkMode 
                    ? 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white' 
                    : 'border-black/10 hover:border-black/30 bg-black/5 hover:bg-black/10 text-black'
                  }
                `}
              >
                <X size={18} />
              </button>

              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500 uppercase font-extrabold">{activeProject.tag}</span>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{activeProject.title}</h2>
                    <span className="text-sm font-mono opacity-40">{activeProject.year}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase opacity-40">Development Blueprint</h4>
                  <p className="text-base md:text-lg opacity-80 font-light leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase opacity-40">System Integrations & Stack</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {activeProject.tech.map((t: string) => (
                      <span key={t} className={`text-xs font-mono px-4 py-2 rounded-xl border
                        ${isDarkMode 
                          ? 'bg-neutral-900 border-white/5 text-white/80' 
                          : 'bg-white border-black/5 text-slate-800'
                        }
                      `}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`flex gap-6 pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                  {activeProject.sourceUrl && (
                    <a 
                      href={activeProject.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-xs font-mono text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider font-extrabold"
                    >
                      <Github size={18} /> Source Code
                    </a>
                  )}
                  {activeProject.liveUrl && (
                    <a 
                      href={activeProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-xs font-mono text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider font-extrabold"
                    >
                      <ExternalLink size={18} /> Launch Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
