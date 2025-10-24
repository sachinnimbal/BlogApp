import CodeBlock from '@/components/CodeBlock';
import Alert from '@/components/Alert';
import Badge from '@/components/Badge';
import EndpointsTable from '@/components/EndpointsTable';
import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import TOC from '@/components/TOC';
import endpoints from '@/data/endpoints.json';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'create-operations', title: 'Create Operations', level: 2 },
  { id: 'read-operations', title: 'Read Operations', level: 2 },
  { id: 'update-operations', title: 'Update Operations', level: 2 },
  { id: 'delete-operations', title: 'Delete Operations', level: 2 },
  { id: 'utility-operations', title: 'Utility Operations', level: 2 },
];

export default function RestEndpoints() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: 'API Reference', path: '/overview' },
            { label: 'REST Endpoints' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="info" className="mb-4">
            API Reference
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            Auto-Generated REST Endpoints
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Complete reference for all 11 automatically generated CRUD endpoints.
          </p>
        </div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            When you annotate an entity with <code>@CrudX(name = "resource")</code>, 
            the framework automatically generates 11 production-ready REST endpoints. 
            All endpoints follow RESTful conventions and include comprehensive error handling.
          </p>

          <Alert variant="success" title="Base URL">
            All endpoints are prefixed with <code>/api/{'{'}{"}resource{'}'}</code> where{' '}
            <code>resource</code> is the name specified in <code>@CrudX</code> annotation.
          </Alert>

          <div className="not-prose my-6">
            <h3 className="text-lg font-semibold mb-3">Example</h3>
            <p className="text-sm text-muted-foreground mb-2">
              For an entity annotated with <code>@CrudX(name = "employees")</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>GET /api/employees - Get all employees</li>
              <li>POST /api/employees - Create an employee</li>
              <li>PATCH /api/employees/{'{'}id{'}'} - Update an employee</li>
            </ul>
          </div>
        </section>

        {/* Create Operations */}
        <section id="create-operations" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Create Operations</h2>

          {/* Create Single */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="info">POST</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Single Record</h3>
            <p className="text-muted-foreground mb-4">
              Creates a single entity. All validation rules are applied automatically.
            </p>

            <CodeBlock
              code={`// Request
POST /api/employees
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering",
  "salary": 75000
}`}
              language="bash"
              title="Request Example"
            />

            <CodeBlock
              code={`// Success Response (201 Created)
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Engineering",
    "salary": 75000,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "deleted": false
  }
}`}
              language="json"
              title="Success Response"
            />

            <Alert variant="warning" title="Validation" className="mt-4">
              All <code>@NotNull</code>, <code>@Size</code>, <code>@Email</code>, and 
              other Jakarta validation annotations are automatically enforced.
            </Alert>
          </div>

          {/* Create Batch */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="info">POST</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}/batch</code>
              <Badge variant="success">NEW v1.0.1</Badge>
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Batch Records</h3>
            <p className="text-muted-foreground mb-4">
              Creates up to 100,000 entities in a single request with smart duplicate handling.
            </p>

            <CodeBlock
              code={`// Request
POST /api/employees/batch?skipDuplicates=true
Content-Type: application/json

{
  "entities": [
    {
      "name": "Alice Smith",
      "email": "alice@example.com",
      "department": "Marketing",
      "salary": 70000
    },
    {
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "department": "Sales",
      "salary": 65000
    }
  ]
}`}
              language="bash"
              title="Batch Request Example"
            />

            <CodeBlock
              code={`// Response (201 Created)
{
  "success": true,
  "data": {
    "totalProcessed": 2,
    "successCount": 2,
    "failureCount": 0,
    "createdEntities": [
      { "id": 2, "name": "Alice Smith", "email": "alice@example.com", ... },
      { "id": 3, "name": "Bob Johnson", "email": "bob@example.com", ... }
    ],
    "failures": []
  }
}`}
              language="json"
              title="Batch Response"
            />

            <Alert variant="info" title="Skip Duplicates">
              Set <code>skipDuplicates=true</code> to automatically skip records with 
              duplicate <code>@CrudXUniqueConstraint</code> fields instead of failing.
            </Alert>
          </div>
        </section>

        {/* Read Operations */}
        <section id="read-operations" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Read Operations</h2>

          {/* Get All */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="success">GET</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get All Records</h3>
            <p className="text-muted-foreground mb-4">
              Retrieves all entities. If count exceeds 1000, automatically returns paginated 
              response with first 1000 records.
            </p>

            <CodeBlock
              code={`// Request
GET /api/employees

// Response
{
  "success": true,
  "data": [
    { "id": 1, "name": "John Doe", ... },
    { "id": 2, "name": "Alice Smith", ... }
  ],
  "pagination": {
    "totalRecords": 2,
    "isAutoPaginated": false
  }
}`}
              language="bash"
              showLineNumbers={false}
            />

            <Alert variant="warning" title="Auto-Pagination">
              When total records exceed 1000, response includes pagination metadata and 
              only returns first 1000 records. Use <code>/paged</code> endpoint for custom pagination.
            </Alert>
          </div>

          {/* Get Paginated */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="success">GET</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}/paged</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Paginated Records</h3>
            <p className="text-muted-foreground mb-4">
              Retrieves entities with custom pagination and sorting. Supports up to 100,000 
              records per page.
            </p>

            <div className="not-prose mb-4">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3">Parameter</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3"><code>page</code></td>
                    <td>int</td>
                    <td>0</td>
                    <td>Page number (0-indexed)</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code>size</code></td>
                    <td>int</td>
                    <td>10</td>
                    <td>Items per page (max: 100,000)</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code>sortBy</code></td>
                    <td>String</td>
                    <td>-</td>
                    <td>Field name to sort by</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code>sortDirection</code></td>
                    <td>String</td>
                    <td>ASC</td>
                    <td>Sort direction (ASC/DESC)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              code={`// Request
GET /api/employees/paged?page=0&size=20&sortBy=name&sortDirection=ASC

// Response
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 0,
    "pageSize": 20,
    "totalPages": 5,
    "totalRecords": 97,
    "hasNext": true,
    "hasPrevious": false
  }
}`}
              language="bash"
              showLineNumbers={false}
            />
          </div>

          {/* Get by ID */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="success">GET</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}{'/{'}id{'}'}</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get by ID</h3>
            <p className="text-muted-foreground mb-4">
              Retrieves a single entity by its ID.
            </p>

            <CodeBlock
              code={`// Request
GET /api/employees/1

// Response (200 OK)
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Engineering",
    "salary": 75000,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}

// Not Found (404)
{
  "success": false,
  "message": "Entity not found with id: 999",
  "timestamp": "2024-01-15T10:35:00Z"
}`}
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Update Operations */}
        <section id="update-operations" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Update Operations</h2>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="warning">PATCH</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}{'/{'}id{'}'}</code>
              <Badge variant="success">Enhanced v1.0.1</Badge>
            </div>
            <h3 className="text-xl font-semibold mb-3">Partial Update</h3>
            <p className="text-muted-foreground mb-4">
              Updates specific fields of an entity with smart validation and field protection.
            </p>

            <div className="not-prose mb-4">
              <Alert variant="info" title="Smart Validation (Zero Config)">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Auto-Protected:</strong> id, createdAt, createdBy</li>
                  <li><strong>Immutable Fields:</strong> @CrudXImmutable enforced</li>
                  <li><strong>Bean Validation:</strong> @Email, @Size, @NotNull checked</li>
                  <li><strong>Unique Constraints:</strong> @CrudXUniqueConstraint validated</li>
                </ul>
              </Alert>
            </div>

            <CodeBlock
              code={`// Request
PATCH /api/employees/1
Content-Type: application/json

{
  "department": "Management",
  "salary": 95000  // Will be ignored if @CrudXImmutable
}

// Response (200 OK)
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Management",
    "salary": 75000,  // Unchanged (immutable)
    "updatedAt": "2024-01-15T14:20:00Z"
  }
}`}
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Delete Operations */}
        <section id="delete-operations" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Delete Operations</h2>

          {/* Delete Single */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="error">DELETE</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}{'/{'}id{'}'}</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Delete by ID</h3>
            <p className="text-muted-foreground mb-4">
              Deletes a single entity by its ID.
            </p>

            <CodeBlock
              code={`// Request
DELETE /api/employees/1

// Response (200 OK)
{
  "success": true,
  "message": "Entity deleted successfully"
}`}
              language="bash"
              showLineNumbers={false}
            />
          </div>

          {/* Delete Batch */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="error">DELETE</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}/batch</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Delete Batch</h3>
            <p className="text-muted-foreground mb-4">
              Deletes multiple entities by their IDs (max 1000 per request).
            </p>

            <CodeBlock
              code={`// Request
DELETE /api/employees/batch
Content-Type: application/json

{
  "ids": [1, 2, 3, 4, 5]
}

// Response (200 OK)
{
  "success": true,
  "data": {
    "totalProcessed": 5,
    "successCount": 5,
    "failureCount": 0
  }
}`}
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Utility Operations */}
        <section id="utility-operations" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Utility Operations</h2>

          {/* Count */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="success">GET</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}/count</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Count Records</h3>
            <p className="text-muted-foreground mb-4">
              Returns the total count of entities in the database.
            </p>

            <CodeBlock
              code={`// Request
GET /api/employees/count

// Response (200 OK)
{
  "success": true,
  "data": {
    "count": 1247
  }
}`}
              language="bash"
              showLineNumbers={false}
            />
          </div>

          {/* Exists */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="success">GET</Badge>
              <code className="text-lg font-mono">/api/{'{'}resource{'}'}/exists/{'{'}{"}id{'}'}</code>
            </div>
            <h3 className="text-xl font-semibold mb-3">Check Existence</h3>
            <p className="text-muted-foreground mb-4">
              Checks if an entity exists with the given ID.
            </p>

            <CodeBlock
              code={`// Request
GET /api/employees/exists/1

// Response (200 OK)
{
  "success": true,
  "data": {
    "exists": true
  }
}`}
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Complete Endpoints Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Complete API Reference</h2>
          <p className="text-muted-foreground mb-6">
            Interactive table with all endpoints. Click to see example requests and responses.
          </p>
          <EndpointsTable endpoints={endpoints} />
        </section>

        <Pagination prev={{ title: 'Entities', path: '/entities' }} />
      </div>

      {/* Right Sidebar - TOC */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
