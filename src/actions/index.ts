

export {getUserAddress} from './address/get-user-address';
export {setUserAddres} from './address/set-user-address';
export {deleteUserAddress} from './address/delete-user-address';

export {placeOrder} from  './order/place-order';
export {getOrderById} from './order/get-order-by-id';
export {getOrdersByUser} from './order/get-orders-by-user';
export {getPaginatedOrders} from './order/get-paginated-orders';

export{getPaginatedUsers} from './user/get-paginated-users';
export {changeUserRole} from './user/change.user-role';

export {setTransactionId} from './payments/set-transaction-id';
export {paypalCheckPayment} from './payments/paypal-check-payment';

export {authenticate} from './auth/login';
export {login} from './auth/login';
export {logout} from './auth/logout';
export {registerUser} from './auth/register';

export {getCountries} from './country/get-countries';

export { getPaginatedProductsWithImages } from './products/products-pagination';
export { getProductBySlug } from './product/get-product-by-slug';
export { getStockBySlug } from './product/get-stock-by-slug';
