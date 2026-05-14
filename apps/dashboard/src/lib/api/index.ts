import { todosApi } from './todos';

/**
 * Centralized API Client Layer for Plokitch Dashboard
 * All UI components MUST consume data through this layer.
 */
export const api = {
  todos: todosApi,
  // Add more modules as they are refactored
};
