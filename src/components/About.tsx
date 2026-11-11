import { Building2, Handshake } from 'lucide-react';
import { Lang, t } from '../i18n';
import Reveal from './Reveal';

export default function About({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section id="about" className="px-4 py-24">
      <div className="container mx-auto">
        <Reveal><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{c.aboutTitle}</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[[Building2, c.about1], [Handshake, c.about2]].map(([Icon, text], i) => {
            const I = Icon as typeof Building2;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass h-full rounded-3xl p-8">
                  <div className="glass-strong mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"><I className="h-6 w-6 text-primary" /></div>
                  <p className="text-lg leading-relaxed">{text as string}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
