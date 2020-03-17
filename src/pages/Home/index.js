import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Clipboard,
  ActivityIndicator,
  AppState,
} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Tutorial from '../../components/Tutorial/index';

import {
  Container,
  Wrapper,
  List,
  Post,
  PostImage,
  TextHolder,
  User,
  Description,
} from './styles';

export default function Home({ navigation }) {
  const [instaURL, setURL] = useState(null);
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
      const findIndex = posts.findIndex(item => item.image === postData.image);
      if (findIndex >= 0) {
        setLoading(false);
        return 1;
      }
      setPosts([...posts, postData]);
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

  return (
    <Container>
      <StatusBar backgroundColor="#444" barStyle="light-content" />
      {loading ? <ActivityIndicator style={{ marginTop: 10 }} /> : null}
      {posts.length === 0 ? (
        <Tutorial />
      ) : (
        <Wrapper loading={loading}>
          <List
            data={posts}
            keyExtractor={item => item.image}
            renderItem={({ item }) => (
              <Post
                onPress={() => {
                  navigation.navigate('Repost', { post: item });
                }}
              >
                <PostImage
                  source={{
                    uri: item.image,
                  }}
                />
                <TextHolder>
                  <User>{item.author}</User>
                  <Description numberOfLines={3}>
                    {item.description}
                  </Description>
                </TextHolder>
              </Post>
            )}
          />
        </Wrapper>
      )}
    </Container>
  );
}

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
