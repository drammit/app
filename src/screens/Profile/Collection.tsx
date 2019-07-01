import React from 'react';
import { Text, Content, Spinner, List } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { useSelector } from 'react-redux';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import WhiskyResult from '../../components/Search/WhiskyResult';

import { getCurrentUser } from '../../store/selectors/user';
import { getCollection } from '../../store/entities/collections';

import colors from '../../config/colors';

import { errorComponent } from '../../core/storeInstances';

const Collection = ({ navigation }: NavigationInjectedProps) => {
  const loginUser = useSelector(getCurrentUser);

  const idParam: null | number = navigation.getParam('id', null);
  const UserId = idParam || loginUser.id;

  const collectionInstance = getCollection(UserId);
  const collection = collectionInstance.value;

  if (collectionInstance.isPending || !collectionInstance.isResolved) {
    return <Spinner color={colors.grey3} />;
  }

  const error = errorComponent([collectionInstance]);

  if (error) {
    return (
      <SafeWithHeader style={{ flex: 1 }}>
        <Content padder scrollEnabled={false}>
          {error}
        </Content>
      </SafeWithHeader>
    );
  }

  return (
    <SafeWithHeader style={{ flex: 1 }}>
      <Content padder scrollEnabled={collection.items.length > 0}>
        {collection.items.length === 0
          ? (
            <Text note style={{ textAlign: 'center', padding: 24 }}>
              No whiskies in the collection yet.
            </Text>
          )
          : (
            <List>
              {collection.items.map(i => <WhiskyResult key={i} id={i} />)}
            </List>
          )}
      </Content>
    </SafeWithHeader>
  );
};

Collection.navigationOptions = {
  title: 'Collection',
};

export default Collection;
