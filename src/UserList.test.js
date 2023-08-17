import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
  const users = [
    { name: 'jane', email:'jane@jane.com'},
    {name: 'sam', email:'sam@gmail.com' }
  ];

  render(<UserList users={users} />);

  return {
    users
  }
}


it('renders one row per user', () => {
  renderComponent();

  //Find all the rows in the table
  // Approach #1: using testId
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  // Approach #2: using querySelector
  // const rows = container.querySelectorAll('tbody tr');

  //Assertion
  expect(rows).toHaveLength(2);
});

it('renders the email and name of each user', () => {
  const { users } = renderComponent();
  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
