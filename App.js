import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, Image, Animated } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen')
// https://www.creative-flyers.com
const DATA = [
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data }) => {
  return (
    <View style={styles.overflowContainer}>
      <View>
        {
          data.map((item,index) => {
            return (
              <View key={index} sytle={styles.overflowItem}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.itemRow}>
                  <Text style={styles.location}>
                    <EvilIcons
                      name='location'
                      size={16}
                      color='black'
                      style={{ marginRight: 5 }}
                      />
                      {item.location}
                  </Text>
                  <Text style={styles.date}>
                    {item.date}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}
export default function App() {
  const [ data, setData ] = useState(DATA)
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollXAnimated = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true
    }).start()
  })
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <OverflowItems data={data} />
      <FlatList 
        data={data}
        keyExtractor={( _, index) => String(index)}
        horizontal
        inverted
        scrollEnabled={false}
        removeClippedSubviews={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          padding: SPACING * 2
        }}
        CellRendererComponent={({ item, index, children, style, ...props}) => {
          const newStyle = [
            style,
            {zIndex: data.length - index }
          ]
          return (
            <View style={newStyle} index={index} {...props}>
              {children}
            </View>
          )
        }}
        renderItem={({item, index}) => {
          const inputRange = [ index -1, index, index + 1]
          const translateX = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [ 50, 0 , 100]
          })
          const scale = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [ .8, 1 , 1.3]
          })
          return (
          <Animated.View style={{ 
            position: 'absolute',
            left: -ITEM_WIDTH / 2,
            transform: [{
              translateX
            }, { scale }]
            }}>
            <Image 
              source={{ uri: item.poster }}
              style={{
                width: ITEM_WIDTH,
                height:ITEM_HEIGHT
              }}
            />
          </Animated.View>
        )}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1
  },
  location: {
    fontSize: 16
  },
  date: {
    fontSize: 12
  },
  overflowItem: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden'
  }
});
