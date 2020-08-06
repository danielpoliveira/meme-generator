import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ImageBackground, TextInput, StyleSheet } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import CustomTextInput from './CustomTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';

declare var GLOBAL: any;

GLOBAL.FormData = GLOBAL.originalFormData || GLOBAL.FormData;

const Insert: React.FC = (props: any) => {

  const { navigation } = props;

  const full: any = useRef();
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

    full.current.capture().then(async res => {
      data.append('image',
        JSON.parse(
          JSON.stringify({
            uri: res,
            type: 'image/png',
            name: 'teste'
          })
        )
      );

      await api.post('/meme', data, headerConfig).then(res => {
        console.log('funcionando -> ', res.data);
      }).then(() => {
        navigation.navigate('Home');
      })
    });
  }

  const position: number = 1;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >

      <View style={{ padding: 5, width: 300, margin: 10, alignItems: "center", borderRadius: 4, borderWidth: StyleSheet.hairlineWidth }}>
        <TextInput

          onChangeText={setUsername}
          placeholder="Digite seu nome"
        />
      </View>

      <ViewShot ref={full} options={{ format: "jpg", quality: 0.3 }} >

        <ImageBackground
          style={{
            width: 400,
            height: 400,
            backgroundColor: "gray",
          }}
          
          source={{ uri: image }}
        >
          <CustomTextInput />
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
          (image && username)? (
            <TouchableOpacity
              onPress={onCapture}
              style={{ padding: 15, borderRadius: 10, marginTop: 20, backgroundColor: "#004ba0", alignItems: "center" }} >
              <Text style={{ color: '#FFF', }}>{'Generate a meme'.toUpperCase()}</Text>
            </TouchableOpacity>
          ): undefined
        }
      </View>
    </View>
  );
}

export default Insert;