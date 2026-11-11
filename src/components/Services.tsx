import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hammer, Layers, PaintRoller, DoorOpen, Truck } from 'lucide-react';
import { Lang, services, t } from '../i18n';
import Reveal from './Reveal';
import ZoomImage from './ZoomImage';

const icons = { plaster: PaintRoller, masonry: Layers, floor: Hammer, install: DoorOpen, other: Truck };
const cats = ['all', 'plaster', 'masonry', 'floor', 'install', 'other'] as const;

export default function Services({ lang }: { lang: Lang }) {
  const c = t[lang];
  const [cat, setCat] = useState<(typeof cats)[number]>('all');
  const list = services.filter((s) => cat === 'all' || s.cat === cat);
  return (
    <section id="services" className="px-4 py-24">
      <div className="container mx-auto">
        <Reveal><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{c.servicesTitle}</h2></Reveal>
        <div className="-mx-4 mt-8 overflow-x-auto px-4 no-scrollbar md:mx-0 md:overflow-visible md:px-0"><div className="glass inline-flex gap-1 rounded-full p-1.5">
          {cats.map((k) => (
            <button key={k} onClick={() => setCat(k)} className="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold">
              {cat === k && <motion.span layoutId="svc" className="glass-strong absolute inset-0 rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className={`relative ${cat === k ? '' : 'text-muted-foreground'}`}>{c.cats[k]}</span>
            </button>
          ))}
        </div></div>
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((s) => {
              const I = icons[s.cat];
              return (
                <motion.div layout key={s.en} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass overflow-hidden rounded-3xl p-2.5 transition hover:-translate-y-1">
                  <ZoomImage src={s.img} alt={s.en} className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" />
                  <div className="flex items-center gap-3 p-3">
                  <div className="glass-strong flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"><I className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="font-bold">{lang === 'mn' ? s.mn : s.en}</div>
                    <div className="text-xs text-muted-foreground">{lang === 'mn' ? s.en : s.mn}</div>
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
