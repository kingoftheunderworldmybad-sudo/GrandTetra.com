import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { zite } from 'zitejs/db';

// Strip control chars and angle brackets. React escapes output anyway; this keeps stored data clean.
const clean = (s: string, max: number) =>
  s.replace(/[\u0000-\u001F\u007F<>]/g, ' ').replace(/[ \t]+/g, ' ').trim().slice(0, max);

export default createEndpoint({
  description: 'Saves a quote request from the website contact form',
  inputSchema: z.object({
    name: z.string(),
    phone: z.string(),
    service: z.string(),
    message: z.string(),
    website: z.string().optional(), // honeypot, humans never see it
    elapsedMs: z.number().optional(), // time spent on the form
  }),
  outputSchema: z.object({ success: z.boolean() }),
  execute: async ({ input }) => {
    const p = z.object({ name: z.string(), phone: z.string(), service: z.string(), message: z.string() }).safeParse(input);
    if (!p.success) throw new Error('Invalid request.');

    // Bots: filled honeypot or submitted faster than a person can type. Pretend it worked.
    if (input.website || (input.elapsedMs ?? 0) < 2500) return { success: true };

    const name = clean(p.data.name, 100);
    const phone = p.data.phone.replace(/[^\d+]/g, '').slice(0, 15);
    const message = clean(p.data.message, 2000);
    const service = clean(p.data.service, 120);
    if (name.length < 2 || phone.replace(/\D/g, '').length < 8) throw new Error('Please check your name and phone number.');

    // Rate limit: max 3 requests per phone number per hour.
    const { records } = await zite.quoteRequests.findAll({ filters: { phone }, limit: 20, fields: ['submittedAt'] } as never);
    const hourAgo = Date.now() - 60 * 60 * 1000;
    const recent = records.filter((r) => r.submittedAt && new Date(r.submittedAt).getTime() > hourAgo).length;
    if (recent >= 3) throw new Error('Too many requests. Please call us instead.');

    await zite.quoteRequests.create({ record: { name, phone, service, message } });
    return { success: true };
  },
});
