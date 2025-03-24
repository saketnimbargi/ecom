## E-Commerce API Platform

### Overview

A robust e-commerce API built with Express.js, TypeScript, Sequelize (MySQL), and Mongoose (MongoDB). The platform provides a scalable architecture for building e-commerce applications with structured and unstructured data storage.

### Project Architecture

This project follows a multi-layered architecture with the following components:

```

├── Controller Layer (API endpoints)
├── Service Layer (Business logic)
├── DAO Layer (Data Access Objects)
└── Database Layer
    ├── MySQL (Sequelize ORM)
    └── MongoDB (Mongoose)
```

### Project Structure

```
.
├── src/
│   ├── api/
│   │   ├── controller/     # API endpoint controllers
│   │   ├── DAOs/           # Data Access Objects 
│   │   └── services/       # Business logic services
│   ├── config/             # Configuration files
│   │   ├── config.js       # Sequelize CLI config
│   │   └── DbConnection.ts # Database connection setup
│   ├── entities/           # Sequelize models (MySQL)
│   ├── errors/             # Custom error classes
│   ├── middleware/         # Express middleware
│   ├── migrations/         # Sequelize migrations
│   ├── routes/             # API routes
│   │   └── v1/             # API version 1 routes
│   └── utils/              # Utility functions
├── .env                    # Environment variables
├── .sequelizerc            # Sequelize CLI configuration
├── index.ts                # Application entry point
└── tsconfig.json           # TypeScript configuration
```

### Getting Started

Prerequisites
- Node.js (v16+)
- MySQL
- MongoDB

#### Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Set up environment variables by copying the example file:

``` bash
cp .env.example .env
```

4. Update the .env file with your database credentials:

```bash
NODE_ENV=development
PORT=3000

# MySQL Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=ecommerce

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start

# Build the application
npm run build
```

### Database Configuration

This project uses two databases:

MySQL (via Sequelize): For structured data like users, products, orders
MongoDB (via Mongoose): For flexible data like customer profiles, analytics
Database Connection
Database connections are managed through the singleton pattern in DbConnection.ts to ensure only one connection per database.

Working with Sequelize Migrations
Migration Configuration
The project uses .sequelizerc to configure migration paths:

Database Configuration
This project uses two databases:

MySQL (via Sequelize): For structured data like users, products, orders
MongoDB (via Mongoose): For flexible data like customer profiles, analytics
Database Connection
Database connections are managed through the singleton pattern in DbConnection.ts to ensure only one connection per database.

Working with Sequelize Migrations
Migration Configuration
The project uses .sequelizerc to configure migration paths:

```typescript
const path = require("path");

module.exports = {
  "config": path.resolve("src/config", "config.js"),
  "models-path": path.resolve("src", "entities"),
  "seeders-path": path.resolve("src", "seeders"),
  "migrations-path": path.resolve("src", "migrations"),
};
```

#### Creating a Migration

To create a new migration file:

```bash
npm run db:migrate:create -- create-your-table-name
```

This command creates a new migration file in the migrations directory.

Example Migration (AllUsers Table)
```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("all_users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // Other fields...
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("all_users");
  }
};
```

#### Running Migrations

```bash
# Run all pending migrations
npm run db:migrate

# Undo the most recent migration
npm run db:migrate:undo
```

### Working with Foreign Keys in Sequelize

1. Creating a Products Table with Foreign Key to Users
First, create a migration for the products table that references the users table:

```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      // Foreign key to users table
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'all_users',  // Referenced table
          key: 'id'            // Referenced column
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      create_dt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      modified_dt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    
    // Add index on foreign key for better performance
    await queryInterface.addIndex('products', ['user_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
```

2. Create the "Product" Model (NOTE: This is just a example used for understanding)

```typescript
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description?: string;
  user_id?: number;
  createDt: Date;
  modifiedDt: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'createDt' | 'modifiedDt'> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string;
  public user_id?: number;
  public createDt!: Date;
  public modifiedDt!: Date;

  // Initialization method
  public static initialize(sequelize: Sequelize): void {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'all_users',
            key: 'id',
          },
        },
        createDt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'create_dt',
        },
        modifiedDt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'modified_dt',
        },
      },
      {
        sequelize,
        tableName: 'products',
        timestamps: false,
        indexes: [
          {
            fields: ['user_id'],
          },
        ],
      }
    );
  }

  // Associate method - define relationships with other models
  public static associate(models: any): void {
    // Define relationship to User
    Product.belongsTo(models.AllUsers, { foreignKey: 'user_id', as: 'seller' });
  }
}
```

3. Update the "AllUsers" Model to Include the Relationship. 
Add this to the AllUsers class:

```typescript
// Associate method - define relationships with other models
public static associate(models: any): void {
  // A user can have many products
  AllUsers.hasMany(models.Product, { foreignKey: 'user_id', as: 'products' });
}
```

4. Add the Product Model to the Models Registry. 
Update the index.ts file to include the Product model:

```typescript
import { Sequelize } from 'sequelize';
import { AllUsers } from './AllUsers';
import { Product } from './Product'; // Add import

// Model registry - add all models here
const models = {
  AllUsers,
  Product,  // Add to registry
};

// Initialize all models with Sequelize instance
export function initModels(sequelize: Sequelize): void {
  // Initialize each model
  Object.values(models).forEach((model: any) => {
    if (typeof model.initialize === 'function') {
      model.initialize(sequelize);
    }
  });

  // Define associations after all models are initialized
  Object.values(models).forEach((model: any) => {
    if (typeof model.associate === 'function') {
      model.associate(models);
    }
  });
}

// Export all models
export * from "./AllUsers";
export * from "./Product";  // Add export
```

5. Example of Using the Relationship in a DAO

```typescript
import { AllUsers, Product } from "../../entities";

export class ProductDAO {
  // Get products with seller information
  public static async getProductsWithSeller() {
    try {
      return await Product.findAll({
        include: [
          {
            model: AllUsers,
            as: 'seller',
            attributes: ['id', 'name', 'username']
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching products with seller:", error);
      throw new Error("Failed to fetch products");
    }
  }

  // Get all products for a specific user
  public static async getUserProducts(userId: number) {
    try {
      return await Product.findAll({
        where: { user_id: userId },
        order: [['id', 'ASC']]
      });
    } catch (error) {
      console.error(`Error fetching products for user ${userId}:`, error);
      throw new Error("Failed to fetch user products");
    }
  }
}
```

### MongoDB Models

The project uses Mongoose for MongoDB operations, primarily for flexible data structures and analytics.

Example: Customer Schema in MongoDB
Create a file src/models/Customer.ts:

```typescript
import mongoose, { Schema, Document } from 'mongoose';

// Interface for Customer document
export interface ICustomer extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  preferences?: {
    categories?: string[];
    newsletter: boolean;
  };
  registrationDate: Date;
  lastLoginDate?: Date;
  active: boolean;
  mysqlUserId?: number; // Reference to MySQL user ID
}

// Create Customer schema
const CustomerSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  preferences: {
    categories: [String],
    newsletter: { 
      type: Boolean, 
      default: false 
    }
  },
  registrationDate: { 
    type: Date, 
    default: Date.now 
  },
  lastLoginDate: Date,
  active: { 
    type: Boolean, 
    default: true 
  },
  mysqlUserId: Number
}, {
  timestamps: true
});

// Create and export Customer model
export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
```

### API Endpoints

The API follows RESTful conventions and is versioned under /ecom/api/v1/.

Current endpoints:

- GET /ecom/api/v1/test/sanity - Test endpoint
- POST /ecom/api/v1/test - Create a user
- GET /ecom/api/v1/test/:id - Get a user by ID
- DELETE /ecom/api/v1/test/:id - Delete a user

### Error Handling

The application includes a centralized error handling mechanism (currently commented out) to ensure consistent error responses across the API.
