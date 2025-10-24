import { NavLink } from 'react-router-dom';
import toc from '../data/toc.json';
import { useScrollSpy } from '../hooks/useScrollSpy';

export default function Sidebar() {
  const ids = toc.flatMap((g) => g.items.map((i) => i.id));
  const activeId = useScrollSpy(ids);

  return (
    <nav aria-label="Main" className="text-sm pr-2">
      {toc.map((group) => (
        <div key={group.title} className="mb-4">
          <div className="px-2 py-2 text-xs uppercase tracking-wide text-gray-500">{group.title}</div>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `block rounded-md px-2 py-1.5 border border-transparent hocus:bg-gray-100 dark:hocus:bg-gray-800 ${
                      isActive || activeId === item.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
