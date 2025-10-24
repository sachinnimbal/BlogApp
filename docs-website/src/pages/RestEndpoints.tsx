import EndpointsTable from '../components/EndpointsTable';

export default function RestEndpoints() {
  return (
    <div className="prose max-w-none">
      <h1 id="rest-endpoints" className="h1">REST Endpoints</h1>
      <p className="lead">HTTP interface for your resources with example responses.</p>
      <EndpointsTable />
    </div>
  );
}
