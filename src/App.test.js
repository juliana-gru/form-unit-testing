import { render, screen } from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event';

it('can receive a new user and show it on a list', async () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button')

  const name = 'jane';
  const email = 'jane@jane.com';

  await user.click(nameInput);
  await user.keyboard(name);
  await user.click(emailInput);
  await user.keyboard(email);

  await user.click(button)

  const renderedName = screen.getByRole('cell', { name: name });
  const renderedEmail = screen.getByRole('cell', { name: email });

  expect(renderedName).toBeInTheDocument();
  expect(renderedEmail).toBeInTheDocument();
});


