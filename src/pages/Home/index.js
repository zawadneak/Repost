import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Linking,
  Clipboard,
  ActivityIndicator,
  AppState,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Holder,
  Title,
  Box,
  InstaLabel,
  Label,
  TutorialImage,
  RepostLabel,
  Wrapper,
  Post,
  PostImage,
  TextHolder,
  User,
  Description,
} from './styles';

import tutorial from '../../assets/img/tutorial.png';

export default function Home({ navigation }) {
  const [instaURL, setURL] = useState(null);
  const [noLinks, setLinks] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPost() {
    try {
      setLoading(true);
      const response = await api.get(`?callback=&url=${String(instaURL)}`);
      const { title, author_name, thumbnail_url } = response.data;
      const postData = {
        description: title,
        author: author_name,
        image: thumbnail_url,
      };
      setPosts(postData);
      setLinks(false);
      setLoading(false);

      return 1;
    } catch (err) {
      setLoading(false);

      return 0;
    }
  }
  async function getContent() {
    const content = await Clipboard.getString();
    const urlValidator = content.startsWith('https://www.instagram.com/p/');
    if (urlValidator) {
      setURL(content);
    }
  }

  useEffect(() => {
    loadPost();
  }, [instaURL]);

  const handleScreenChange = () => {
    if (AppState.currentState === 'active') {
      getContent();
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleScreenChange);

    return () => {
      AppState.removeEventListener('change');
    };
  }, []);

  const handleNavigation = () => {
    navigation.navigate('Repost', { posts });
  };

  return (
    <Container>
      <StatusBar backgroundColor="#444" barStyle="light-content" />
      {loading ? <ActivityIndicator style={{ marginTop: 10 }} /> : null}
      {noLinks ? (
        <Holder>
          <Title>How to repost</Title>
          <Box>
            <InstaLabel onPress={() => Linking.openURL('instagram://app')}>
              1. Open Instagram
            </InstaLabel>
            <Label>
              {'2. Click '}
              <Icon name="dots-horizontal" size={20} />
            </Label>
            <TutorialImage source={tutorial} />
            <Label>3. Choose Copy Link</Label>
            <RepostLabel>4. Open Repost</RepostLabel>
          </Box>
        </Holder>
      ) : (
        <Wrapper loading={loading}>
          <Post onPress={handleNavigation}>
            <PostImage
              source={{
                uri: posts.image,
              }}
            />
            <TextHolder>
              <User>{posts.author}</User>
              <Description numberOfLines={3}>{posts.description}</Description>
            </TextHolder>
          </Post>
        </Wrapper>
      )}
    </Container>
  );
}

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
