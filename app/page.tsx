// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin/dashboard'); // Auto-redirect to your dashboard
}
