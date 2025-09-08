/* jest-dom adds custom jest matchers for asserting on DOM nodes.
   allows you to do things like:
   expect(element).toHaveTextContent(/react/i)
   learn more: https://github.com/testing-library/jest-dom */
import '@testing-library/jest-dom';

// Prevent window.alert from breaking tests; capture calls instead
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Mock loadStripe so Elements can mount without a real key
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn().mockResolvedValue({}),
}));

// Globally mock @stripe/react-stripe-js so all tests get a consistent mock Elements/provider and hooks
jest.mock('@stripe/react-stripe-js', () => {
  return {
    Elements: ({ children }) => <>{children}</>,
    CardElement: (props) => <input data-testid="mock-card-element" {...props} />,
    useStripe: () => ({ confirmCardPayment: jest.fn() }),
    useElements: () => ({ getElement: jest.fn() }),
  };
});
