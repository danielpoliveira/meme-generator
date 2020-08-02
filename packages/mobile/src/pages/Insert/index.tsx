import React, { useState, useRef } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import CustomTextInput from './CustomTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Insert: React.FC = () => {

  const full = useRef();
  const [image, setImage] = useState(null);
  const [meme, setMeme] = useState(null);

  const onCapture = React.useCallback(() => {
    full.current.capture().then(res => {

      console.log(res)
      setMeme(res)
    });
  }, []);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
        <ViewShot ref={full} >

          {/*<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} > */}
          {/*<View style={{ alignItems: "center", backgroundColor: 'brown' }}>
      <CustomTextInput position='0' />
      <CustomTextInput />
    </View>*/}

          <ImageBackground
            style={{
              width: 400,
              height: 400,
              backgroundColor: "gray",
            }}
            //source={{ uri: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' }}
            source={{ uri: image }}
          >
            <CustomTextInput position='0' />
            <CustomTextInput />
          </ImageBackground>

        </ViewShot>
        <View>

          <View style={{ flexDirection: "row", }} >
            <View
              style={{ backgroundColor: "brown", padding: 10, margin: 10 }}
              onTouchEnd={() => ImagePicker.launchCamera({ noData: true }, response => {
                if (response?.uri)
                  setImage(response.uri)
              })} >
              <Text style={{ color: "#FFF" }}>Open Camera</Text>
            </View>

            <View
              style={{ backgroundColor: "brown", padding: 10, margin: 10 }}
              onTouchEnd={() => ImagePicker.launchImageLibrary({ noData: true }, response => {
                if (response?.uri)
                  setImage(response.uri)
              })} >
              <Text style={{ color: "#FFF" }}>Choose image </Text>
            </View>

          </View>

          {
            image && (
              <TouchableOpacity
                onPress={onCapture}
                style={{ padding: 15, borderRadius: 10, marginTop: 20, backgroundColor: "#004ba0", alignItems: "center" }} >
                <Text style={{ color: '#FFF', }}>{'Generate a meme'.toUpperCase()}</Text>
              </TouchableOpacity>
            )
          }



        </View>
        {/** </View> */}
    </View>
      {meme && (
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: meme }} />
      )}
    </>
  );
}

export default Insert;