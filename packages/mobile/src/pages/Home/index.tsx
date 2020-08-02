import React from 'react';
import { View, Text, FlatList, Image, StatusBar } from 'react-native';

const DATA = [
  { id: "00", image: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' },
  { id: "01", image: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' },
  { id: "02", image: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' },
  { id: "03", image: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' },
  { id: "04", image: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' },
  { id: "05", image: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' },
  { id: "06", image: 'https://timeline.canaltech.com.br/348109.1400/vai-pa-onde-criador-de-pocoyo-acha-meme-brazuca-inteligente-e-divertido.jpg' },
];

const Home: React.FC = () => {
  return (
    <View style={{ alignItems: "center" }} >

      <View style={{padding: 10, backgroundColor: '#004ba0', width: "100%", alignItems: "center"}}>
        <Text style={{
          marginTop: StatusBar.currentHeight,
          color: "#FFF",
          fontSize: 20, fontWeight: "bold"}}>Meme-generator App
        </Text>
      </View>

      <FlatList

        data={DATA}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={item => <Meme {...item}
          end={item.index === DATA.length - 1 ? true : undefined} />}
      />
    </View>
  );
}


const Meme = props => {
  const { item, end, navigate } = props;

  return (
    <View
      style={
        [
          end ? { marginBottom: 20 } : undefined,

          {

            flexDirection: "row", backgroundColor: "#bbb",
            marginTop: 7.5,
            marginHorizontal: 5,
            borderRadius: 5, overflow: "hidden"
          }]} >

      <Image source={{ uri: item.image }} style={{ height: 270, width: 270, }} />
    </View>
  );
}




export default Home;