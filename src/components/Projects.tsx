import { Lang, t } from '../i18n';
import { IMG1, IMG2 } from './Hero';
import Reveal from './Reveal';
import ZoomImage from './ZoomImage';

export default function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="projects" className="px-4 py-24">
      <div className="container mx-auto">
        <Reveal><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t[lang].projectsTitle}</h2></Reveal>
        <p className="mt-2 text-sm text-muted-foreground">{lang === 'mn' ? 'Зураг дээр дарж томруулна уу' : 'Tap a photo to enlarge'}</p>
        <div className="mt-8 grid gap-5">
          {[IMG1, IMG2].map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <div className="glass overflow-hidden rounded-[2rem] p-3">
                <ZoomImage src={src} className="w-full rounded-[1.5rem] object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
