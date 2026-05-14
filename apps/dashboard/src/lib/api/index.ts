import { todosApi } from './todos';
import { analyticsApi } from './analytics';
import { vendorsApi } from './vendors';
import { ordersApi } from './orders';
import { ridersApi } from './riders';
import { customersApi } from './customers';
import { paymentsApi } from './payments';
import { supportApi } from './support';
import { settingsApi } from './settings';
import { authApi } from './auth';

/**
 * Centralized API Client Layer for Plokitch Dashboard
 * All UI components MUST consume data through this layer.
 */
export const api = {
  todos: todosApi,
  analytics: analyticsApi,
  vendors: vendorsApi,
  orders: ordersApi,
  riders: ridersApi,
  customers: customersApi,
  payments: paymentsApi,
  support: supportApi,
  settings: settingsApi,
  auth: authApi,
  // Add more modules as they are refactored
};
