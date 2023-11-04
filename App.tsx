import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import Posts from './src/data/mock_data.json';
import PostCard from './src/components/post-card';
import SearchBar from './src/components/search-bar';
import PostDetails from './src/components/post-details';

function App(): JSX.Element {
  const [data, setData] = useState(Posts);
  const [postDetails, setPostDetails] = useState<{
    author: string;
    avatar: string;
    title: string;
    content: string;
    publish_date: string;
    images: Array<string>;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (searchTerm === '') setData(Posts);
  }, [searchTerm]);

  const filterArray = () => {
    const filteredArray = data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setData(filteredArray);
  };

  const backToPosts = () => {
    setPostDetails(null);
  };

  const getView = () => {
    if (postDetails) {
      return (
        <Modal
          style={{borderWidth: 1, borderColor: 'red'}}
          visible={postDetails ? true : false}
          animationType="slide">
          <PostDetails
            isDarkMode={isDarkMode}
            post={postDetails}
            onBackPress={backToPosts}
          />
        </Modal>
      );
    }

    return (
      <>
        <SearchBar
          searchTerm={searchTerm}
          isDarkMode={isDarkMode}
          setSearchTerm={setSearchTerm}
          onSubmit={filterArray}
        />
        <FlatList
          style={styles.list}
          data={data}
          renderItem={post => (
            <PostCard
              post={post.item}
              isDarkMode={isDarkMode}
              onPress={setPostDetails}
            />
          )}
        />
      </>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1a1a1a' : '#fff'},
      ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#28231d' : '#fff'}
      />
      {getView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
    rowGap: 10,
    paddingBottom: 10,
  },
});

export default App;
