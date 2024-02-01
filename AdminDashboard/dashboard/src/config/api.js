export const API_BASE_URL = 'http://localhost:9096/api';
export const customConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

export const USER_ROUTE = `${API_BASE_URL}/users`;
export const SERVICE_ROUTE = `${API_BASE_URL}/services`;
export const BOOKING_ROUTE = `${API_BASE_URL}/bookings`;
export const SERVICE_PROVIDER_ROUTE = `${API_BASE_URL}/serviceprovider`;
export const SERVICE_PROVIDER_POST_ROUTE = `${API_BASE_URL}/serviceprovider/role`;
export const CUSTOMER_ROUTE = `${API_BASE_URL}/users/customers`;
export const SITECONFIG_ROUTE = `${API_BASE_URL}/siteconfig`;
export const CONTACT_ROUTE = `${API_BASE_URL}/contact`;
export const ADMIN_LOGIN = `${API_BASE_URL}/users/login/admin`;
export const USER_SERVICE_PROVIDER = `${API_BASE_URL}/users/serviceproviders`;
export const USER_ID = `${API_BASE_URL}/users/2`;


