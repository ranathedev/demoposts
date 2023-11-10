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
  const [postIndex, setPostIndex] = useState(-1);
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
    setPostIndex(-1);
  };

  const getView = () => {
    if (postIndex >= 0) {
      return (
        <Modal
          style={{
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: isDarkMode ? '#28231d' : '#fff',
          }}
          visible={postIndex >= 0 ? true : false}
          animationType="slide">
          <PostDetails
            isDarkMode={isDarkMode}
            posts={data}
            onBackPress={backToPosts}
            postIndex={postIndex}
            setPostIndex={setPostIndex}
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
              index={post.index}
              isDarkMode={isDarkMode}
              onPress={setPostIndex}
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
        {backgroundColor: isDarkMode ? '#28231d' : '#fff'},
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
