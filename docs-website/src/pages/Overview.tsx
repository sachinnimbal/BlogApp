import CodeBlock from '../components/CodeBlock';
import Alert from '../components/Alert';
import EndpointsTable from '../components/EndpointsTable';
import Tabs from '../components/Tabs';

export default function Overview() {
  return (
    <div className="prose prose-invert:dark max-w-none">
      <h1 id="overview" className="h1 gradient-text">Welcome to Premium Docs</h1>
      <p className="lead">A polished documentation starter built with React 18, Vite 5, Tailwind 3, and modern UX patterns.</p>

      <div className="section">
        <h2 id="features" className="h2">Highlights</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          <li>Dark/Light themes with persistence</li>
          <li>Responsive layout with sticky sidebars</li>
          <li>Accessible components and keyboard support</li>
          <li>Lazy-loaded syntax highlighting</li>
        </ul>
      </div>

      <div className="section">
        <h2 id="install" className="h2">Quickstart</h2>
        <CodeBlock language="bash" value={`npm install\nnpm run dev`} />
      </div>

      <div className="section">
        <h2 id="alerts" className="h2">Alerts</h2>
        <div className="space-y-3">
          <Alert title="Heads up!">Remember to review accessibility with keyboard only navigation.</Alert>
          <Alert type="warning" title="Beta component">Tabs have arrow key support.</Alert>
        </div>
      </div>

      <div className="section">
        <h2 id="tabs" className="h2">Tabs</h2>
        <Tabs
          tabs={[
            { id: 'react', label: 'React', content: <CodeBlock language="tsx" value={`export function App(){\n  return <div>Hello</div>\n}`} /> },
            { id: 'bash', label: 'bash', content: <CodeBlock language="bash" value={`echo hello`} /> },
          ]}
        />
      </div>

      <div className="section">
        <h2 id="api" className="h2">API at a glance</h2>
        <EndpointsTable />
      </div>
    </div>
  );
}
