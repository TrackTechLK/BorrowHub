import React, { Component } from 'react';
import {
  fetchUtils,
  Admin,
  Delete,
  Resource,
  ListGuesser,
  EditGuesser,
} from 'react-admin';
import drfProvider from 'ra-data-django-rest-framework';
import { authProvider } from './utils/authProvider';
import theme from './theme';
import LoginPage from './components/login';
import { CategoryList } from './resources/category/list';
import { BorrowList } from './resources/borrow/list';
import { ItemList } from './resources/item/list';
import { BorrowRequestList } from './resources/borrowrequest/list';
import { LentConfirmationList } from './resources/lendconfirmation/list';
import { ReturnConfirmationList } from './resources/returnconfirmation/list';
import { ItemUserList } from './resources/itemuser/list';

import { CategoryCreate } from './resources/category/create';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const { access } = JSON.parse(localStorage.getItem('auth'));
  options.headers.set('Authorization', `Bearer ${access}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = drfProvider('http://localhost:8000', httpClient);

// import { PostList } from './posts'

class App extends Component {
  render() {
    return (
      <Admin
        loginPage={LoginPage}
        dataProvider={dataProvider}
        authProvider={authProvider}
        theme={theme}
      >
        <Resource name='users' list={<ListGuesser />} edit={EditGuesser} />
        <Resource
          name='categories'
          list={CategoryList}
          edit={EditGuesser}
          create={CategoryCreate}
        />
        <Resource name='borrows' list={BorrowList} edit={EditGuesser} />
        <Resource
          name='borrowrequests'
          list={BorrowRequestList}
          edit={EditGuesser}
        />
        <Resource name='items' list={ItemList} edit={EditGuesser} />
        <Resource name='itemusers' list={ItemUserList} edit={EditGuesser} />
        <Resource
          name='lendconfirmations'
          list={LentConfirmationList}
          edit={EditGuesser}
        />
        <Resource
          name='returnconfirmations'
          list={ReturnConfirmationList}
          edit={EditGuesser}
        />
        <Resource name='borrows' list={BorrowList} edit={EditGuesser} />
        <Resource
          name='borrowrequests'
          list={BorrowRequestList}
          edit={EditGuesser}
        />
        <Resource name='users' list={ListGuesser} edit={EditGuesser} />
      </Admin>
    );
  }
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
