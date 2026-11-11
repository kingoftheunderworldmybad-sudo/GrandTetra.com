import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Lang, t } from '../i18n';
import ZoomImage from './ZoomImage';

export const IMG1 = 'https://images.fillout.com/912381/apgeydyfuj/generated-images/jc7xffGybWRhS17h4SWeQD/img_sqGWg4H3W2y0lABi.jpg';
export const IMG2 = 'https://images.fillout.com/912381/apgeydyfuj/generated-images/618Cn7eYNrmLjVAkPqBqM5/img_LLBuuKVK8-kdbqu_.jpg';

export default function Hero({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pt-28 pb-16">
      <div className="container mx-auto grid items-center gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-primary">{c.heroTag}</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight leading-tight tracking-tight sm:text-6xl">{c.heroTitle}</h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{c.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5">
              {c.cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="glass rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5">{c.cta2}</Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {c.stats.map(([v, l]) => (
              <div key={l} className="glass rounded-2xl p-4">
                <div className="text-2xl font-semibold tracking-tight">{v}</div>
                <div className="text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="glass rounded-[2rem] p-3">
          <ZoomImage src={IMG2} className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
