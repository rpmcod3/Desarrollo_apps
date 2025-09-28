import { FlatList, StyleSheet, Text, View, Image, Pressable } from "react-native";

import Flatcard from "../../components/Flatcard";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { setProductSelected } from "../../store/slices/shopSlice";

import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../../service/shopApi";

const ProductsScreen = ({ navigation, route }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [keyword, setKeyword] = useState("");

  
  const category = useSelector((state) => state.shopReducer.categorySelected);

  const {
    data: productsFilteredByCategory,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(category.toLowerCase());


  const dispatch = useDispatch();

  const handleSelectedProduct = (product) => {
    dispatch(setProductSelected(product));
    navigation.navigate("Product");
  };

  const renderProductsItem = ({ item }) => (
    <View>
      <Pressable onPress={() => handleSelectedProduct(item)}>
        <Text>{item.title}</Text>
      </Pressable>
    </View>
  );

  useEffect(() => {
    
    if (keyword) {
      const productsFilteredByKeyword = productsFilteredByCategory.filter(
        (product) => product.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setProductsFiltered(productsFilteredByKeyword);
    } else {
      setProductsFiltered(productsFilteredByCategory);
    }
  }, [category, keyword, productsFilteredByCategory]);

  return (
    <View>
      <Search setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        keyExtractor={(item) => item.id}
        renderItem={renderProductsItem}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({});
