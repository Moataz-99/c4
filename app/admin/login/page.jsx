import { authConfigured } from '@/lib/auth';
import LogoMark from '@/components/site/LogoMark';

export const dynamic = 'force-dynamic';

export default async function Login({ searchParams }) {
  const { error } = await searchParams;
  const ready = authConfigured();
  return (
    <main className="login-wrap">
      <form className="login" method="post" action="/api/auth/login">
        <div className="login-brand">connect <LogoMark size={30} /></div>
        <h1>admin sign in</h1>
        <p className="login-sub">drop the right disc to get in.</p>
        {!ready && <div className="banner"><i />Set <b>&nbsp;ADMIN_PASSWORD&nbsp;</b> in your Vercel environment variables, then redeploy.</div>}
        {error && <div className="banner" style={{ background: '#FFE9F2' }}><i style={{ background: 'var(--mg)' }} />That password didn't connect. Try again.</div>}
        <label htmlFor="pw">password</label>
        <input id="pw" className="input" type="password" name="password" autoComplete="current-password" required autoFocus disabled={!ready} />
        <button className="btn btn-mg" style={{ '--d': '84px', fontSize: '13px' }} disabled={!ready}>sign in</button>
        <a href="/" className="login-back">← back to the site</a>
      </form>
    </main>
  );
}
