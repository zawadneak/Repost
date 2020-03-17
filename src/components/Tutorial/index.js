import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linking } from 'react-native';

import {
  Holder,
  Title,
  Box,
  InstaLabel,
  Label,
  TutorialImage,
  RepostLabel,
} from './styles';

import image from '../../assets/img/tutorial.png';

export default function Tutorial() {
  return (
    <Holder>
      <Title>How to repost</Title>
      <Box>
        <InstaLabel onPress={() => Linking.openURL('instagram://user')}>
          1. Open Instagram
        </InstaLabel>
        <Label>
          {'2. Click '}
          <Icon name="dots-horizontal" size={20} />
        </Label>
        <TutorialImage source={image} />
        <Label>3. Choose Copy Link</Label>
        <RepostLabel>4. Open Repost</RepostLabel>
      </Box>
    </Holder>
  );
}
