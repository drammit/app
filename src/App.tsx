import React from 'react';
import { createAppContainer, NavigationContainerComponent } from 'react-navigation';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { StyleProvider, Root } from 'native-base';
import { Provider } from 'react-redux';

import AppNavigator from './AppNavigator';

// @ts-ignore
import components from './native-base-theme/components';
// @ts-ignore
import platform from './native-base-theme/variables/platform';

import { getItemsAsync } from './core/storage';
import { setTopLevelNavigator } from './core/navigation';

import store from './store/store';

const AppContainer = createAppContainer(AppNavigator);

function setupTopLevelNavigator(ref: NavigationContainerComponent) {
  setTopLevelNavigator(ref);
}

interface AppState {
  isReady: boolean;
}

class App extends React.Component<{}, AppState> {
  public state = {
    isReady: false,
  };

  private async setup() {
    // preload fonts
    await Font.loadAsync({
      ...Ionicons.font,
    });

    // preload AsyncStorage values
    await getItemsAsync(['jwt']);
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
      <Provider store={store}>
        <StyleProvider style={components(platform)}>
          <Root>
            <AppContainer ref={setupTopLevelNavigator} />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}

export default App;
