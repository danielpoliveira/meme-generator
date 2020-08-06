import React, { useState } from 'react';
import { View, Animated, StyleSheet, Keyboard, } from 'react-native';

import { PanGestureHandler, TextInput, PinchGestureHandler, RotationGestureHandler, State } from 'react-native-gesture-handler';

const CustomTextInput: React.FC = (props: any & { position: boolean }) => {

  const { position } = props;

  const panRef: any = React.createRef();
  const rotationRef: any = React.createRef();
  const pinchRef: any = React.createRef();

  const lastOffset = {
    x: 0, y: 0,
  };
  const [baseScale] = useState(new Animated.Value(1));
  const [pinchScale] = useState(new Animated.Value(1));
  const scale = Animated.multiply(baseScale, pinchScale);

  let lastScale = 1;
  let lastRotate = 0;

  const [tilt] = useState(new Animated.Value(0));
  const [TranslateX] = useState(new Animated.Value(0));
  const [TranslateY] = useState(new Animated.Value(0));

  const [rotate] = useState(new Animated.Value(0));


  const [textInputIsEditable, setTextInputIsEditable] = useState(false);

  

  const handleGesture = Animated.event([{
    nativeEvent: {
      translationX: TranslateX,
      translationY: TranslateY,
    }
  }], {
    useNativeDriver: true,
  });

  const handleGestureChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.x += event.nativeEvent.translationX;
      lastOffset.y += event.nativeEvent.translationY;

      TranslateX.setOffset(lastOffset.x);
      TranslateX.setValue(0);

      TranslateY.setOffset(lastOffset.y);
      TranslateY.setValue(0);
    }
  }

  const pinchGesture = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true },
  );

  const pinchGestureStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScale.setValue(lastScale);
      pinchScale.setValue(1);
    }
  };

  const rotateGesture = Animated.event([{
    nativeEvent: {
      rotation: rotate,
    }
  }], {
    useNativeDriver: false,
  })

  const rotateGesturechange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastRotate += event.nativeEvent.rotation;
      rotate.setOffset(lastRotate);
      rotate.setValue(0);
    }
  }
  return (
    <PanGestureHandler
      ref={panRef}
      simultaneousHandlers={[rotationRef, pinchRef]}
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleGestureChange}
      maxPointers={2}
      avgTouches
    >
      <Animated.View style={{


        flex: 1,

        transform: [
          { translateX: TranslateX },
          { translateY: TranslateY },
        ],


      }}>

        <RotationGestureHandler
          ref={rotationRef}
          simultaneousHandlers={pinchRef}
          onGestureEvent={rotateGesture}
          onHandlerStateChange={rotateGesturechange}
        >
          <Animated.View style={{
            flex: 1,

            transform: [
              {
                rotate: rotate.interpolate({
                  inputRange: [-100, 100],
                  outputRange: ['-100rad', '100rad'],
                }),
              },
            ]
          }}>

            <PinchGestureHandler
              ref={pinchRef}
              simultaneousHandlers={rotationRef}
              onGestureEvent={pinchGesture}
              onHandlerStateChange={pinchGestureStateChange}
            >
              <Animated.View style={{
                alignItems: "center",
          
                transform: [
                  { perspective: 200 },
                  { scale: scale },
                ],
                overflow: "hidden",
                flex: 1,
                justifyContent: "center",
              }} collapsable={false}>

                <Animated.View
                  
                  style={{ width: 250, height: 80, backgroundColor: '#ccccccaf', padding: 20, borderRadius: 8, 
                  justifyContent: "center", alignItems: "center" }}
                >
                  <TextInput
                    style={{   }}
                    
                    

                    placeholder="Digite sua mensagem"
                  />

                </Animated.View>
              </Animated.View>
            </PinchGestureHandler>

          </Animated.View>

        </RotationGestureHandler>

      </Animated.View>
    </PanGestureHandler>
  )
}
export default CustomTextInput;