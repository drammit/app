import React from 'react';
import { createAppContainer } from 'react-navigation';

import AppNavigator from './src/AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  public render() {
    return <AppContainer />;
  }
}

export default App;
