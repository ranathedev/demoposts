import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Posts from './src/data/mock_data.json';
import PostCard from './src/components/post-card';

const ItemSeparator = () => <View style={{height: 15}} />;

function App(): JSX.Element {
  const [data, setData] = useState(Posts);
  const isDarkMode = useColorScheme() === 'dark';

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
      <FlatList
        style={styles.list}
        data={data}
        renderItem={post => (
          <PostCard post={post.item} isDarKMode={isDarkMode} />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
    rowGap: 10,
  },
});

export default App;
