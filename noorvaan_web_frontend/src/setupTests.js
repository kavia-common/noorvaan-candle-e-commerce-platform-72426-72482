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
