import React from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import { Button, View, Text } from 'native-base';
import { ImagePicker, Permissions } from 'expo';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.grey2,
    borderWidth: 1,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  buttonText: {
    color: colors.grey2,
    fontSize: 12,
    textAlign: 'center',
  },
});

interface ImagePickerProps {
  placeholder: string;
}

interface ImagePickerState {
  image: null | string;
}

class ImagePickerWrapper extends React.Component<ImagePickerProps, ImagePickerState> {
  public state = {
    image: null,
  };

  private async askForCameraRoll() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        return true;
      }

      return false;
    }

    return true;
  }

  private pickImage = async () => {
    if (!await this.askForCameraRoll()) {
      Alert.alert('Permissions needed', 'You need to allow Drammit to browse your images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) this.setState({ image: result.uri });
  }

  public render() {
    const { image } = this.state;
    const { placeholder } = this.props;

    return (
      <View>
        <Button style={styles.button} onPress={this.pickImage}>
          {image
            ? <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
            : <Text style={styles.buttonText}>{placeholder}</Text>}
        </Button>
      </View>
    );
  }
}

export default ImagePickerWrapper;
