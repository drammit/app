import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  errorMessage: {
    color: colors.red,
    marginTop: 12,
  },
});

const ErrorMessage = ({ children }: { children?: any }) => children
  ? <Text style={styles.errorMessage}>{children}</Text>
  : null;

export default ErrorMessage;
