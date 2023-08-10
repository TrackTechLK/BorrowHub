import React, { Component } from "react";
import {
  fetchUtils,
  Admin,
  Delete,
  Resource,
  ListGuesser,
  EditGuesser,
} from "react-admin";
import "./App.css";
import { BorrowList } from "./resources/borrow/list";
import { ItemTypeList } from "./resources/itemType/list";
import { BorrowRequestList } from "./resources/borrowrequest/list";
import { LentConfirmationList } from "./resources/lendconfirmation/list";
import { ReturnConfirmationList } from "./resources/returnconfirmation/list";
import { ItemList } from "./resources/item/list";
// import drfProvider from 'ra-data-django-rest-framework';
import drfProvider from "./utils/dataprovider";
import { backendURL } from "./const";
import { authProvider } from "./utils/authProvider";
import theme from "./theme";
import LoginPage from "./components/login";
import { CategoryList } from "./resources/category/list";
import { CommunityList } from "./resources/community/list";
import { CommunityRequestList } from "./resources/communityRequest/list";
import { UserCommunityList } from "./resources/userCommunity/list";
import { CategoryCreate } from "./resources/category/create";
import { CommunityCreate } from "./resources/community/create";
import { CommunityRequestCreate } from "./resources/communityRequest/create";
import { UserCommunityCreate } from "./resources/userCommunity/create";
import { ItemCreate } from "./resources/item/create";

import { BrowserRouter } from "react-router-dom";
import { CustomLayout } from "./components/Layout";

import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupsIcon from "@mui/icons-material/Groups";
import { CommunityShow } from "./resources/community/show";
import { BorrowRequestCreate } from "./resources/borrowrequest/create";
import CustomNotification from "./components/Notifications";
import { UserShow } from "./resources/user/show";
import Dashboard from "./components/Dashboard";
import { LendList } from "./resources/lends/list";
import { UserList } from "./resources/user/list";
const dataProvider = drfProvider(backendURL);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Admin
          dashboard={Dashboard}
          loginPage={LoginPage}
          dataProvider={dataProvider}
          authProvider={authProvider}
          theme={theme}
          layout={CustomLayout}
          notification={CustomNotification}
        >
          <Resource
            name="users"
            list={UserList}
            edit={EditGuesser}
            icon={PeopleIcon}
            show={UserShow}
          />
          <Resource
            name="categories"
            list={CategoryList}
            edit={EditGuesser}
            create={CategoryCreate}
            icon={CategoryIcon}
          />
          <Resource name="borrows" list={BorrowList} edit={EditGuesser} />

          <Resource
            name="borrow_requests"
            list={BorrowRequestList}
            edit={EditGuesser}
            create={BorrowRequestCreate}
          />
          <Resource
            name="item_types"
            list={ItemTypeList}
            edit={EditGuesser}
            icon={InventoryIcon}
          />
          <Resource
            name="items"
            list={ItemList}
            edit={EditGuesser}
            create={ItemCreate}
            icon={InventoryIcon}
          />
          <Resource
            name="lend_confirmations"
            list={LentConfirmationList}
            edit={EditGuesser}
          />
          <Resource
            name="return_confirmations"
            list={ReturnConfirmationList}
            edit={EditGuesser}
          />
          <Resource name="borrows" list={BorrowList} edit={EditGuesser} />
          <Resource name="lends" list={LendList} edit={EditGuesser} />

          <Resource
            name="communities"
            list={CommunityList}
            edit={EditGuesser}
            create={CommunityCreate}
            show={CommunityShow}
            icon={GroupsIcon}
          />

          <Resource
            name="community_requests"
            list={CommunityRequestList}
            edit={EditGuesser}
            create={CommunityRequestCreate}
          />

          <Resource
            name="user_communities"
            list={UserCommunityList}
            edit={EditGuesser}
            create={UserCommunityCreate}
          />
          <Resource
            name="my_communities"
            list={CommunityList}
            edit={EditGuesser}
            // create={CommunityCreate}
            show={CommunityShow}
            icon={GroupsIcon}
          />
          <Resource name="events" list={ListGuesser} />
          <Resource name="register" noLayout disableAuthentication />
        </Admin>
      </BrowserRouter>
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
