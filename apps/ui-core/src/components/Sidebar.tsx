"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Mic, Settings, Leaf, Bell, BookOpen, Code, Watch } from "lucide-react";
import { API_URL } from "@/lib/api";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Family", href: "/patients", icon: Users },
  { name: "Device Manager", href: "/devices", icon: Watch },
  { name: "Alerts Engine", href: "/alerts", icon: Bell },
  { name: "Voice Check-ins", href: "/voice-logs", icon: Mic },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("Amanda Evans");
  const [userInitials, setUserInitials] = useState("AE");

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const apiUrl = API_URL;
        const res = await fetch(`${apiUrl}/api/user`, { cache: 'no-store' });
        if (res.ok) {
          const user = await res.json();
          if (mounted && user?.fullName) {
            setUserName(user.fullName);
            const initials = user.fullName.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase();
            setUserInitials(initials);
          }
        }
      } catch(e) {}
    };
    fetchUser();

    const handleProfileUpdate = () => {
      fetchUser();
    };
    window.addEventListener('userProfileUpdated', handleProfileUpdate);

    return () => { 
      mounted = false; 
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
    };
  }, []);

  return (
    <div className="flex flex-col w-64 bg-white border-r border-zinc-200/60 h-screen fixed">
      <div className="flex items-center h-16 px-6 border-b border-zinc-200/60 text-forest">
        <Leaf className="w-6 h-6 mr-2" />
        <span className="text-xl font-bold tracking-tight">Agevine <span className="font-normal text-zinc-500">Family</span></span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto px-3 py-6">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname ? (pathname === item.href || (pathname !== "/" && pathname.startsWith(item.href) && item.href !== "/")) : false;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-forest bg-forest/10"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-forest" : "text-zinc-400"}`} />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-6 pb-2">
            <p className="px-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Help & Resources
            </p>
          </div>
          
          <a
            href={process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3002"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          >
            <BookOpen className="mr-3 flex-shrink-0 h-5 w-5 text-zinc-400" />
            Documentation
          </a>
          <a
            href="https://github.com/agevine/agevine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          >
            <Code className="mr-3 flex-shrink-0 h-5 w-5 text-zinc-400" />
            Star on GitHub
          </a>

        </nav>
      </div>
      <div className="p-6 border-t border-zinc-200/60">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-forest/10 flex items-center justify-center text-forest font-bold text-sm">
            {userInitials}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-zinc-900">{userName}</p>
            <p className="text-xs font-medium text-zinc-500">Caregiver Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
