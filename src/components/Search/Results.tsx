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
  filter: SearchFilter;
  goToTab: (filter: SearchFilter) => void;
}

const Results = ({ results, filter, goToTab }: ResultsProps) => {
  if (filter === 'all') {
    const users = results.filter(r => r.type === 'user');
    const distilleries = results.filter(d => d.type === 'distillery');

    return (
      <List>
        {users
          .filter((r, index) => index < 2)
          .map(result => resultByType(result.id, result.type))}
        {users.length > 2 && (
          <ListItem key="more_users" onPress={() => goToTab('user')}>
            <Body>
              <Text note>More user results...</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        )}
        {distilleries
          .filter((d, index) => index < 2)
          .map(result => resultByType(result.id, result.type))}
        {distilleries.length > 2 && (
          <ListItem key="more_distilleries" onPress={() => goToTab('distillery')}>
            <Body>
              <Text note>More distillery results...</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        )}
        {results
          .filter(r => r.type === 'whisky')
          .map(result => resultByType(result.id, result.type))}
      </List>
    );
  }

  return (
    <List>{results.map(result => resultByType(result.id, result.type))}</List>
  );
};

export default Results;
