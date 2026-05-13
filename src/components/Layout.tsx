import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Start", icon: "🏠" },
  { to: "/themen", label: "Themen", icon: "📚" },
  { to: "/uebung", label: "Üben", icon: "🎯" },
  { to: "/grammatik", label: "Grammatik", icon: "✏️" },
  { to: "/profil", label: "Profil", icon: "👤" },
];

export default function Layout() {
  return (
    <div className="mx-auto flex min-h-full max-w-screen-sm flex-col">
      <main className="flex-1 px-4 pb-24 pt-6">
        <Outlet />
      </main>
      <nav
        className="fixed bottom-0 left-1/2 z-10 w-full max-w-screen-sm -translate-x-1/2 border-t border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/90"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {navItems.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 py-2 text-xs ${
                    isActive
                      ? "text-terra-600 dark:text-terra-400"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`
                }
              >
                <span className="text-xl leading-none">{n.icon}</span>
                <span>{n.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
