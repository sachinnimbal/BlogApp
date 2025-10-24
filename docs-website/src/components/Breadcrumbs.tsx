import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
      <ol className="flex items-center gap-1">
        <li><Link className="hocus:underline" to="/overview">Home</Link></li>
        {parts.map((p, i) => {
          const href = '/' + parts.slice(0, i + 1).join('/');
          return (
            <li key={href} className="flex items-center gap-1">
              <span>/</span>
              <Link className="hocus:underline" to={href}>{p.replace('-', ' ')}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
