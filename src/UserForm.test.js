import UserForm from './UserForm';
import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

it('shows two inputs and a button', () => {
  // render the component
  render(<UserForm />);

  // manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  //make assertion
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

it('calls onUserAdd when form is submitted', async () => {
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock}/>)

  //Find the inputs
  const nameInput = screen.getByRole('textbox', {name: /name/i});
  const emailInput = screen.getByRole('textbox', {name: /email/i});

  //Simulate typing
  await user.click(nameInput);
  const name = 'jane';
  await user.keyboard(name);

  await user.click(emailInput);
  const email = 'jane@jane.com';
  await user.keyboard(email);

  //Find and click on the button
  const button = screen.getByRole('button');
  await user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name, email });
});

it('empties the inputs when the form is submitted', async () => {
  render(<UserForm onUserAdd={() => {}} />);

  //Find the inputs
  const nameInput = screen.getByRole('textbox', {name: /name/i});
  const emailInput = screen.getByRole('textbox', {name: /email/i});

  //Simulate typing
  await user.click(nameInput);
  const name = 'jane';
  await user.keyboard(name);

  await user.click(emailInput);
  const email = 'jane@jane.com';
  await user.keyboard(email);

  //Find and click on the submit button
  const button = screen.getByRole('button');
  await user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});
