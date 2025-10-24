import { motion } from 'framer-motion';
import { ArrowRight, Zap, Code2, Layers, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Alert from '@/components/Alert';
import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import TOC from '@/components/TOC';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'key-features', title: 'Key Features', level: 2 },
  { id: 'quick-example', title: 'Quick Example', level: 2 },
  { id: 'next-steps', title: 'Next Steps', level: 2 },
];

export default function Overview() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Overview' }]} className="mb-6" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Badge variant="info" className="mb-4">
            Version 1.0.1
          </Badge>
          <h1 className="hero-title mb-4">
            Spring Boot <span className="gradient-text">CrudX Framework</span>
          </h1>
          <p className="hero-subtitle max-w-3xl">
            A powerful Spring Boot framework that automatically generates production-ready 
            REST APIs with zero boilerplate code. Built for developers who value rapid 
            development without sacrificing control or customization.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/getting-started"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 focus-ring transition-opacity"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/sachinnimbal/crudx-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent focus-ring transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card>
            <div className="text-center p-2">
              <div className="text-4xl font-bold gradient-text mb-2">0</div>
              <div className="text-sm font-medium text-muted-foreground">
                Boilerplate Code
              </div>
            </div>
          </Card>
          <Card>
            <div className="text-center p-2">
              <div className="text-4xl font-bold gradient-text mb-2">11</div>
              <div className="text-sm font-medium text-muted-foreground">
                Auto Endpoints
              </div>
            </div>
          </Card>
          <Card>
            <div className="text-center p-2">
              <div className="text-4xl font-bold gradient-text mb-2">100K</div>
              <div className="text-sm font-medium text-muted-foreground">
                Batch Limit
              </div>
            </div>
          </Card>
        </div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            CrudX is a revolutionary Spring Boot framework that eliminates the need for 
            repetitive CRUD operations. Simply annotate your entity classes, and CrudX 
            automatically generates:
          </p>
          <ul>
            <li><strong>11 REST API endpoints</strong> per entity</li>
            <li><strong>Service layer</strong> with business logic</li>
            <li><strong>Repository layer</strong> with database operations</li>
            <li><strong>Smart validation</strong> and error handling</li>
            <li><strong>Batch operations</strong> with configurable limits</li>
            <li><strong>Performance monitoring</strong> dashboard</li>
          </ul>

          <Alert variant="success" title="Zero Configuration Required" className="my-6">
            CrudX works out of the box with intelligent defaults. Just add one annotation 
            to your entity class and you're ready to go!
          </Alert>
        </section>

        {/* Key Features */}
        <section id="key-features" className="mb-12">
          <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] font-semibold tracking-tight mb-6">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Zero Boilerplate</h3>
                  <p className="text-sm text-muted-foreground">
                    One annotation generates controllers, services, repositories, and 11 
                    REST endpoints automatically.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Smart Validation</h3>
                  <p className="text-sm text-muted-foreground">
                    Auto-protects fields, enforces immutability, validates constraints, 
                    and handles duplicates intelligently.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Batch Operations</h3>
                  <p className="text-sm text-muted-foreground">
                    Create, update, or delete up to 100,000 records in a single request 
                    with automatic pagination.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Full Customization</h3>
                  <p className="text-sm text-muted-foreground">
                    Override any auto-generated endpoint with your custom logic while 
                    keeping others automated.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Quick Example */}
        <section id="quick-example" className="prose mb-12">
          <h2>Quick Example</h2>
          <p>Here's all the code you need to create a full CRUD API:</p>
          <div className="not-prose">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
              <code>{`@CrudX(name = "employees")
@Entity
public class Employee extends CrudXEntity {
    
    @CrudXUniqueConstraint
    @Email
    private String email;
    
    private String name;
    private String department;
    
    @CrudXImmutable
    private Double salary;
}`}</code>
            </pre>
          </div>
          <p>
            That's it! CrudX automatically creates 11 endpoints including create, read, 
            update, delete, batch operations, pagination, and more.
          </p>

          <Alert variant="info" title="Auto-Generated Endpoints" className="my-6">
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li>POST /api/employees - Create single</li>
              <li>POST /api/employees/batch - Create batch</li>
              <li>GET /api/employees - Get all</li>
              <li>GET /api/employees/paged - Get paginated</li>
              <li>GET /api/employees/{'{'}id{'}'} - Get by ID</li>
              <li>PATCH /api/employees/{'{'}id{'}'} - Partial update</li>
              <li>DELETE /api/employees/{'{'}id{'}'} - Delete single</li>
              <li>DELETE /api/employees/batch - Delete batch</li>
              <li>GET /api/employees/count - Count records</li>
              <li>GET /api/employees/exists/{'{'}id{'}'} - Check existence</li>
            </ul>
          </Alert>
        </section>

        {/* Next Steps */}
        <section id="next-steps" className="prose mb-12">
          <h2>Next Steps</h2>
          <p>Ready to dive deeper? Here are some resources to explore:</p>
          <ul>
            <li>
              <Link to="/getting-started">Getting Started</Link> - Installation and 
              5-step quick setup
            </li>
            <li>
              <Link to="/annotations">Annotations</Link> - Learn about @CrudX and 
              @CrudXImmutable
            </li>
            <li>
              <Link to="/entities">Entities</Link> - Working with CrudX base entities
            </li>
            <li>
              <Link to="/rest-endpoints">REST Endpoints</Link> - Complete API reference 
              with examples
            </li>
          </ul>
        </section>

        <Pagination
          next={{ title: 'Getting Started', path: '/getting-started' }}
        />
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
