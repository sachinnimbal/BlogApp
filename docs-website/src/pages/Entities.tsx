import { Link } from 'react-router-dom';
import CodeBlock from '@/components/CodeBlock';
import Alert from '@/components/Alert';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';
import TOC from '@/components/TOC';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'crudx-entity', title: 'CrudXEntity', level: 2 },
  { id: 'base-fields', title: 'Base Fields', level: 2 },
  { id: 'custom-fields', title: 'Custom Fields', level: 2 },
  { id: 'validation', title: 'Validation', level: 2 },
];

export default function Entities() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: 'Core Concepts', path: '/overview' },
            { label: 'Entities' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">
            Core Concept
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            Base Entity Classes
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Understand CrudX base entities and automatic field management.
          </p>
        </div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            CrudX provides base entity classes that automatically manage common fields 
            like IDs, timestamps, and soft delete flags. All your entities should extend 
            these base classes to leverage CrudX's automatic CRUD generation.
          </p>

          <Alert variant="info" title="Zero Configuration">
            Base fields are automatically managed by CrudX. You never need to manually 
            set IDs, timestamps, or audit fields.
          </Alert>
        </section>

        {/* CrudXEntity */}
        <section id="crudx-entity" className="prose mb-12">
          <h2>CrudXEntity</h2>
          <p>
            The <code>CrudXEntity</code> class is the base class for all CrudX entities. 
            It provides essential fields and automatic lifecycle management.
          </p>

          <h3>Definition</h3>
          <div className="not-prose">
            <CodeBlock
              code={`@MappedSuperclass
public abstract class CrudXEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String updatedBy;
    
    @Column(name = "is_deleted")
    private Boolean deleted = false;
    
    // Getters and Setters
}`}
              language="java"
            />
          </div>

          <h3>Usage</h3>
          <div className="not-prose">
            <CodeBlock
              code={`@CrudX(name = "employees")
@Entity
public class Employee extends CrudXEntity {
    // Your custom fields here
    private String name;
    private String email;
    
    // Getters and Setters
}`}
              language="java"
            />
          </div>
        </section>

        {/* Base Fields */}
        <section id="base-fields" className="prose mb-12">
          <h2>Base Fields</h2>
          <p>
            CrudX entities automatically include the following fields:
          </p>

          <div className="not-prose space-y-4 my-6">
            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>id</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Primary key with auto-increment strategy. Automatically generated on creation.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Type:</span> Long
                </div>
                <div>
                  <span className="font-semibold">Auto-protected:</span>{' '}
                  <Badge variant="success">Yes</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>createdAt</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Timestamp of when the entity was created. Set automatically on insert.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Type:</span> LocalDateTime
                </div>
                <div>
                  <span className="font-semibold">Auto-protected:</span>{' '}
                  <Badge variant="success">Yes</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>updatedAt</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Timestamp of the last update. Automatically updated on every modification.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Type:</span> LocalDateTime
                </div>
                <div>
                  <span className="font-semibold">Updatable:</span>{' '}
                  <Badge variant="success">Auto</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>createdBy</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                User or system that created the entity. Can be set via security context.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Type:</span> String
                </div>
                <div>
                  <span className="font-semibold">Optional:</span>{' '}
                  <Badge variant="info">Yes</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>updatedBy</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                User or system that last updated the entity. Updated automatically.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Type:</span> String
                </div>
                <div>
                  <span className="font-semibold">Optional:</span>{' '}
                  <Badge variant="info">Yes</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>deleted</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Soft delete flag. When true, entity is excluded from normal queries.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Type:</span> Boolean
                </div>
                <div>
                  <span className="font-semibold">Default:</span> false
                </div>
              </div>
            </Card>
          </div>

          <Alert variant="warning" title="Auto-Protected Fields">
            The fields <code>id</code>, <code>createdAt</code>, and <code>createdBy</code>{' '}
            are automatically protected from updates via PATCH requests.
          </Alert>
        </section>

        {/* Custom Fields */}
        <section id="custom-fields" className="prose mb-12">
          <h2>Custom Fields</h2>
          <p>
            Add your business-specific fields to entities extending <code>CrudXEntity</code>:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`@CrudX(name = "products")
@Entity
public class Product extends CrudXEntity {
    
    @NotNull
    @Size(min = 2, max = 200)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Positive
    private Double price;
    
    @Min(0)
    private Integer stockQuantity;
    
    @CrudXUniqueConstraint
    private String sku;
    
    @Enumerated(EnumType.STRING)
    private ProductStatus status;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { 
        this.description = description; 
    }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { 
        this.stockQuantity = stockQuantity; 
    }
    
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}`}
              language="java"
              title="Product.java"
            />
          </div>
        </section>

        {/* Validation */}
        <section id="validation" className="prose mb-12">
          <h2>Built-in Validation</h2>
          <p>
            CrudX integrates seamlessly with Jakarta Bean Validation. Use standard 
            validation annotations on your entity fields:
          </p>

          <h3>Common Validation Annotations</h3>
          <div className="not-prose">
            <Card>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2">Annotation</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-2"><code>@NotNull</code></td>
                    <td>Field must not be null</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@NotEmpty</code></td>
                    <td>String/Collection must not be null or empty</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@Size(min, max)</code></td>
                    <td>String/Collection size constraints</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@Email</code></td>
                    <td>Valid email format</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@Pattern(regexp)</code></td>
                    <td>String must match regex pattern</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@Min(value)</code></td>
                    <td>Minimum numeric value</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@Max(value)</code></td>
                    <td>Maximum numeric value</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@Positive</code></td>
                    <td>Must be a positive number</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@DecimalMin(value)</code></td>
                    <td>Minimum decimal value</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>@DecimalMax(value)</code></td>
                    <td>Maximum decimal value</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          <h3>Validation Example</h3>
          <div className="not-prose mt-4">
            <CodeBlock
              code={`@CrudX(name = "users")
@Entity
public class User extends CrudXEntity {
    
    @NotNull(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be 3-50 characters")
    private String username;
    
    @CrudXUniqueConstraint
    @Email(message = "Invalid email format")
    @NotNull(message = "Email is required")
    private String email;
    
    @Pattern(
        regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\\\S+$).{8,}$",
        message = "Password must contain uppercase, lowercase, digit, and special character"
    )
    private String password;
    
    @Min(value = 18, message = "Must be at least 18 years old")
    @Max(value = 120, message = "Invalid age")
    private Integer age;
    
    // Getters and Setters
}`}
              language="java"
            />
          </div>

          <Alert variant="info" title="Automatic Validation">
            CrudX automatically validates all entities before database operations. 
            Validation errors are returned with clear, formatted error messages.
          </Alert>
        </section>

        {/* Next Steps */}
        <section className="prose mb-12">
          <h2>Next Steps</h2>
          <p>
            Now that you understand entities, learn about the auto-generated REST APIs:
          </p>
          <ul>
            <li>
              <Link to="/rest-endpoints">REST Endpoints</Link> - Complete API reference with 
              examples of all 11 auto-generated endpoints
            </li>
            <li>
              <Link to="/annotations">Annotations</Link> - Deep dive into CrudX annotations
            </li>
          </ul>
        </section>

        <Pagination
          prev={{ title: 'Annotations', path: '/annotations' }}
          next={{ title: 'REST Endpoints', path: '/rest-endpoints' }}
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
