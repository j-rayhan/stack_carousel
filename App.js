import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Animated } from 'react-native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
//
import { DATA } from './src/data'
import OverflowItems from './src/components/OverflowItems';
import { VISIBLE_ITEMS } from './src/config';
import FlatListItems from './src/components/FlatListItems';

export default function App() {
  const [data, setData] = useState(DATA)
  const [index, setIndex] = useState(0)
  const setActiveIndex = useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollX.setValue(activeIndex)
  })
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollXAnimated = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true
    }).start()
  })

  useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS) {
      // fetch new data
      const newData = [...data, ...data]
      setData(newData)
    }
  })
  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={e => {
        if (e.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return
          }
          setActiveIndex(index + 1)
        }
      }}
    >

      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={e => {
          if (e.nativeEvent.state === State.END) {
            if (index === 0) {
              return
            }
            setActiveIndex(index - 1)
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatListItems data={data} scrollXAnimated={scrollXAnimated} />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
});
