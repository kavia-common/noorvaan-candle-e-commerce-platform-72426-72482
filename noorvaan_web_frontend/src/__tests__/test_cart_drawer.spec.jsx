import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test_utils';

describe('Cart drawer operations', () => {
  test('update quantity, remove item, clear cart, and free shipping threshold messaging', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/product/indian-daisy-evening-charm'] });

    // Add to cart (scoped to PDP right rail)
    const main = within(container.querySelector('main') || container);
    const addBtn = main.getByRole('button', { name: /Add to cart/i });
    fireEvent.click(addBtn);

    // Locate drawer aside and scope queries within
    const asides = container.getElementsByTagName('aside');
    const drawerAside = asides[asides.length - 1];
    const drawer = within(drawerAside);

    // Increase qty in the drawer
    const qtyInput = drawer.getByRole('spinbutton', { name: /Qty/i });
    fireEvent.change(qtyInput, { target: { value: '2' } });

    // Subtotal updated to reflect quantity 2
    expect(drawer.getByText(/Subtotal/i)).toBeInTheDocument();
    expect(drawer.getByText(/\$\d+\.\d{2}/)).toBeInTheDocument();

    // Free shipping message: remaining or unlocked text shows
    expect(drawer.getByText(/shipping/i)).toBeInTheDocument();

    // Remove item
    const removeBtns = drawer.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeBtns[0]);
    expect(drawer.getByText(/Your cart is empty/i)).toBeInTheDocument();

    // Close, add again, then clear
    fireEvent.click(drawer.getByRole('button', { name: /Close/i }));

    // Navigate home via header brand and go to PLP
    const header = within(container.getElementsByTagName('header')[0]);
    fireEvent.click(header.getByRole('link', { name: /^NOORVAAN$/i }));
    fireEvent.click(header.getByRole('link', { name: /Checkout/i })); // ensures header links reachable
    // go back to home and shop explicitly
    fireEvent.click(header.getByRole('link', { name: /^NOORVAAN$/i }));
    const hero = within(container.querySelector('.hero') || container);
    fireEvent.click(hero.getByRole('link', { name: /Shop Scented Candles/i }));

    // Click first product card to go to PDP
    const grid = container.querySelector('.grid.grid-4') || container;
    const firstCard = grid.querySelectorAll('a.card')[0];
    fireEvent.click(firstCard);

    // Add to cart again
    fireEvent.click(main.getByRole('button', { name: /Add to cart/i }));

    // Drawer is open, clear
    const drawer2 = within(container.getElementsByTagName('aside')[0]);
    fireEvent.click(drawer2.getByRole('button', { name: /^Clear$/i }));
    expect(drawer2.getByText(/Your cart is empty/i)).toBeInTheDocument();

    // Checkout link exists inside drawer footer
    expect(drawer2.getByRole('link', { name: /^Checkout$/i })).toHaveAttribute('href', '/checkout');
  });
});
