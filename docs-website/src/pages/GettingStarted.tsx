import CodeBlock from '@/components/CodeBlock';
import Alert from '@/components/Alert';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Tabs from '@/components/Tabs';
import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import TOC from '@/components/TOC';
import { CheckCircle, Package, Database, Code, Play } from 'lucide-react';

const tocItems = [
  { id: 'prerequisites', title: 'Prerequisites', level: 2 },
  { id: 'step1', title: 'Step 1: Add Dependency', level: 2 },
  { id: 'step2', title: 'Step 2: Configure Database', level: 2 },
  { id: 'step3', title: 'Step 3: Create Entity', level: 2 },
  { id: 'step4', title: 'Step 4: Enable CrudX', level: 2 },
  { id: 'step5', title: 'Step 5: Run Application', level: 2 },
];

export default function GettingStarted() {
  const databaseTabs = [
    {
      id: 'mysql',
      label: 'MySQL',
      content: (
        <CodeBlock
          code={`spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: \${DB_USERNAME:root}
    password: \${DB_PASSWORD:password}
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect`}
          language="yaml"
          title="application.yml"
        />
      ),
    },
    {
      id: 'postgresql',
      label: 'PostgreSQL',
      content: (
        <CodeBlock
          code={`spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: \${DB_USERNAME:postgres}
    password: \${DB_PASSWORD:password}
  
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect`}
          language="yaml"
          title="application.yml"
        />
      ),
    },
    {
      id: 'mongodb',
      label: 'MongoDB',
      content: (
        <CodeBlock
          code={`spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/mydb
      database: mydb`}
          language="yaml"
          title="application.yml"
        />
      ),
    },
  ];

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[{ label: 'Getting Started' }]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="success" className="mb-4">
            Quick Start
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            Getting Started with CrudX
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Get your first CRUD API running in under 5 minutes with these simple steps.
          </p>
        </div>

        {/* Prerequisites */}
        <section id="prerequisites" className="prose mb-12">
          <h2>Prerequisites</h2>
          <p>Before you begin, make sure you have the following installed:</p>
          
          <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
            <Card>
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Java 17+</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Java Development Kit 17 or higher
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Maven/Gradle</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Build tool for dependency management
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Database</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                MySQL, PostgreSQL, or MongoDB
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Spring Boot 3.x</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Spring Boot framework
              </p>
            </Card>
          </div>
        </section>

        {/* Step 1: Add Dependency */}
        <section id="step1" className="prose mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">1</span>
            </div>
            <h2 className="mb-0">Add CrudX Dependency</h2>
          </div>
          
          <p>
            Add the CrudX framework dependency to your project:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`<dependency>
    <groupId>com.crudx</groupId>
    <artifactId>crudx-spring-boot-starter</artifactId>
    <version>1.0.1</version>
</dependency>`}
              language="xml"
              title="pom.xml"
            />
          </div>

          <Alert variant="info" title="Gradle Users">
            Use: <code>implementation 'com.crudx:crudx-spring-boot-starter:1.0.1'</code>
          </Alert>
        </section>

        {/* Step 2: Configure Database */}
        <section id="step2" className="prose mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">2</span>
            </div>
            <h2 className="mb-0">Configure Database</h2>
          </div>
          
          <p>
            Configure your database connection in <code>application.yml</code>:
          </p>

          <div className="not-prose">
            <Tabs tabs={databaseTabs} />
          </div>
        </section>

        {/* Step 3: Create Entity */}
        <section id="step3" className="prose mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">3</span>
            </div>
            <h2 className="mb-0">Create Your Entity</h2>
          </div>
          
          <p>
            Create an entity class and annotate it with <code>@CrudX</code>:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`package com.example.model;

import com.crudx.annotation.CrudX;
import com.crudx.annotation.CrudXImmutable;
import com.crudx.annotation.CrudXUniqueConstraint;
import com.crudx.entity.CrudXEntity;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@CrudX(name = "employees")
@Entity
public class Employee extends CrudXEntity {
    
    @NotNull
    @Size(min = 2, max = 100)
    private String name;
    
    @CrudXUniqueConstraint
    @Email
    private String email;
    
    private String department;
    
    @CrudXImmutable
    private Double salary;
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
}`}
              language="java"
              title="Employee.java"
            />
          </div>

          <Alert variant="success" title="That's All the Code!" className="mt-6">
            CrudX will automatically generate 11 REST endpoints, service layer, 
            and repository for this entity!
          </Alert>
        </section>

        {/* Step 4: Enable CrudX */}
        <section id="step4" className="prose mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">4</span>
            </div>
            <h2 className="mb-0">Enable CrudX</h2>
          </div>
          
          <p>
            Add <code>@EnableCrudX</code> to your main application class:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`package com.example;

import com.crudx.annotation.EnableCrudX;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableCrudX
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}
              language="java"
              title="Application.java"
            />
          </div>
        </section>

        {/* Step 5: Run Application */}
        <section id="step5" className="prose mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">5</span>
            </div>
            <h2 className="mb-0">Run Your Application</h2>
          </div>
          
          <p>Start your Spring Boot application:</p>

          <div className="not-prose">
            <CodeBlock
              code="mvn spring-boot:run"
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <p className="mt-4">
            Your API is now live! Test it with:
          </p>

          <div className="not-prose">
            <CodeBlock
              code="curl -X GET http://localhost:8080/api/employees"
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <Alert variant="success" title="🎉 Congratulations!" className="mt-6">
            You now have a fully functional CRUD API with 11 endpoints! Check out the{' '}
            <a href="/rest-endpoints" className="underline">REST Endpoints</a> page 
            to see all available operations.
          </Alert>
        </section>

        {/* Auto-Generated Endpoints */}
        <section className="prose mb-12">
          <h2>Auto-Generated Endpoints</h2>
          <p>
            CrudX automatically created these endpoints for your Employee entity:
          </p>

          <div className="not-prose">
            <Card>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>POST /api/employees</code>
                  <span className="text-muted-foreground">- Create single</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>POST /api/employees/batch</code>
                  <span className="text-muted-foreground">- Create batch</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>GET /api/employees</code>
                  <span className="text-muted-foreground">- Get all</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>GET /api/employees/paged</code>
                  <span className="text-muted-foreground">- Get paginated</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>GET /api/employees/{'{'}id{'}'}</code>
                  <span className="text-muted-foreground">- Get by ID</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>PATCH /api/employees/{'{'}id{'}'}</code>
                  <span className="text-muted-foreground">- Partial update</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>DELETE /api/employees/{'{'}id{'}'}</code>
                  <span className="text-muted-foreground">- Delete single</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>DELETE /api/employees/batch</code>
                  <span className="text-muted-foreground">- Delete batch</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>GET /api/employees/count</code>
                  <span className="text-muted-foreground">- Count records</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <code>GET /api/employees/exists/{'{'}id{'}'}</code>
                  <span className="text-muted-foreground">- Check existence</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Pagination
          prev={{ title: 'Overview', path: '/overview' }}
          next={{ title: 'Annotations', path: '/annotations' }}
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
