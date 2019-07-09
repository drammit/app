import React, { useCallback, useEffect, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Content, View, Text, Textarea, Button, Spinner } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import WhiskyCard from '../../components/Whisky/WhiskyCard';
import Rating from '../../components/Form/Rating';
import Flavours from '../../components/Form/Flavours/Flavours';
import ImagePicker from '../../components/Form/ImagePicker';
import ErrorMessage from '../../components/Form/ErrorMessage';

import Success from './Success';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import { getWhiskyScore } from '../../store/api/whisky';

import colors from '../../config/colors';
import { postDram } from '../../store/api/drams';
import { Alert } from 'react-native';
import whiskyName from '../../core/whiskyName';

const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(0.5, 'Please rate your dram'),
});

type DramReviewProps = NavigationInjectedProps;

const DramReview = ({ navigation }: DramReviewProps) => {
  const id = navigation.getParam('id');

  const whiskyInstance = getWhisky(id);
  const distilleryInstance = getDistillery(paramFromInstance(whiskyInstance, 'DistilleryId'));

  const [isScrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [isPosted, setIsPosted] = useState<boolean>(false);
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

  const name = whiskyName(whiskyInstance, distilleryInstance);

  const onSubmit = useCallback(
    ({ message, rating, flavours }, props) => {
      postDram({ name, message, rating, flavours, WhiskyId: id })
        .then((result) => {
          console.log(result);
          setIsPosted(true);
        })
        .catch((err) => {
          Alert.alert('Something went wrong', err.message);
          props.setSubmitting(false);
        });
    },
    [name],
  );

  if (!whiskyInstance.isResolved || !distilleryInstance.isResolved || !score.isResolved) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder scrollEnabled={false}>
          <Spinner color={colors.grey3} />
        </Content>
      </SafeWithHeader>
    );
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

  if (isPosted) return <Success id={id} />;

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Formik
        initialValues={{
          flavours: [],
          image: '',
          message: '',
          rating: score.score,
        }}
        validationSchema={ReviewSchema}
        onSubmit={onSubmit}
      >
        {props => (
          <View style={{ flex: 1 }}>
            <Content
              padder
              scrollEnabled={isScrollEnabled}
              contentContainerStyle={{
                flex: 1,
                opacity: props.isSubmitting ? 0.5 : 1,
              }}
            >
              <WhiskyCard disableLink id={id} />
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
                    onChangeText={text => props.handleChange('message')(text)}
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
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 12,
                  marginLeft: 6,
                  marginTop: 12,
                }}
              >
                <Rating
                  rating={score.score}
                  onUpdate={(newScore: number) => {
                    setScore({ ...score, score: newScore });
                    props.handleChange('rating')(newScore);
                  }}
                  onStart={() => setScrollEnabled(false)}
                  onEnd={() => setScrollEnabled(true)}
                />
                <ErrorMessage>{props.touched.rating && props.errors.rating}</ErrorMessage>
              </View>
              <Flavours
                WhiskyId={id}
                onChange={(flavours: number[]) => props.handleChange('flavours')(flavours)}
              />
            </Content>
            <View style={{ paddingLeft: 8, paddingRight: 8 }}>
              <Button
                block
                disabled={props.isSubmitting}
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
              >
                <Text>Place Review</Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </SafeWithHeader>
  );
};

DramReview.navigationOptions = {
  gesturesEnabled: false,
  headerBackTitle: 'Save',
  title: 'Add Review',
};

export default DramReview;
