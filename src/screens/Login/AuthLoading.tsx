import React from 'react';
import { ImageBackground } from 'react-native';

import { isJWTExpired, hasJWT } from '../../core/jwt';
import { info } from '../../core/log';

import { dispatch } from '../../store/store';
import { login, logout, refreshAuth } from '../../store/actions/auth';

async function validateAuth() {
  if (!hasJWT()) {
    info('No JWT found, go to auth');
    dispatch(logout());
    return;
  }

  dispatch(login());

  if (isJWTExpired()) {
    dispatch(refreshAuth());
    info('Token expired, so refresh after login');
  } else {
    info('Token is still valid');
  }
}

class AuthLoadingScreen extends React.Component {
  public componentDidMount(): void {
    validateAuth().then(() => info('Auth resolved'));
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
