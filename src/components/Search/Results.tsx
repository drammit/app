import React from 'react';
import { Left, List, ListItem, Right, Text, Body, Icon, View } from 'native-base';

import WhiskyResult from './WhiskyResult';
import DistilleryResult from './DistilleryResult';
import UserResult from './UserResult';

function resultByType(id: number, type: 'whisky' | 'distillery' | 'user') {
  if (type === 'whisky') return <WhiskyResult key={`${type}_${id}`} id={id} />;
  if (type === 'distillery') return <DistilleryResult key={`${type}_${id}`} id={id} />;
  if (type === 'user') return <UserResult key={`${type}_${id}`} id={id} />;

  return (
    <ListItem key={`${type}_${id}`} avatar>
      <Body>
        <Text>{id}</Text>
        <Text note>{type}</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
}

interface ResultsProps {
  results: SearchResult[];
  filter: SearchFilter;
  goToTab: (filter: SearchFilter) => void;
}

const Results = ({ results }: ResultsProps) => {
  if (results.length === 0) {
    return (
      <View style={{ padding: 24, alignItems: 'center' }}>
        <Text note>Start typing in the search bar</Text>
      </View>
    );
  }

  return (
    <List>{results.map(result => resultByType(result.id, result.type))}</List>
  );
};

export default Results;
