import apiFetch from './api';

export type CheckoutPreferenceResponse = {
  preference_id: string;
  init_point: string;
};

export async function createCheckoutPreference(orderId: number): Promise<CheckoutPreferenceResponse> {
  return apiFetch(`/payments/checkout/${orderId}`, {
    method: 'POST',
  });
}
