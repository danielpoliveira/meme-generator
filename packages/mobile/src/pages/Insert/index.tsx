import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ImageBackground, TextInput, StyleSheet } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import CustomTextInput from './CustomTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';

GLOBAL.FormData = GLOBAL.originalFormData || GLOBAL.FormData;

const Insert: React.FC = props => {

  const { navigation } = props;

  const full = useRef();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  const headerConfig = {
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8;'
    }
  };

  const onCapture = async () => {
    const data = new FormData();

    data.append('username', username);

    console.log(username);

    full.current.capture().then(async res => {

      data.append('image', {
        uri: res,
        type: 'image/png',
        name: 'teste'
      });
      
      await api.post('/meme', data, headerConfig).then(res => {
        console.log('funcionando -> ', res.data);
      }).then(() => {
        navigation.navigate('Home');
      })

      console.log(res)
      //setMeme(res)
    });
  }

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >

        <View style={{ padding: 5, width: 300, margin: 10, alignItems: "center", borderRadius: 4, borderWidth: StyleSheet.hairlineWidth }}>
          <TextInput
            
            onChangeText={setUsername}
            placeholder="Digite seu nome"
          />
        </View>

        <ViewShot ref={full} options={{ format: "jpg", quality: 0.3 }} >

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
      {/*meme && (
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: meme }} />
      )*/}
    </>
  );
}

export default Insert;