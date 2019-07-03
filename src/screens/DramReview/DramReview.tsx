import React, { useEffect, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Content, View, Text } from 'native-base';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import WhiskyCard from '../../components/Whisky/WhiskyCard';
import Rating from '../../components/Form/Rating';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import { getWhiskyScore } from '../../store/api/whisky';

type DramReviewProps = NavigationInjectedProps;

const DramReview = ({ navigation }: DramReviewProps) => {
  const id = navigation.getParam('id');

  const whiskyInstance = getWhisky(id);
  const distilleryInstance = getDistillery(paramFromInstance(whiskyInstance, 'DistilleryId'));

  const [isScrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const [score, setScore] = useState<{ isLoading: boolean; isResolved: boolean; score: number }>({
    isLoading: false,
    isResolved: false,
    score: 0,
  });

  useEffect(
    () => {
      if (!score.isResolved && !score.isLoading) {
        setScore({ ...score, isLoading: true });

        getWhiskyScore(id)
          .then(({ user }) => user || 0)
          .catch(() => 0)
          .then(newScore => setScore({
            ...score,
            isLoading: false,
            isResolved: true,
            score: newScore,
          }));
      }
    },
    [score.isResolved, score.isLoading],
  );

  if (!whiskyInstance.isResolved || !distilleryInstance.isResolved) {
    return null;
  }

  const error = errorComponent([whiskyInstance, distilleryInstance]);

  if (error) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          {error}
        </Content>
      </SafeWithHeader>
    );
  }

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content padder scrollEnabled={isScrollEnabled}>
        <WhiskyCard id={id} />
        <View style={{ marginBottom: 24, marginTop: 12, marginLeft: 6 }}>
          <Rating
            rating={score.score}
            onUpdate={(newScore: number) => setScore({ ...score, score: newScore })}
            onStart={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
          />
          <Text>Add review</Text>
          <Text>{score.score}</Text>
        </View>
      </Content>
    </SafeWithHeader>
  );
};

DramReview.navigationOptions = {
  title: 'Add Review',
};

export default DramReview;
