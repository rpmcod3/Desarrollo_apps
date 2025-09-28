import {  StyleSheet,  Text,  View,  Image,  FlatList,  Pressable,} from "react-native";

import Flatcard from "../../components/Flatcard";
import { useSelector, useDispatch } from "react-redux";
import { setCategorySelected } from "../../store/slices/shopSlice";
import { useGetCategoriesQuery } from "../../service/shopApi";


const CategoriesScreen = ({navigation}) => {




const {data:categories, isLoading, error} = useGetCategoriesQuery()
console.log ("trayendo cat desde firebase",categories, isLoading, error)




const dispatch = useDispatch()

const handleSelectCategory = (category) => { 
  dispatch(setCategorySelected(category))
  navigation.navigate("Products")
}

  const renderCategoryItem = ({ item }) => {
    return (
      <Pressable onPress={() => handleSelectCategory(item.title)}>
        <Flatcard style={styles.cardCustom}>
          <Text> {item.title} </Text>
          <Image
            width={100}
            height={60}
            source={{ uri: item.image }}
            resizeMode="contain"
          />
        </Flatcard>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
