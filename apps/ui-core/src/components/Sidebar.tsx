"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Mic, Settings, Leaf, Bell, BookOpen, Code } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Family", href: "/patients", icon: Users },
  { name: "Voice Check-ins", href: "/voice-logs", icon: Mic },
  { name: "Alerts Engine", href: "/alerts", icon: Bell },
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
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
    <div className="flex flex-col w-64 bg-white border-r border-gray-100 h-screen fixed">
      <div className="flex items-center h-16 px-6 border-b border-gray-100 text-forest">
        <Leaf className="w-5 h-5 mr-3 text-forest" />
        <span className="text-lg font-bold tracking-tight text-gray-900">Agevine <span className="font-normal text-gray-500">Family</span></span>
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
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
                  isActive
                    ? "text-forest bg-forest/10"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-4 w-4 ${isActive ? "text-forest" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-6 pb-2">
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Community & Resources
            </p>
          </div>
          
          <a
            href="https://github.com/agevine/agevine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <Code className="mr-3 flex-shrink-0 h-4 w-4 text-gray-400" />
            Star on GitHub
          </a>
          <a
            href={process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3002"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <BookOpen className="mr-3 flex-shrink-0 h-4 w-4 text-gray-400" />
            Documentation
          </a>

        </nav>
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="h-9 w-9 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-xs ring-1 ring-forest/20">
            {userInitials}
          </div>
          <div className="ml-3 truncate">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs font-medium text-gray-500 truncate">Caregiver Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
