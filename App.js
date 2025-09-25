import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import categories from './src/data/Categories.json'
import Header from './src/components/Header';
import Flatcard from './src/components/Flatcard';

export default function App() {
  const renderCategoryItem = ({item}) => (
  <Flatcard>
    <Text> {item.title} </Text> 
    <Image width={100} height={60} source={{uri: item.image}} resizeMode = 'contain'/>
  </Flatcard>
  )
  return (
    <View style={styles.container}>
      <Header title= "Cam e-commerce"/>
      <FlatList 
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={item=>item.id}
      />

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});

