"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Mic, Settings, Leaf, Bell } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Family", href: "/patients", icon: Users },
  { name: "Voice Check-ins", href: "/voice-logs", icon: Mic },
  { name: "Alerts Engine", href: "/alerts", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-100 h-screen fixed">
      <div className="flex items-center h-16 px-6 border-b border-gray-100 text-forest">
        <Leaf className="w-5 h-5 mr-3 text-forest" />
        <span className="text-lg font-bold tracking-tight text-gray-900">Agevine <span className="font-normal text-gray-500">Family</span></span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto px-3 py-6">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname !== "/" && pathname.startsWith(item.href) && item.href !== "/");
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
        </nav>
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="h-9 w-9 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-xs ring-1 ring-forest/20">
            AE
          </div>
          <div className="ml-3 truncate">
            <p className="text-sm font-medium text-gray-900">Amanda Evans</p>
            <p className="text-xs font-medium text-gray-500 truncate">Caregiver Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
