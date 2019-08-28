import React from 'react';
import { createAppContainer, NavigationContainerComponent } from 'react-navigation';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleProvider, Root } from 'native-base';
import { Provider } from 'react-redux';

import AppNavigator from './AppNavigator';

// @ts-ignore
import getTheme from './native-base-theme/components';
// @ts-ignore
import commonColor from './native-base-theme/variables/commonColor';

import { getItemsAsync } from './core/storage';
import { setTopLevelNavigator } from './core/navigation';
import { warn } from './core/log';

import store from './store/store';

import { FlavourProvider } from './components/Form/Flavours/useFlavours';

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
          onError={warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(commonColor)}>
          <FlavourProvider>
            <Root>
              <AppContainer ref={setupTopLevelNavigator} />
            </Root>
          </FlavourProvider>
        </StyleProvider>
      </Provider>
    );
  }
}

export default App;
