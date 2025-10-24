import Badge from './Badge';
import CopyButton from './CopyButton';
import endpoints from '../data/endpoints.json';

export default function EndpointsTable() {
  const methodColor: Record<string, 'green' | 'blue' | 'red' | 'violet'> = {
    GET: 'green',
    POST: 'blue',
    DELETE: 'red',
    PUT: 'violet',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2 pr-4">Method</th>
            <th className="py-2 pr-4">Path</th>
            <th className="py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((e) => (
            <tr key={e.path} className="border-t border-gray-200 dark:border-gray-800">
              <td className="py-2 pr-4"><Badge color={methodColor[e.method] || 'gray'}>{e.method}</Badge></td>
              <td className="py-2 pr-4 font-mono">{e.path}</td>
              <td className="py-2">
                <div className="flex items-center gap-3">
                  <span className="flex-1">{e.description}</span>
                  <CopyButton text={`curl -X ${e.method} https://api.example.com${e.path}`} />
                </div>
                {e.example && (
                  <pre className="mt-2 p-3 rounded-md bg-gray-100 dark:bg-gray-900 text-xs overflow-x-auto"><code>{JSON.stringify(e.example, null, 2)}</code></pre>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
