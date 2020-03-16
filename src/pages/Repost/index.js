import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Share from 'react-native-share';

import {
  Container,
  Box,
  Picture,
  Description,
  RepostButton,
  Gradient,
  Label,
} from './styles';

export default function Repost({ route }) {
  const { posts } = route.params;

  const handleShare = () => {
    const shareOptions = {
      message: 'some message',
      url: posts.image,
      social: Share.Social.INSTAGRAM_STORIES,
      stickerImage: `data:link,${posts.image}`,
    };
    Share.open(shareOptions);
  };

  const repostDescription = `#REPOST @${posts.author} \n\n${posts.description}`;

  return (
    <Container>
      <Box>
        <Picture
          source={{
            uri: posts.image,
          }}
        />
        <Description>{repostDescription}</Description>
        <RepostButton onPress={handleShare}>
          <Gradient>
            <Icon name="instagram" color="#fff" size={25} />
            <Label>Repost</Label>
          </Gradient>
        </RepostButton>
      </Box>
    </Container>
  );
}
