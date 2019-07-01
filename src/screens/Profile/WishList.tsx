import React from 'react';
import { Text, Content, Spinner, List } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { useSelector } from 'react-redux';

import SafeWithHeader from '../../components/Pages/SafeWithHeader';
import WhiskyResult from '../../components/Search/WhiskyResult';

import { getCurrentUser } from '../../store/selectors/user';
import { getWishList } from '../../store/entities/wishList';

import colors from '../../config/colors';

import { errorComponent } from '../../core/storeInstances';

const WishList = ({ navigation }: NavigationInjectedProps) => {
  const loginUser = useSelector(getCurrentUser);

  const idParam: null | number = navigation.getParam('id', null);
  const UserId = idParam || loginUser.id;

  const wishlistInstance = getWishList(UserId);
  const wishList = wishlistInstance.value;

  if (wishlistInstance.isPending || !wishlistInstance.isResolved) {
    return <Spinner color={colors.grey3} />;
  }

  const error = errorComponent([wishlistInstance]);

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
      <Content padder scrollEnabled={wishList.items.length > 0}>
        {wishList.items.length === 0
          ? <Text note>No whiskies on the wish list yet.</Text>
          : (
            <List>
              {wishList.items.map(i => <WhiskyResult key={i} id={i} />)}
            </List>
          )}
      </Content>
    </SafeWithHeader>
  );
};

WishList.navigationOptions = {
  title: 'Wish List',
};

export default WishList;
