import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, Image, Animated } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { OVERFLOW_HEIGHT, SPACING } from '../config';


const styles = StyleSheet.create({
 overflowContainer: {
  height: OVERFLOW_HEIGHT,
  overflow: 'hidden'
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
});

const OverflowItems = ({ data, scrollXAnimated }) => {
 const inputRange = [-1, 0, 1]
 const translateY = scrollXAnimated.interpolate({
  inputRange,
  outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
 })

 return (
  <View style={styles.overflowContainer}>
   <Animated.View style={{ transform: [{ translateY }] }}>
    {
     data.map((item, index) => {
      return (
       <View key={index} style={styles.overflowItem}>
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
   </Animated.View>
  </View>
 )
}

export default OverflowItems;