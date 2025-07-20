'use client';

import { useState, useEffect, useRef } from 'react';
import { DATA } from '@/data/resume';
import { motion } from 'framer-motion';
import { JetBrains_Mono } from 'next/font/google';
import { useTheme } from 'next-themes';
import { Copy, X, Minus, Maximize2, Monitor, SunIcon, MoonIcon, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import ShinyButton from './ui/shiny-button';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
});

const ASCII_ART = `
██████╗ ██████╗  █████╗ ███████╗███████╗███╗   ██╗     ██████╗██╗     ██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝████╗  ██║    ██╔════╝██║     ██║
██████╔╝██████╔╝███████║███████╗█████╗  ██╔██╗ ██║    ██║     ██║     ██║
██╔═══╝ ██╔══██╗██╔══██║╚════██║██╔══╝  ██║╚██╗██║    ██║     ██║     ██║
██║     ██║  ██║██║  ██║███████║███████╗██║ ╚████║    ╚██████╗███████╗██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝     ╚═════╝╚══════╝╚═╝
`;

const MOBILE_ASCII_ART = `
██████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗████╗  ██║
██████╔╝██████╔╝██╔██╗ ██║
██╔═══╝ ██╔══██╗██║╚██╗██║
██║     ██║  ██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝
`;

interface CliInterfaceProps {
  onGuiCommand: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

const ALIASES = {
  ls: 'projects',
  h: 'help',
  '?': 'help',
  v: 'version',
  g: 'gui',
  a: 'about',
  s: 'skills',
  e: 'exp',
  p: 'projects',
  c: 'contact',
  t: 'theme',
};

const COMMANDS = {
  help: 'Available commands:\n\n' +
    'help     (h, ?)  - Show this help message\n' +
    'about    (a)     - Display information about me\n' +
    'skills   (s)     - List my technical skills\n' +
    'projects (p, ls) - List my projects\n' +
    'edu             - Show my education\n' +
    'contact   (c)    - Display contact information\n' +
    'social          - Show social media links\n' +
    'version  (v)    - Show CLI version\n' +
    'clear          - Clear the terminal\n' +
    'gui      (g)    - Switch to GUI mode\n\n' +
    'Tip: Use Tab for command completion and ↑↓ for command history',
  about: () => `${DATA.name}\n${DATA.description}\n\n${DATA.summary}`,
  skills: () => `Skills:\n${DATA.skills.join(', ')}`,
  projects: () => DATA.projects.map(project => 
    `\n${project.title}\n${project.description}\nTech: ${project.technologies.join(', ')}\n`
  ).join('\n'),
  edu: () => DATA.education.map(edu => 
    `\n${edu.school} - ${edu.degree}\n${edu.start} - ${edu.end}\n`
  ).join('\n'),
  contact: () => `Email: ${DATA.contact.email}`,
  social: () => Object.entries(DATA.contact.social)
    .map(([platform, data]) => `${platform}: ${data.url}`)
    .join('\n'),
  version: () => 'prasen.dev CLI v1.0.0',
  clear: 'CLEAR',
  gui: 'GUI',
};

type CommandType = keyof typeof COMMANDS;

function makeLinksClickable(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

// Helper function to format command output
function formatCommandLine(line: string, currentTheme: string | undefined) {
  if (!line || !currentTheme) return line;
  if (line.startsWith('$')) {
    return (
      <>
        <span className={currentTheme === 'dark' ? 'text-fuchsia-500' : 'text-fuchsia-600'}>dev@prasen:~</span>
        <span className={currentTheme === 'dark' ? 'text-green-400' : 'text-green-600'}>$</span>
        {' '}{line.slice(1)}
      </>
    );
  }
  return makeLinksClickable(line);
}

export function CliInterface({ onGuiCommand, onMinimize, onMaximize, onClose }: CliInterfaceProps) {
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  // Force dark theme
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    setIsMounted(true);
    setOutput([
      isMobile ? 'Welcome to prasen.dev CLI! 👋' : ASCII_ART + '\nWelcome to my portfolio CLI! 👋',
      'Type "help" or "?" to see available commands.',
      ''
    ]);

    return () => {
      window.removeEventListener('resize', checkMobile);
      setIsMounted(false);
    };
  }, [isMobile]);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [command, ...args] = trimmedCmd.split(' ');
    const resolvedCmd = ALIASES[command as keyof typeof ALIASES] || command;
    
    if (resolvedCmd === 'clear') {
      setOutput([]);
      return;
    }

    if (resolvedCmd === 'gui') {
      setOutput(prev => [...prev, `$ ${cmd}`, 'Switching to GUI mode...', '']);
      setTimeout(onGuiCommand, 500);
      return;
    }

    if (resolvedCmd === 'theme' || resolvedCmd === 't') {
      setTheme('dark');
      setOutput(prev => [...prev, `$ ${cmd}`, 'Terminal is always in dark theme', '']);
      return;
    }

    const result = COMMANDS[resolvedCmd as CommandType];
    
    if (!result) {
      setOutput(prev => [...prev, `$ ${cmd}`, `Command not found: ${cmd}. Type "help" for available commands.`, '']);
      return;
    }

    const response = typeof result === 'function' ? result() : result;
    setOutput(prev => [...prev, `$ ${cmd}`, response, '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setCommandHistory(prev => [input, ...prev]);
    setHistoryIndex(-1);
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Add some visual feedback
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = 'Copied!';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 1000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed inset-0 bg-zinc-900 ${jetbrainsMono.variable} font-mono overflow-hidden flex flex-col`}
    >
      {/* Back Button */}
      <div className="absolute top-3 md:left-8 right-4 md:right-auto z-50">
        <button
          onClick={onGuiCommand}
          className="group flex items-center gap-2 px-3 py-2 rounded-md 
            bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50
            text-zinc-400 hover:text-zinc-200 transition-all duration-300
            hover:border-zinc-700/50 hover:bg-zinc-800/50
            [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05)]
            hover:[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_0_12px_rgba(255,255,255,.1)]"
          title="Back to GUI"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="hidden md:inline text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto" ref={outputRef}>
        <div className="max-w-3xl mx-auto p-4 md:px-8 space-y-4">
          {output.map((line, i) => (
            <div 
              key={i} 
              className="group relative whitespace-pre-wrap leading-relaxed selection:bg-blue-500/30"
            >
              <span className="text-zinc-200">
                {line.startsWith('http') ? (
                  <a 
                    href={line} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 [text-shadow:0_0_10px_theme(colors.green.400/40)] hover:[text-shadow:0_0_15px_theme(colors.green.400/60)] transition-all underline underline-offset-4"
                  >
                    {line}
                  </a>
                ) : (
                  formatCommandLine(line, 'dark')
                )}
              </span>
              {line.trim() && (
                <button
                  onClick={() => copyToClipboard(line)}
                  className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <div ref={bottomRef} className="h-4" />
          
          {/* Terminal Input */}
          <form onSubmit={handleSubmit} className="flex items-center group sticky bottom-0 bg-zinc-900/80 backdrop-blur-sm py-2">
            <span className="text-fuchsia-500 [text-shadow:0_0_10px_theme(colors.fuchsia.500/40)] transition-all group-hover:[text-shadow:0_0_15px_theme(colors.fuchsia.500/60)]">
              dev@prasen:~
            </span>
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none ml-2 text-zinc-200 caret-zinc-200 selection:bg-blue-500/30"
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
} 