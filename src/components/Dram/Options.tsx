import React, { useCallback } from 'react';
import { ActionSheet, Button, Icon } from 'native-base';
import { Alert } from 'react-native';

import { reportDram } from '../../store/api/drams';
import { dispatch } from '../../store/store';
import { removeDram } from '../../store/actions/dram';

interface OptionsProps {
  dram: DramShape;
  currentUser: StoreCurrentUser;
}

const Options = ({ dram, currentUser }: OptionsProps) => {
  const isSelf = dram.UserId === currentUser.id;

  const onOptions = useCallback(
    () => {
      const sheetOptions = isSelf
        ? {
          destructiveButtonIndex: 1,
          options: [
            'Edit dram',
            'Remove dram',
            'Cancel',
          ],
        }
        : {
          destructiveButtonIndex: 0,
          options: [
            'Report as inappropriate',
            'Cancel',
          ],
        };

      const handleChoice = isSelf
        ? (index: number) => {
          if (index === 1) {
            Alert.alert(
              'Remove Dram',
              'Are you sure you want to remove this dram?',
              [
                {
                  style: 'cancel',
                  text: 'Cancel',
                },
                {
                  onPress: () => {
                    dispatch(removeDram(dram.id));
                  },
                  style: 'destructive',
                  text: 'Remove',
                },
              ],
            );
          }
        }
        : (index: number) => {
          if (index === 0) {
            Alert.alert('Dram has been reported to the moderators.');
            reportDram(dram.id);
          }
        };

      ActionSheet.show(
        {
          ...sheetOptions,
          cancelButtonIndex: sheetOptions.options.length - 1,
        },
        handleChoice,
      );
    },
    [isSelf],
  );

  return (
    <Button transparent icon onPress={onOptions}>
      <Icon name="more" />
    </Button>
  );
};

export default Options;
