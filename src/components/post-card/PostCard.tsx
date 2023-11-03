import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

interface Props {
  post: {
    author: string;
    avatar: string;
    title: string;
    content: string;
    publish_date: string;
    images: Array<string>;
  };
  isDarKMode: boolean;
}

const PostCard = ({post, isDarKMode}: Props) => {
  const capitalizeFirstLetter = (str: string) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarKMode ? '#1f2937' : '#f3f4f6'},
      ]}>
      <Image style={styles.img} source={{uri: post?.images[0]}} />
      <Text style={[styles.title, {color: isDarKMode ? '#fff' : '#374151'}]}>
        {capitalizeFirstLetter(post?.title)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  title: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 25,
  },
  img: {width: 'auto', height: 200},
});

export default PostCard;
