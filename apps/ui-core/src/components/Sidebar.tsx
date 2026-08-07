"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Mic, Settings, Leaf } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "My Family", href: "/patients", icon: Users },
  { name: "Voice Check-ins", href: "/voice-logs", icon: Mic },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed">
      <div className="flex items-center h-16 px-6 border-b border-gray-100 text-forest">
        <Leaf className="w-6 h-6 mr-2" />
        <span className="text-xl font-bold tracking-tight">Agevine <span className="font-normal text-gray-500">Family</span></span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname !== "/" && pathname.startsWith(item.href) && item.href !== "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            AE
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Amanda Evans</p>
            <p className="text-xs font-medium text-gray-500">Primary Caregiver</p>
          </div>
        </div>
      </div>
    </div>
  );
}
