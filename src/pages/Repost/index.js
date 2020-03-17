import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import RNFetchBlob from 'rn-fetch-blob';
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
  const [imagePath, setPath] = useState(null);
  const [filename, setFilename] = useState(null);

  useEffect(() => {
    async function downloadImage() {
      await RNFetchBlob.config({
        appendExt: 'jpg',
      })
        .fetch('GET', posts.image, {})
        .then(res => {
          setPath(res.base64());
        });
    }

    downloadImage();
  }, []);

  const repostDescription = `#REPOST @${posts.author} \n\n${posts.description}`;

  const handleShare = () => {
    const options = {
      url: `data:image/jpg;base64,${imagePath}`,
      message: repostDescription,
      title: 'test',
      type: 'image/*',
      filename: 'image.jpg',
      social: Share.Social.INSTAGRAM,
      instagramCaption: 'for insta',
    };

    Share.shareSingle(options);
  };

  return (
    <Container>
      <Box>
        <Picture source={{ uri: `data:image/*;base64,${imagePath}` }} />
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

Repost.propTypes = {
  route: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
