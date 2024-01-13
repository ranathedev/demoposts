import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  posts: Array<{
    author: string;
    avatar: string;
    title: string;
    content: string;
    publish_date: string;
    images: Array<string>;
  }>;
  onBackPress: () => void;
  isDarkMode: boolean;
  postIndex: number;
  setPostIndex: (arg: number) => void;
}

const PostDetails = ({
  posts,
  onBackPress,
  isDarkMode,
  postIndex,
  setPostIndex,
}: Props) => {
  const [imgIndex, setImgIndex] = useState(0);

  const imgPos = useRef(new Animated.Value(0)).current;
  const postPos = useRef(new Animated.Value(0)).current;

  const imgPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // @ts-ignore
    onPanResponderMove: (evt, gestureState) => imgPos.setValue(gestureState.dx),
    // @ts-ignore
    onPanResponderRelease: (evt, gestureState) => {
      const width = Dimensions.get('window').width;
      if (Math.abs(gestureState.dx) > width * 0.4) {
        const direction = Math.sign(gestureState.dx);
        Animated.timing(imgPos, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: false,
        }).start(() => handelImageSwipe(-1 * direction, width));
      } else
        Animated.spring(imgPos, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
    },
  });

  const postPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // @ts-ignore
    onPanResponderMove: (evt, gestureState) =>
      postPos.setValue(gestureState.dx),
    // @ts-ignore
    onPanResponderRelease: (evt, gestureState) => {
      const width = Dimensions.get('window').width;
      if (Math.abs(gestureState.dx) > width * 0.5) {
        const direction = Math.sign(gestureState.dx);
        Animated.timing(postPos, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: false,
        }).start(() => handelPostSwipe(-1 * direction, width));
      } else
        Animated.spring(postPos, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
    },
  });

  const handelImageSwipe = (indexIndirection: number, width: number) => {
    if (!posts[postIndex].images[imgIndex + indexIndirection]) {
      Animated.timing(imgPos, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    setImgIndex(imgIndex + indexIndirection);
    imgPos.setValue(indexIndirection * width);
    Animated.spring(imgPos, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const handelPostSwipe = (indexIndirection: number, width: number) => {
    if (!posts[postIndex + indexIndirection]) {
      Animated.timing(postPos, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    setPostIndex(postIndex + indexIndirection);
    postPos.setValue(indexIndirection * width);
    Animated.spring(postPos, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const capitalizeFirstLetter = (str: string) =>
    str?.charAt(0).toUpperCase() + str?.slice(1);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#28231d' : '#fff'},
        {transform: [{translateX: postPos}]},
      ]}>
      <Pressable onPress={onBackPress}>
        <Text style={[styles.btnText, {color: isDarkMode ? '#fff' : 'blue'}]}>
          Back to Posts
        </Text>
      </Pressable>
      <View style={{flex: 1}}>
        <Animated.Image
          {...imgPanResponder.panHandlers}
          style={[styles.img, {transform: [{translateX: imgPos}]}]}
          source={{uri: posts[postIndex].images[imgIndex]}}
        />
        <View {...postPanResponder.panHandlers} style={{flex: 1}}>
          <View style={styles.infoContainer}>
            <View style={styles.authorContainer}>
              <Image
                style={styles.avatar}
                source={{uri: posts[postIndex].avatar}}
              />
              <Text
                style={[
                  styles.author,
                  {color: isDarkMode ? '#fff' : '#374151'},
                ]}>
                {posts[postIndex].author}
              </Text>
            </View>

            <Text style={{color: isDarkMode ? '#fff' : '#374151'}}>
              {posts[postIndex].publish_date}
            </Text>
          </View>
          <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
            {capitalizeFirstLetter(posts[postIndex].title)}
          </Text>
          <ScrollView style={styles.descContainer}>
            <Text
              style={[
                styles.descripton,
                {color: isDarkMode ? '#bbb' : '#374151'},
              ]}>
              {posts[postIndex].content}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    width: '100%',
    paddingTop: 10,
    borderWidth: 1,
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
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
