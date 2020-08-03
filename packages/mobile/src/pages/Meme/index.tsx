import React from 'react';
import moment from 'moment';

import { SafeAreaView, View, Text, StatusBar, Image, Share } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import Share from 'react-native-share';

import { baseURL } from '../../services/api';

moment.updateLocale('pt-br', {
  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
});

const Meme: React.FC = props => {

  const { route } = props;

  const item = route?.params?.item;

  console.log('valor de item: ', item)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: baseURL + 'images/' + item.image,
        url:'app://mobile',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: StatusBar.currentHeight, flexDirection: "row", alignItems: "center" }} >
  
        <Image source={{ uri: baseURL + 'images/' + item.image }} style={{ height: 230, width: 230, }} />

        <View style={{ flex:1, alignItems: "center"}} >

          <View style={{ marginHorizontal: 20 }} >
            <Text style={{ fontSize: 16, color: "#222" }} >Posted by {item.username} </Text>
            <Text style={{ fontSize: 13, color: "#444" }}>{moment(item.createdAt).format('D [de] MMMM [às] HH:mm')}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }} >
            <TouchableOpacity 
            onPress={onShare}
            /*onPress={
              () => {
                Share.open({
                  title: 'Share image on your friends',
                  url: baseURL + 'images/' + item.image
                }).then(res => console.log(res))
              }
            }*/

            style={{ alignItems: "center", paddingRight:20 }}>
              <MaterialCommunityIcons name="share-variant" size={30} />
              <Text>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center" }} >
              <MaterialCommunityIcons name="sticker" size={30} />
              <Text>Send a Sticker</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>



    </SafeAreaView>
  );
}

export default Meme;