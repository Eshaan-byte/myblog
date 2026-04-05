import { Home, Newspaper, Briefcase, GraduationCap, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Home", icon: Home, path: "/" },
  { label: "News", icon: Newspaper, path: "/category/news" },
  { label: "Opportunities", icon: Briefcase, path: "/category/opportunities" },
  { label: "Learn", icon: GraduationCap, path: "/category/learn" },
  { label: "Search", icon: Search, path: "/category/tech-blog" },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="glass-panel border-t border-border/40 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {items.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors duration-200 min-w-[56px] ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
