import React, { useCallback, useEffect, useState } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Content, View, Text, Textarea, Button, Spinner } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-native';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import WhiskyCard from '../../components/Whisky/WhiskyCard';
import Rating from '../../components/Form/Rating';
import Flavours from '../../components/Form/Flavours/Flavours';
import ImagePicker from '../../components/Form/ImagePicker';
import ErrorMessage from '../../components/Form/ErrorMessage';

import Success from './Success';

import whiskyName from '../../core/whiskyName';
import { errorComponent, paramFromInstance } from '../../core/storeInstances';
import createDramImageUrl from '../../core/dramImageUrl';

import { getWhisky } from '../../store/entities/whiskies';
import { getDistillery } from '../../store/entities/distilleries';
import { getWhiskyScore } from '../../store/api/whisky';
import { addDram, uploadDramImage, updateDram } from '../../store/actions/dram';
import { dispatch } from '../../store/store';
import { postDram, editDram } from '../../store/api/drams';
import { getDram } from '../../store/entities/drams';

import colors from '../../config/colors';

const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(0.5, 'Please rate your dram'),
});

type DramReviewProps = NavigationInjectedProps;

const DramReview = ({ navigation }: DramReviewProps) => {
  const DramId = navigation.getParam('DramId', false);
  const dramInstance = getDram(DramId);
  const dram = dramInstance.value;
  const isEdit = Boolean(DramId);

  const WhiskyIdParam = navigation.getParam('WhiskyId', false);
  const WhiskyId = WhiskyIdParam || paramFromInstance(dramInstance, 'WhiskyId');

  const whiskyInstance = getWhisky(WhiskyId);
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
      if (
        !isEdit
        && !score.isResolved
        && !score.isLoading
      ) {
        setScore({ ...score, isLoading: true });

        getWhiskyScore(WhiskyId)
          .then(({ user }) => user || 0)
          .catch(() => 0)
          .then(newScore => setScore({
            isLoading: false,
            isResolved: true,
            score: newScore,
          }));
      } else if (
        isEdit
        && !score.isResolved
        && !score.isLoading
        && dramInstance.isResolved
      ) {
        setScore({
          isLoading: false,
          isResolved: true,
          score: dramInstance.value.rating,
        });
      }
    },
    [isEdit, score.isResolved, score.isLoading, dramInstance.isResolved, dramInstance.value],
  );

  const name = whiskyName(whiskyInstance, distilleryInstance);
  const imageUri = createDramImageUrl(dram.image);

  const onSubmit = useCallback(
    ({ message, rating, flavours, image }, props) => {
      const sendToAPI = isEdit
        ? () => editDram(DramId, { name, message, rating, flavours, WhiskyId }, image === '')
          .then((result) => {
            dispatch(updateDram(result));

            if (image && image !== imageUri) dispatch(uploadDramImage(DramId, image));

            Alert.alert('Your review has been updated');
            navigation.goBack();
          })
        : () => postDram({ name, message, rating, flavours, WhiskyId })
          .then((result) => {
            dispatch(addDram(result));
            setIsPosted(true);

            if (image) dispatch(uploadDramImage(result.id, image));
          });

      sendToAPI()
        .catch((err) => {
          Alert.alert('Something went wrong', err.message);
          props.setSubmitting(false);
        });
    },
    [name, imageUri],
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

  const error = errorComponent([dramInstance, whiskyInstance, distilleryInstance]);

  if (error) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder>
          {error}
        </Content>
      </SafeWithHeader>
    );
  }

  if (isPosted) return <Success id={WhiskyId} />;

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Formik
        initialValues={{
          flavours: dram.flavours,
          image: imageUri,
          message: dram.message,
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
              <WhiskyCard disableLink id={WhiskyId} />
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
                    value={props.values.message}
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
                WhiskyId={WhiskyId}
                flavours={props.values.flavours}
                onChange={(flavours: number[]) => props.handleChange('flavours')(flavours)}
              />
            </Content>
            <View style={{ paddingLeft: 8, paddingRight: 8 }}>
              <Button
                block
                disabled={props.isSubmitting}
                onPress={props.isSubmitting ? () => undefined : props.handleSubmit}
              >
                <Text>{isEdit ? 'Update Review' : 'Place Review'}</Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </SafeWithHeader>
  );
};

DramReview.navigationOptions = ({ navigation }: NavigationInjectedProps) => {
  const DramId = navigation.getParam('DramId', false);

  return {
    gesturesEnabled: false,
    headerBackTitle: 'Save',
    title: DramId ? 'Edit Review' : 'Add Review',
  };
};

export default DramReview;
