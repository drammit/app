import React from 'react';
import { createAppContainer } from 'react-navigation';
import { AppLoading } from 'expo';

import AppNavigator from './src/AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

interface AppState {
  isReady: boolean;
}

class App extends React.Component<{}, AppState> {
  public state = {
    isReady: false,
  };

  private async setup() {
    return;
  }

  public render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.setup}
          onFinish={() => this.setState({ isReady: true })}
          onError={e => console.warn(e)}
        />
      );
    }

    return <AppContainer />;
  }
}

export default App;
