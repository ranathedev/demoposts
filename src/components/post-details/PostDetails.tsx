import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  post: {
    author: string;
    avatar: string;
    title: string;
    content: string;
    publish_date: string;
    images: Array<string>;
  };
  onBackPress: () => void;
  isDarkMode: boolean;
}

const PostDetails = ({post, onBackPress, isDarkMode}: Props) => {
  const capitalizeFirstLetter = (str: string) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1a1a1a' : '#fff'},
      ]}>
      <Pressable onPress={onBackPress}>
        <Text style={[styles.btnText, {color: isDarkMode ? '#fff' : 'blue'}]}>
          Back
        </Text>
      </Pressable>
      <View style={{flex: 1}}>
        <Image style={styles.img} source={{uri: post.images[0]}} />
        <View style={styles.infoContainer}>
          <View style={styles.authorContainer}>
            <Image style={styles.avatar} source={{uri: post.avatar}} />
            <Text
              style={[styles.author, {color: isDarkMode ? '#fff' : '#374151'}]}>
              {post.author}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text
              style={[
                styles.dateLabel,
                {color: isDarkMode ? '#fff' : '#374151'},
              ]}>
              Date Published:
            </Text>
            <Text style={{color: isDarkMode ? '#fff' : '#374151'}}>
              {post.publish_date}
            </Text>
          </View>
        </View>
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
          {capitalizeFirstLetter(post.title)}
        </Text>
        <ScrollView style={styles.descContainer}>
          <Text
            style={[
              styles.descripton,
              {color: isDarkMode ? '#bbb' : '#374151'},
            ]}>
            {post.content}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    width: '100%',
    paddingTop: 10,
  },
  btnText: {
    paddingLeft: 10,
    fontSize: 20,
    color: 'blue',
  },
  img: {
    height: 200,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  authorContainer: {
    alignItems: 'center',
    gap: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  author: {
    fontWeight: '500',
  },
  dateContainer: {
    gap: 5,
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontWeight: '500',
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  descContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  descripton: {
    fontSize: 22,
  },
});

export default PostDetails;
