# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


initial setup for react

constants for url and versions
utils to create axios instance
services for the products or whatever, connect api with url and create a req like list,getById,UpdateBYId etc.
create a slice 
create a store
merge store with the main.jsx

increament;

find item in car
if itemincart itemincart.state.cart = sta

===================================
Algorithm: Add Component

1. Import necessary dependencies and components.
2. Define the Add component function.
3. Initialize state and hooks using the `useState`, `useDispatch`, `useNavigate`, `useSelector`, and `useOrder` hooks.
4. Define the `handleSubmit` function:
   a. Prevent the default form submission.
   b. Create a payload with order details and products.
   c. Call the `create` function with the payload to create a new order.
   d. Show an alert on successful order creation and navigate to the orders page.
5. Define the `handleAddingProducts` function:
   a. Prevent the default form submission.
   b. Check if the product and quantity are provided.
   c. Add a new product to the list of products and update the order's amount.
   d. Clear the input fields for the new product.
6. Define the `removeProduct` function:
   a. Remove a product from the list of products based on its ID.
   b. Update the order's amount after removal.
7. Initialize the `fetchProducts` function using the `useEffect` hook:
   a. Dispatch the `fetchProducts` action to retrieve a list of products.
8. Render the component JSX:
   a. Create a form for entering order details.
   b. Create a form for adding products to the order.
   c. Display a table of added products with options to remove them.