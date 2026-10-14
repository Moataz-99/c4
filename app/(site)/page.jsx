import TabShell from '@/components/site/TabShell';
import SiteEffects from '@/components/site/SiteEffects';
import { readDb } from '@/lib/db';
import { mergeContent } from '@/lib/content';

/* read the content on every visit, so a save in the dashboard shows up immediately */
export const dynamic = 'force-dynamic';

export default async function Home() {
  let saved = null;
  try { saved = (await readDb()).content; } catch { /* database unreachable — fall back to the default wording */ }
  const content = mergeContent(saved);
  return (
    <>
      <TabShell content={content} />
      <SiteEffects hint={content.game.toyHint} />
    </>
  );
}
