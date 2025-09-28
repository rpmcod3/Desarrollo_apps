import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Header from './src/components/Header';
import { colors } from './src/global/colors';

import { useEffect, useState   } from 'react';

import MainNavigator from "./src/navigation/MainNavigator";
import { Provider } from 'react-redux';
import { store } from './src/store';



export default function App() {
  const [categorySelected, setCategorySelected] = useState('')


 return (
  <Provider store ={store} > 
  
  <StatusBar style="light" />
  <MainNavigator/>
   
    </Provider>
  );
}

const styles = StyleSheet.create({

});

