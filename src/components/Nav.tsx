import { motion } from 'framer-motion';
import LogoMark from './LogoMark';
import { Link, useLocation } from 'react-router-dom';
import { Lang, t } from '../i18n';

const keys = [['home', '/'], ['about', '/about'], ['services', '/services'], ['projects', '/projects'], ['contact', '/contact']] as const;

export default function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { pathname } = useLocation();
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3">
      <nav className="glass flex max-w-full items-center gap-1 rounded-full p-1.5">
        <Link to="/" className="flex shrink-0 items-center gap-2 pl-2 pr-1 font-extrabold sm:pr-3"><LogoMark className="h-8 w-8" /><span className="hidden lg:inline">Grand Tetra</span></Link>
        <div className="no-scrollbar flex min-w-0 overflow-x-auto md:overflow-visible">
          {keys.map(([k, path]) => {
            const on = pathname === path;
            return (
              <Link key={k} to={path} className="relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm">
                {on && <motion.span layoutId="tab" className="glass-strong absolute inset-0 rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className={`relative ${on ? 'text-foreground' : 'text-muted-foreground'}`}>{t[lang].nav[k]}</span>
              </Link>
            );
          })}
        </div>
        <div className="ml-1 flex shrink-0 rounded-full bg-white/40 p-0.5">
          {(['mn', 'en'] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`rounded-full px-2.5 py-1.5 text-xs font-bold uppercase transition ${lang === l ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}>
              {l}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
