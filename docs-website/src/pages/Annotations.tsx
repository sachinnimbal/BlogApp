import CodeBlock from '@/components/CodeBlock';
import Alert from '@/components/Alert';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import TOC from '@/components/TOC';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'crudx', title: '@CrudX', level: 2 },
  { id: 'crudx-immutable', title: '@CrudXImmutable', level: 2 },
  { id: 'crudx-unique', title: '@CrudXUniqueConstraint', level: 2 },
  { id: 'enable-crudx', title: '@EnableCrudX', level: 2 },
];

export default function Annotations() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: 'Core Concepts', path: '/overview' },
            { label: 'Annotations' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">
            Core Concept
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            CrudX Annotations
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Learn how to use CrudX annotations to generate production-ready CRUD APIs automatically.
          </p>
        </div>

        {/* Overview */}
        <section id="overview" className="prose mb-12">
          <h2>Overview</h2>
          <p>
            CrudX provides a set of powerful annotations that eliminate the need for 
            repetitive CRUD boilerplate. Simply annotate your entity classes and let 
            CrudX handle the rest.
          </p>

          <Alert variant="info" title="Convention Over Configuration">
            CrudX follows Spring Boot's philosophy of sensible defaults. All annotations 
            work out of the box with zero configuration required.
          </Alert>
        </section>

        {/* @CrudX */}
        <section id="crudx" className="prose mb-12">
          <h2>@CrudX</h2>
          <p>
            The <code>@CrudX</code> annotation is the heart of the framework. Apply it 
            to any entity class to automatically generate a complete CRUD API with 11 endpoints.
          </p>

          <h3>Syntax</h3>
          <div className="not-prose">
            <CodeBlock
              code={`@CrudX(name = "resource-name")`}
              language="java"
              showLineNumbers={false}
            />
          </div>

          <h3>Parameters</h3>
          <div className="not-prose my-4">
            <Card>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2">Parameter</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Required</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2"><code>name</code></td>
                    <td>String</td>
                    <td><Badge variant="error">Yes</Badge></td>
                    <td>The REST resource name (e.g., "employees", "products")</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          <h3>Example</h3>
          <div className="not-prose">
            <CodeBlock
              code={`@CrudX(name = "employees")
@Entity
public class Employee extends CrudXEntity {
    
    private String name;
    private String email;
    private String department;
    private Double salary;
    
    // Getters and Setters
}`}
              language="java"
            />
          </div>

          <Alert variant="success" title="Auto-Generated Features" className="mt-4">
            <p className="font-semibold mb-2">This single annotation automatically creates:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>11 REST API endpoints at <code>/api/employees</code></li>
              <li>Service layer with business logic</li>
              <li>Repository layer with database operations</li>
              <li>Input validation and error handling</li>
              <li>Batch operations support (up to 100,000 records)</li>
              <li>Pagination and sorting</li>
            </ul>
          </Alert>
        </section>

        {/* @CrudXImmutable */}
        <section id="crudx-immutable" className="prose mb-12">
          <h2>@CrudXImmutable</h2>
          <p>
            Mark fields as immutable to prevent updates after entity creation. Attempting 
            to modify an immutable field via PATCH will be silently ignored.
          </p>

          <h3>Use Cases</h3>
          <ul>
            <li>Salary amounts that require approval workflow</li>
            <li>Social security or tax identification numbers</li>
            <li>Initial contract terms</li>
            <li>Audit fields (created timestamps, creator IDs)</li>
          </ul>

          <h3>Example</h3>
          <div className="not-prose">
            <CodeBlock
              code={`@CrudX(name = "employees")
@Entity
public class Employee extends CrudXEntity {
    
    private String name;
    private String email;
    
    @CrudXImmutable
    private Double salary;  // Cannot be updated via PATCH
    
    @CrudXImmutable
    private String employeeId;  // Set once, never changed
}`}
              language="java"
            />
          </div>

          <Alert variant="warning" title="Behavior" className="mt-4">
            When a PATCH request includes immutable fields, CrudX will update other 
            fields but silently ignore the immutable ones. No error is thrown.
          </Alert>
        </section>

        {/* @CrudXUniqueConstraint */}
        <section id="crudx-unique" className="prose mb-12">
          <h2>@CrudXUniqueConstraint</h2>
          <p>
            Enforce uniqueness validation at the application level before database 
            operations. Provides better error messages than database-level constraints.
          </p>

          <h3>Features</h3>
          <ul>
            <li>Pre-validation before database operations</li>
            <li>Clear, user-friendly error messages</li>
            <li>Automatic duplicate detection in batch operations</li>
            <li>Works with <code>skipDuplicates</code> flag</li>
          </ul>

          <h3>Example</h3>
          <div className="not-prose">
            <CodeBlock
              code={`@CrudX(name = "employees")
@Entity
public class Employee extends CrudXEntity {
    
    @CrudXUniqueConstraint
    @Email
    private String email;  // Must be unique
    
    @CrudXUniqueConstraint
    private String employeeId;  // Must be unique
    
    private String name;
}`}
              language="java"
            />
          </div>

          <h3>Error Response</h3>
          <div className="not-prose">
            <CodeBlock
              code={`{
  "success": false,
  "message": "Duplicate entry for field: email",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
              language="json"
              showLineNumbers={false}
            />
          </div>

          <Alert variant="info" title="Batch Operations" className="mt-4">
            In batch create operations, you can set <code>skipDuplicates=true</code> to 
            automatically skip records with duplicate values instead of failing the entire batch.
          </Alert>
        </section>

        {/* @EnableCrudX */}
        <section id="enable-crudx" className="prose mb-12">
          <h2>@EnableCrudX</h2>
          <p>
            Enable CrudX framework in your Spring Boot application. Add this annotation 
            to your main application class or any configuration class.
          </p>

          <h3>Example</h3>
          <div className="not-prose">
            <CodeBlock
              code={`@SpringBootApplication
@EnableCrudX
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}
              language="java"
            />
          </div>

          <Alert variant="success" title="Component Scanning">
            CrudX automatically scans for entities annotated with <code>@CrudX</code> in 
            your application's base package and sub-packages.
          </Alert>
        </section>

        {/* Complete Example */}
        <section className="prose mb-12">
          <h2>Complete Example</h2>
          <p>Here's a complete example using all CrudX annotations:</p>

          <div className="not-prose">
            <CodeBlock
              code={`package com.example.model;

import com.crudx.annotation.CrudX;
import com.crudx.annotation.CrudXImmutable;
import com.crudx.annotation.CrudXUniqueConstraint;
import com.crudx.entity.CrudXEntity;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.*;

@CrudX(name = "employees")
@Entity
public class Employee extends CrudXEntity {
    
    @NotNull(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
    private String name;
    
    @CrudXUniqueConstraint
    @Email(message = "Invalid email format")
    @NotNull(message = "Email is required")
    private String email;
    
    @CrudXImmutable
    @CrudXUniqueConstraint
    @Pattern(regexp = "EMP\\\\d{6}", message = "Invalid employee ID format")
    private String employeeId;
    
    @NotNull
    private String department;
    
    @CrudXImmutable
    @Positive(message = "Salary must be positive")
    @DecimalMin(value = "30000.0", message = "Minimum salary is 30000")
    private Double salary;
    
    @Min(value = 18, message = "Minimum age is 18")
    @Max(value = 70, message = "Maximum age is 70")
    private Integer age;
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { 
        this.employeeId = employeeId; 
    }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { 
        this.department = department; 
    }
    
    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}`}
              language="java"
              title="Employee.java"
            />
          </div>
        </section>

        <Pagination
          prev={{ title: 'Getting Started', path: '/getting-started' }}
          next={{ title: 'Entities', path: '/entities' }}
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
