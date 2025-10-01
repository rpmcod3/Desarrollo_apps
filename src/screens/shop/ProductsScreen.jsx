import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from "react-native";

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
  const allProducts = useSelector((state) => state.shopReducer.products);

  console.log("ProductsScreen Debug Info:");
  console.log("Selected Category:", category);
  console.log("All Products from Redux:", allProducts?.length || 0, "items");
  console.log("API Query Category:", category?.toLowerCase() || "electronics");

  const {
    data: productsFilteredByCategory,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(category?.toLowerCase() || "electronics");

  console.log("API Response:");
  console.log("  - isLoading:", isLoading);
  console.log("  - error:", error);
  console.log("  - data length:", productsFilteredByCategory?.length || 0);

  const dispatch = useDispatch();

  const handleSelectedProduct = (product) => {
    dispatch(setProductSelected(product));
    navigation.navigate("Product");
  };

  const renderProductsItem = ({ item }) => (
    <Flatcard style={styles.productCard}>
      <Pressable onPress={() => handleSelectedProduct(item)}>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </Pressable>
    </Flatcard>
  );

  useEffect(() => {
    console.log("useEffect triggered with:");
    console.log("  - category:", category);
    console.log("  - keyword:", keyword);
    console.log("  - productsFilteredByCategory:", productsFilteredByCategory?.length || 0);
    console.log("  - allProducts:", allProducts?.length || 0);

   
    const productsToUse = productsFilteredByCategory || allProducts;
    console.log("Products to use:", productsToUse?.length || 0, "items");
    
    if (productsToUse && productsToUse.length > 0) {
      if (keyword) {
        console.log("🔍 Filtering by keyword:", keyword);
        const productsFilteredByKeyword = productsToUse.filter(
          (product) => product.title.toLowerCase().includes(keyword.toLowerCase())
        );
        console.log("Filtered products:", productsFilteredByKeyword.length);
        setProductsFiltered(productsFilteredByKeyword);
      } else {
        console.log("Setting all products");
        setProductsFiltered(productsToUse);
      }
    } else {
      console.log("No products available to display");
      setProductsFiltered([]);
    }
  }, [category, keyword, productsFilteredByCategory, allProducts]);

  if (isLoading) {
    console.log(" Showing loading state");
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#72bcd4" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    console.log("API Error details:", error);
    console.log(" Falling back to local data...");
  
    if (allProducts && allProducts.length > 0) {
      console.log("Using local data as fallback");
    } else {
      return (
        <View style={styles.errorContainer}>
          <Text>Error al cargar los productos</Text>
          <Text style={{marginTop: 10, fontSize: 12}}>Error: {error?.message || 'Unknown error'}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Search setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        keyExtractor={(item) => item.id}
        renderItem={renderProductsItem}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 4,
    maxWidth: '48%',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#72bcd4',
    fontWeight: 'bold',
  },
});
