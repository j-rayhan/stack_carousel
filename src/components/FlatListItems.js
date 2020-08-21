import React from 'react';
import { FlatList, Animated, View, Image } from 'react-native';
//
import { SPACING, VISIBLE_ITEMS, ITEM_HEIGHT, ITEM_WIDTH } from '../config';

const FlatListItems = ({ data, scrollXAnimated }) => {
 return (
  <FlatList
   data={data}
   keyExtractor={(_, index) => String(index)}
   horizontal
   inverted
   scrollEnabled={false}
   removeClippedSubviews={false}
   contentContainerStyle={{
    flex: 1,
    justifyContent: "center",
    padding: SPACING * 2
   }}
   CellRendererComponent={({ item, index, children, style, ...props }) => {
    const newStyle = [
     style,
     { zIndex: data.length - index }
    ]
    return (
     <View style={newStyle} index={index} {...props}>
      {children}
     </View>
    )
   }}
   renderItem={({ item, index }) => {
    const inputRange = [index - 1, index, index + 1]
    const translateX = scrollXAnimated.interpolate({
     inputRange,
     outputRange: [50, 0, 100]
    })
    const scale = scrollXAnimated.interpolate({
     inputRange,
     outputRange: [.8, 1, 1.3]
    })

    const opacity = scrollXAnimated.interpolate({
     inputRange,
     outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
    })
    return (
     <Animated.View style={{
      position: 'absolute',
      left: -ITEM_WIDTH / 2,
      opacity,
      transform: [{
       translateX
      }, { scale }]
     }}>
      <Image
       source={{ uri: item.poster }}
       style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT
       }}
      />
     </Animated.View>
    )
   }}
  />
 );
};

export default FlatListItems;