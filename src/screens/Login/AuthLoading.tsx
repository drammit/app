import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { ImageBackground } from 'react-native';

import { isJWTExpired } from '../../core/jwt';

import { dispatch } from '../../store/store';
import { init } from '../../store/actions/app';

import { refreshToken } from './api';

class AuthLoadingScreen extends React.Component<NavigationInjectedProps> {
  public constructor(props: NavigationInjectedProps) {
    super(props);

    this.validateAuth()
      .then(() => dispatch(init()));
  }

  private async validateAuth() {
    const { navigation } = this.props;

    if (isJWTExpired()) {
      const refreshed = await refreshToken();
      console.log(refreshed);
    }

    navigation.navigate('AuthStack');
    // if (!jwt) {
    // } else {
    //   navigation.navigate('MainStack');
    // }
  }

  public render() {
    return (
      <ImageBackground
        source={require('../Welcome/Scotland.jpg')}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    );
  }
}

export default AuthLoadingScreen;
