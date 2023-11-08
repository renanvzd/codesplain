import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepositoriesListItem from './RepositoriesListItem';

// jest.mock('../tree/FileIcon', () => {
//   // Skip Content of FileIcon.js
//   return () => {
//     return 'File Icon Component'
//   }
// })

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'A js library',
    owner: 'facebook',
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  }

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test('shows a link to the github homepage for this repository', async () => {
  const { repository } = renderComponent();

  // await pause()
  // FindByRole is asyncrounous, it does the pause await above.
  await screen.findByRole('img', { name: 'Javascript' })

  // Don't use professionaly this avoid act method
  // await act(async () => {
  //   await pause();
  // })

  const link = screen.getByRole('link', {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute('href', repository.html_url);
});

// const pause = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, 100)
//   })
// }