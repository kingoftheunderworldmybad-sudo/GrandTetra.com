import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@project/components/ui/sonner';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Lang, t } from './i18n';

function Pages({ lang }: { lang: Lang }) {
  const location = useLocation();
  useEffect(() => window.scrollTo({ top: 0 }), [location.pathname]);
  return (
    <AnimatePresence mode="wait">
      <motion.main key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="min-h-screen pt-16">
        <Routes location={location}>
          <Route path="/" element={<Hero lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/services" element={<Services lang={lang} />} />
          <Route path="/projects" element={<Projects lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="*" element={<Hero lang={lang} />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'mn');
  useEffect(() => { localStorage.setItem('lang', lang); document.documentElement.lang = lang; }, [lang]);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -right-32 -top-24 h-[28rem] w-[34rem] rotate-[-8deg] rounded-[40%] bg-primary/10 blur-3xl" />
        </div>
        <Nav lang={lang} setLang={setLang} />
        <Pages lang={lang} />
        <footer className="px-4 pb-10 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} {lang === 'mn' ? 'Гранд Тетра ХХК' : 'Grand Tetra XXK'} · {t[lang].footer}</footer>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
