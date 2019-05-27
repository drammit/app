import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { ImageBackground } from 'react-native';

import { isJWTExpired, hasJWT } from '../../core/jwt';

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

    if (!hasJWT()) {
      console.info('No JWT found, go to auth');
      navigation.navigate('AuthStack');
      return;
    }

    if (isJWTExpired()) {
      try {
        await refreshToken();
        console.info('Expired token successfully refreshed');
      } catch (err) {
        console.info('Expired token not refreshed');
        navigation.navigate('AuthStack');
        return;
      }
    } else {
      console.info('Token is still valid');
    }

    navigation.navigate('MainStack');
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
