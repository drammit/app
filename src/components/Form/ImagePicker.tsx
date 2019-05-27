import React from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import { Button, View, Text, ActionSheet } from 'native-base';
import { ImagePicker, Permissions } from 'expo';

import { checkAndAskPersmissionsFor } from '../../core/permissions';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.grey2,
    borderWidth: 1,
    height: 80,
    justifyContent: 'center',
    overflow: 'hidden',
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

  private pickImage = async () => {
    if (!await checkAndAskPersmissionsFor(Permissions.CAMERA_ROLL)) {
      Alert.alert('Permissions needed', 'You need to allow Drammit to browse your images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) this.setState({ image: result.uri });
  }

  private openCamera = async () => {
    if (!await checkAndAskPersmissionsFor(Permissions.CAMERA, Permissions.CAMERA_ROLL)) {
      Alert.alert(
        'Permissions needed',
        'You need to allow Drammit to access your camera and browse your images',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) this.setState({ image: result.uri });
  }

  private imagePicker = () => {
    const { placeholder } = this.props;
    const { image } = this.state;

    const options = image
      ? ['Open Camera Roll', 'Use Camera', 'Remove Current Image', 'Cancel']
      : ['Open Camera Roll', 'Use Camera', 'Cancel'];
    const cancelButtonIndex = image ? 3 : 2;
    const destructiveButtonIndex = image ? 2 : undefined;

    ActionSheet.show(
      {
        cancelButtonIndex,
        destructiveButtonIndex,
        options,
        title: placeholder,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.pickImage();
            break;
          case 1:
            this.openCamera();
            break;
          case 2: {
            if (image) {
              this.setState({ image: null });
            }
          }
        }
      },
    );
  }

  public render() {
    const { image } = this.state;
    const { placeholder } = this.props;

    return (
      <View>
        <Button style={styles.button} onPress={this.imagePicker}>
          {image
            ? <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />
            : <Text style={styles.buttonText}>{placeholder}</Text>}
        </Button>
      </View>
    );
  }
}

export default ImagePickerWrapper;
