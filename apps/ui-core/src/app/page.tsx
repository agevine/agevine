import { redirect } from 'next/navigation';

export default function Home() {
  // For the open-source version, we redirect straight to the dashboard.
  redirect('/dashboard');
}
