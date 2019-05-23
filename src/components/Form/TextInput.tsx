import React, { RefObject } from 'react';
import { Icon, Input, Item, NativeBase, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import { FormikProps } from 'formik';

const styles = StyleSheet.create({
  errorMessage: {
    color: colors.red,
    marginTop: 12,
  },
});

function inputProps(props: FormikProps<any>, name: string) {
  return {
    error: props.errors[name],
    handleBlur: props.handleBlur(name),
    handleChange: props.handleChange(name),
    touched: props.touched[name],
    value: props.values[name],
  };
}

interface TextInputProps extends NativeBase.Input {
  name: string;
  formikProps: FormikProps<any>;
  setRef?: RefObject<any>;
  icon?: string;
}

const TextInput = ({ setRef, formikProps, ...props }: TextInputProps) => {
  const extraProps = inputProps(formikProps, props.name);
  return (
    <>
      <Item error={Boolean(extraProps.error && extraProps.touched)}>
        {props.icon && <Icon active name={props.icon} />}
        <Input
          {...props}
          ref={setRef}
          onChangeText={extraProps.handleChange}
          onBlur={extraProps.handleBlur}
        />
      </Item>
      {extraProps.error && extraProps.touched && (
        <Text style={styles.errorMessage}>{extraProps.error}</Text>
      )}
    </>
  );
};

export default TextInput;
