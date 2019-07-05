import React, { useEffect, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Content, View, Text, Textarea, Button } from 'native-base';
import { Formik } from 'formik';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import WhiskyCard from '../../components/Whisky/WhiskyCard';
import Rating from '../../components/Form/Rating';
import Flavours from '../../components/Form/Flavours/Flavours';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import { getWhiskyScore } from '../../store/api/whisky';

import colors from '../../config/colors';
import ImagePicker from '../../components/Form/ImagePicker';

type DramReviewProps = NavigationInjectedProps;

const DramReview = ({ navigation }: DramReviewProps) => {
  const id = navigation.getParam('id');

  const whiskyInstance = getWhisky(id);
  const distilleryInstance = getDistillery(paramFromInstance(whiskyInstance, 'DistilleryId'));

  const [isScrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [formWidth, setFormWidth] = useState<number | string>('auto');

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
      <Content padder scrollEnabled={isScrollEnabled} contentContainerStyle={{ flex: 1 }}>
        <WhiskyCard disableLink id={id} />
        <Formik
          initialValues={{
            image: '',
            message: '',
            rating: score,
          }}
          onSubmit={console.log}
        >
          {props => (
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    borderBottomColor: colors.grey4,
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    flexGrow: 0,
                    flexShrink: 1,
                    justifyContent: 'space-between',
                    marginBottom: 12,
                    marginTop: 12,
                    paddingBottom: 12,
                  }}
                  onLayout={e => setFormWidth(e.nativeEvent.layout.width - 86)}
                >
                  <View style={{ width: formWidth }}>
                    <Textarea
                      rowSpan={3}
                      placeholder="What are your thoughts on this dram?"
                    />
                  </View>
                  <View style={{ width: 80, flexShrink: 0, marginLeft: 6 }}>
                    <ImagePicker
                      name="image"
                      aspect={[16, 9]}
                      formikProps={props}
                      placeholder="Add Photo"
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 24, marginTop: 12, marginLeft: 6 }}>
                  <Rating
                    rating={score.score}
                    onUpdate={(newScore: number) => setScore({ ...score, score: newScore })}
                    onStart={() => setScrollEnabled(false)}
                    onEnd={() => setScrollEnabled(true)}
                  />
                </View>
                <View>
                  <Flavours WhiskyId={id} />
                </View>
              </View>
              <Button block>
                <Text>Place Review</Text>
              </Button>
            </View>
          )}
        </Formik>
      </Content>
    </SafeWithHeader>
  );
};

DramReview.navigationOptions = {
  headerBackTitle: 'Save',
  title: 'Add Review',
};

export default DramReview;
