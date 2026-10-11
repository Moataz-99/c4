import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readDb, isPersistent } from '@/lib/db';
import { COOKIE, verifyToken } from '@/lib/auth';
import Dashboard from '@/components/admin/Dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!(await verifyToken(token))) redirect('/admin/login');
  const db = await readDb();
  return <Dashboard initial={db} persistent={isPersistent} />;
}
