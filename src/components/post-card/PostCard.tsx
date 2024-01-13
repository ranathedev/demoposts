import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
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
  isDarkMode: boolean;
  onPress: (arg: any) => void;
  index: number;
}

const PostCard = ({post, isDarkMode, onPress, index}: Props) => {
  const capitalizeFirstLetter = (str: string) =>
    str?.charAt(0).toUpperCase() + str?.slice(1);

  return (
    <TouchableNativeFeedback onPress={() => onPress(index)}>
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6'},
        ]}>
        <Image style={styles.img} source={{uri: post.images[0]}} />
        <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#374151'}]}>
          {capitalizeFirstLetter(post?.title)}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    marginBottom: 15,
  },
  title: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 25,
  },
  img: {height: 200},
});

export default PostCard;
