import App from './App';
import { renderWithProviders } from './__tests__/test_utils';

test('renders without crashing', () => {
  renderWithProviders(<App />);
});
