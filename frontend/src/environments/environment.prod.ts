export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000/api',
  productsUrl: 'http://localhost:5000/api/products',
  ordersUrl: 'http://localhost:5000/api/orders'
};

/*  frontend container knows the backend address, but the browser not; therefore
    I use localhost, thanks to the exposed port 5000.
*/
/*  Change to "backend" and configure a proxy inside nginx; after that
    it will be possible to not expose port 5000.
*/
