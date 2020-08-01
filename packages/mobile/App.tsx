import 'react-native-gesture-handler';

import React from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';

import { PanGestureHandler, TextInput, RotationGestureHandler } from 'react-native-gesture-handler';

import rotateIcon from './src/assets/images/rotate.png';

const App: React.FC = () => {

  const TranslateX = new Animated.Value(0);
  const TranslateY = new Animated.Value(0);
  
  const Translate2X = new Animated.Value(0);
  const Translate2Y = new Animated.Value(0);

  const rotate = new Animated.Value(0);
  const rotate2 = new Animated.Value(0);

  const handleGesture = Animated.event([{
    nativeEvent: {
      translationX: TranslateX,
      translationY: TranslateY,
    }
  }], {
    useNativeDriver: true,
  });

  const rotateGesture = Animated.event([{
    nativeEvent: {
      rotation: rotate,
    }
  }], {
    useNativeDriver: false,
  })

  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >

      <Animated.View style={{
        width: 200,
        height: 100,


        alignItems: "center",

        transform: [
          { translateX: TranslateX },
          { translateY: TranslateY },
          {
            rotate: rotate.interpolate({
              inputRange: [-100, 100],
              outputRange: ['-100rad', '100rad'],
            }),
          },
          { perspective: 200 }
        ]
      }}
      >
        <PanGestureHandler /*minDist={0}*/
          onGestureEvent={handleGesture}
        >
          <Animated.View style={{ backgroundColor: "blue", padding: 30 }}>
            <TextInput
              placeholder="digita ai baitola"
              style={{
                padding: 5,
                borderColor: "#444",
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 10,
                marginBottom: 10,

              }}
            />
          </Animated.View>
        </PanGestureHandler>

        <RotationGestureHandler
          onGestureEvent={rotateGesture}
        >
          <Image source={rotateIcon} style={{ width: 150, height: 150 }} />
        </RotationGestureHandler>



      </Animated.View>
    </View>
  )
}
export default App;