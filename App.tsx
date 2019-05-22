import React from 'react';
import { createAppContainer } from 'react-navigation';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { StyleProvider } from 'native-base';

import AppNavigator from './src/AppNavigator';

import getTheme from './src/native-base-theme/components';
import theme from './src/native-base-theme/variables/platform';

const AppContainer = createAppContainer(AppNavigator);

interface AppState {
  isReady: boolean;
}

class App extends React.Component<{}, AppState> {
  public state = {
    isReady: false,
  };

  private async setup() {
    await Font.loadAsync({
      ...Ionicons.font,
    });
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

    return (
      <StyleProvider style={getTheme(theme)}>
        <AppContainer />
      </StyleProvider>
    );
  }
}

export default App;
