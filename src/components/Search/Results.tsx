import React from 'react';
import { Left, List, ListItem, Right, Text, Body, Icon } from 'native-base';

import WhiskyResult from './WhiskyResult';
import DistilleryResult from './DistilleryResult';

function resultByType(id: number, type: 'whisky' | 'distillery' | 'user') {
  if (type === 'whisky') return <WhiskyResult key={`${type}_${id}`} id={id} />;
  if (type === 'distillery') return <DistilleryResult key={`${type}_${id}`} id={id} />;

  return (
    <ListItem key={`${type}_${id}`} avatar>
      <Left>
        <Text>Plaatje</Text>
      </Left>
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
}

const Results = ({ results }: ResultsProps) => (
  <List>{results.map(result => resultByType(result.id, result.type))}</List>
);

export default Results;
