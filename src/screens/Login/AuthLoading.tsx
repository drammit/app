import React from 'react';
import { ImageBackground } from 'react-native';

import { isJWTExpired, hasJWT } from '../../core/jwt';
import { info } from '../../core/log';

import { dispatch } from '../../store/store';
import { init } from '../../store/actions/app';
import { login, logout } from '../../store/actions/auth';

import { refreshToken } from './api';

async function validateAuth() {
  if (!hasJWT()) {
    info('No JWT found, go to auth');
    dispatch(logout());
    return;
  }

  if (isJWTExpired()) {
    try {
      await refreshToken();
      info('Expired token successfully refreshed');
      dispatch(login());
    } catch (err) {
      info('Expired token not refreshed');
      dispatch(logout());
      return;
    }
  } else {
    info('Token is still valid');
    dispatch(login());
  }

  dispatch(init());
}

class AuthLoadingScreen extends React.Component {
  public componentDidMount(): void {
    validateAuth();
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
