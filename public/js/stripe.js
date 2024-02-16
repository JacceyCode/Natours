/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51OCN8SFrqnEhzr3vm5joLKAOYU6sNV98XaAcxe9YdwzxcxA5wNWR10cvHSgektP0NJo2xvTYaT7thul8ZmzBD0Uj00JLMxNbJ7',
  );

  try {
    // 1) Get checkout session from API
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
