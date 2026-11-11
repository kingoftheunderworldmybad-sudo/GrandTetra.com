import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { submitQuote } from 'zitejs/api';
import { Lang, services, t } from '../i18n';
import Reveal from './Reveal';
import OwnerInfo from './OwnerInfo';

const field = 'w-full rounded-xl border border-border bg-white/70 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30';
const empty = { name: '', phone: '', service: '', message: '' };

export default function Contact({ lang }: { lang: Lang }) {
  const c = t[lang];
  const [f, setF] = useState(empty);
  const [hp, setHp] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || f.phone.replace(/\D/g, '').length < 8) return setError(c.err);
    setError('');
    setBusy(true);
    try {
      await submitQuote({ ...f, website: hp, elapsedMs: Date.now() - started.current });
      toast.success(c.sent);
      setF(empty);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : c.err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="px-4 py-20">
      <div className="container mx-auto max-w-3xl space-y-6">
        <Reveal><OwnerInfo lang={lang} /></Reveal>
        <Reveal>
          <form onSubmit={submit} noValidate className="glass space-y-4 rounded-2xl p-6 sm:p-9">
            <h2 className="text-2xl font-semibold tracking-tight">{c.contactTitle}</h2>
            <p className="text-muted-foreground">{c.contactSub}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} autoComplete="name" maxLength={100} placeholder={c.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              <input className={field} autoComplete="tel" inputMode="tel" maxLength={15} placeholder={c.phone} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
            </div>
            <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" />
            <select className={field} value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })}>
              <option value="">{c.service}</option>
              {services.map((s) => <option key={s.en} value={s.mn}>{lang === 'mn' ? s.mn : s.en}</option>)}
            </select>
            <textarea className={field} rows={4} maxLength={2000} placeholder={c.message} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:brightness-95 disabled:opacity-60 sm:w-auto sm:px-8">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} {c.send}
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">{c.privacy}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
