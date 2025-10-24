import { Link, useLocation } from 'react-router-dom';
import toc from '../data/toc.json';

export default function Pagination() {
  const { pathname } = useLocation();
  const items = toc.flatMap((g) => g.items);
  const idx = items.findIndex((i) => i.href === pathname);
  const prev = idx > 0 ? items[idx - 1] : null;
  const next = idx >= 0 && idx < items.length - 1 ? items[idx + 1] : null;

  return (
    <div className="flex items-center justify-between text-sm">
      <div>
        {prev && (
          <Link className="hocus:underline" to={prev.href}>← {prev.title}</Link>
        )}
      </div>
      <div>
        {next && (
          <Link className="hocus:underline" to={next.href}>{next.title} →</Link>
        )}
      </div>
    </div>
  );
}
