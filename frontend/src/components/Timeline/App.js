import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import fakeRestDataProvider from 'ra-data-fakerest';

import Timeline from './Timeline';

const dataProvider = fakeRestDataProvider(
    {
        posts: [],
        events: []
    },
    true
);

const delayedDataProvider = (type, resource, params) =>
    new Promise(resolve =>
        setTimeout(() => resolve(dataProvider(type, resource, params)), 1000)
    );

class App extends Component {
    render() {
        return (
            <Admin dataProvider={delayedDataProvider}>
                <Resource name="events" list={Timeline} />
                <Resource name="posts" list={ListGuesser} />
            </Admin>
        );
    }
}

export default App;
