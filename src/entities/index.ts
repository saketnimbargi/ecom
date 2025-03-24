import { Sequelize } from 'sequelize';
import { AllUsers } from './AllUsers';
// Import additional models as you create them
// import { Product } from './Product';
// import { Order } from './Order';

// Model registry - add all models here
const models = {
  AllUsers,
  // Product,
  // Order,
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
// export * from "./Product";
// export * from "./Order";


export * from "./AllUsers";
