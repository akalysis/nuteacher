"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Home, BookOpen, HeartPulse, FileText } from "lucide-react";
import { questionnaireDesignNavigationGroups } from "@/app/survey-methods/questionnaire-design/navigation";
import SiteLogo from "./SiteLogo";

type MenuItem = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const questionnaireDesignMenuItems = questionnaireDesignNavigationGroups
  .map((group) => ({
    title: group.title,
    path: group.href,
  }));

const menuItems: MenuItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Home size={18} />,
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
  {
    title: "Survey Methods",
    icon: <FileText size={18} />,
    children: [
      { title: "Introduction", path: "/survey-methods" },
      {
        title: "Questionnaire design",
        path: "/survey-methods/questionnaire-design",
        children: questionnaireDesignMenuItems,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState(pathname);

  useEffect(() => {
    const updateCurrentUrl = () => {
      setCurrentUrl(`${window.location.pathname}${window.location.hash}`);
    };

    updateCurrentUrl();
    window.addEventListener("hashchange", updateCurrentUrl);

    return () => {
      window.removeEventListener("hashchange", updateCurrentUrl);
    };
  }, [pathname]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  const isActiveItem = (item: MenuItem): boolean =>
    currentUrl === item.path || Boolean(item.children?.some((child) => isActiveItem(child)));

  const renderChildItem = (item: MenuItem) => {
    const itemKey = item.path ?? item.title;
    const isOpen = openGroups.includes(itemKey);
    const isActive = isActiveItem(item);

    if (item.children) {
      return (
        <div key={itemKey} className="menu-nested-group">
          <div className="menu-nested-row">
            <Link
              href={item.path!}
              className={`menu-item-link menu-item-parent ${isActive ? "active" : ""}`}
            >
              {item.title}
            </Link>
            <button
              type="button"
              onClick={() => toggleGroup(itemKey)}
              className={`menu-nested-toggle ${isOpen ? "active" : ""}`}
              aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.title}`}
            >
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
          <div className={`menu-items nested ${isOpen ? "open" : ""}`}>
            {item.children.map((child) => renderChildItem(child))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        href={item.path!}
        className={`menu-item-link ${currentUrl === item.path ? "active" : ""}`}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link href="/" aria-label="Andrew Kingston home">
          <SiteLogo />
        </Link>
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
                  {item.children.map((child) => renderChildItem(child))}
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
