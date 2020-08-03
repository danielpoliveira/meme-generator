import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StatusBar } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler'

import moment from 'moment';

import { useFocusEffect } from '@react-navigation/native';

import api, { baseURL } from '../../services/api';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

moment.updateLocale('pt-br', {
  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
});

const Home: React.FC = props => {

  const { navigation } = props;

  const [memes, setMemes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function loadMemes() {
        await api.get('/memes').then(res => {
          setMemes(res.data.meme);
        })
      }

      loadMemes();
    }, [])
  );
  /*
    useEffect(() => {
      async function loadMemes() {
        await api.get('/memes').then(res => {
  
          console.log(res.data.meme);
  
          setMemes(res.data.meme);
        })
      }
  
      loadMemes();
    }, []);
  */
  return (
    <View style={{}} >

      <View style={{ padding: 10, backgroundColor: '#004ba0', width: "100%", alignItems: "center" }}>
        <Text style={{
          marginTop: StatusBar.currentHeight,
          color: "#FFF",
          fontSize: 20, fontWeight: "bold"
        }}>Meme-generator App
        </Text>
      </View>

      <FlatList
        data={memes}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={item => <Meme {...item}
        navigation={navigation}
        end={item.index === memes.length - 1 ? true : undefined} />}
      />
    </View>
  );
}

const Meme = props => {
  const { item, end, navigation } = props;

  return (
    <View
    onTouchEnd={
      () => {
        navigation.navigate('Meme', { item });
      }
    }
      style={
        [
          end ? { marginBottom: 20 } : undefined,

          {
            flexDirection: "row", backgroundColor: "#bbb",
            marginTop: 7.5,
            marginHorizontal: 5,
            borderRadius: 5, overflow: "hidden"
          }]} >

      <Image source={{ uri: baseURL + 'images/' + item.image }} style={{ height: 230, width: 230, }} />


      <View style={{flex:1, }} >

        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }}>
          <Text style={{ fontSize: 16, color: "#222" }} >Posted by {item.username} </Text>
          <Text style={{ fontSize: 13, color: "#444" }}>{moment(item.createdAt).format('D [de] MMMM [às] HH:mm')}</Text>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between", padding: 20}} >
          <TouchableOpacity style={{alignItems: "center"}}>
            <MaterialCommunityIcons name="share-variant" size={30} />
            <Text>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems: "center"}} >
            <MaterialCommunityIcons name="sticker" size={30} />
            <Text>Send a Sticker</Text>
          </TouchableOpacity>
          
        </View>

      </View>
    </View>
  );
}




export default Home;