"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Home, User, BookOpen, HeartPulse } from "lucide-react";

type MenuItem = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: { title: string; path: string }[];
};

const menuItems: MenuItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Home size={18} />,
  },
  {
    title: "About Me",
    path: "/about",
    icon: <User size={18} />,
  },
  {
    title: "Newcastle 85+",
    icon: <BookOpen size={18} />,
    children: [
      { title: "Overview", path: "/newcastle-85" },
      { title: "Methodology", path: "/newcastle-85/methodology" },
      { title: "Publications", path: "/newcastle-85/publications" },
    ],
  },
  {
    title: "Health Expectancies",
    icon: <HeartPulse size={18} />,
    children: [
      { title: "Introduction", path: "/health-expectancies" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>(["Newcastle 85+", "Health Expectancies"]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link href="/">Andrew Kingston</Link>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.title} className="menu-group">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleGroup(item.title)}
                  className={`menu-header ${openGroups.includes(item.title) ? "active" : ""}`}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item.icon} {item.title}
                  </span>
                  {openGroups.includes(item.title) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <div className={`menu-items ${openGroups.includes(item.title) ? "open" : ""}`}>
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className={`menu-item-link ${pathname === child.path ? "active" : ""}`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link href={item.path!} className={`menu-header ${pathname === item.path ? "active" : ""}`}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {item.icon} {item.title}
                </span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
