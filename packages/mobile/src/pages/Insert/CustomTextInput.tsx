import React from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';

import { PanGestureHandler, TextInput, RotationGestureHandler } from 'react-native-gesture-handler';

import rotateIcon from '../../assets/images/rotate.png';

const CustomTextInput: React.FC = props => {

  const { position } = props;

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

    <View style={{}} >
      <Animated.View style={{
        alignItems: "center",

        transform: [
          {
            translateX: TranslateX.interpolate({
              inputRange: [-30, 30],
              outputRange: [-30, 30],
              extrapolate: "clamp",
            })
          },
          {
            translateY: TranslateY.interpolate(
              position === '0'
                ?
                {
                  inputRange: [-30, 290],
                  outputRange: [-30, 290],
                  extrapolate: "clamp",
                }
                :
                {
                  inputRange: [-190, 40],
                  outputRange: [-190, 40],
                  extrapolate: "clamp",
                }
            )
          },
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

          <Animated.View style={{ padding: 30 }}>
            <RotationGestureHandler
              onGestureEvent={rotateGesture}
            >
              <View style={{

                borderColor: "#444",
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: '#cccccc88',
                padding: 20
              }} >
                <TextInput
                  placeholder="digita ai baitola"
                  style={{
                    width: 300,
                    height: 50,
                    padding: 5,


                  }}
                />
              </View>
            </RotationGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  )
}
export default CustomTextInput;