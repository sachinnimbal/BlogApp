import CodeBlock from '../components/CodeBlock';

export default function GettingStarted() {
  return (
    <div className="prose max-w-none">
      <h1 id="getting-started" className="h1">Getting Started</h1>
      <p className="lead">Install dependencies and start the dev server.</p>
      <CodeBlock language="bash" value={`npm install\nnpm run dev`} />
    </div>
  );
}
