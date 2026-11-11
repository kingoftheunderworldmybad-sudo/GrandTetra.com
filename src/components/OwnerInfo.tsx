import { Phone, Mail } from 'lucide-react';
import { Lang, owner } from '../i18n';

export default function OwnerInfo({ lang }: { lang: Lang }) {
  const items = [
    { icon: Phone, label: lang === 'mn' ? 'Утас' : 'Phone', value: owner.phone, href: `tel:+976${owner.phone}` },
    { icon: Mail, label: 'Gmail', value: owner.email, href: `mailto:${owner.email}` },
  ];
  return (
    <div className="glass rounded-[2rem] p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold">{lang === 'mn' ? 'Холбоо барих / Эзэмшигчийн мэдээлэл' : 'Contact / Owner info'}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{owner.name[lang]}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map(({ icon: I, label, value, href }) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="glass-strong flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"><I className="h-5 w-5 text-primary" /></span>
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">{label}</span>
              <span className="block truncate font-semibold">{value}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
