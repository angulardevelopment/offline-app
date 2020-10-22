import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';

export const addCustomer  = createAction(
  // export const loadCustomers = createAction(
  // '[Customer] Load Customers'
  '[Customer] Add Customer',
    (customer: Customer) => ({customer})
);




