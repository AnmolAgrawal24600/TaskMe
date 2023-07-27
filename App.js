import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/home';


export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <Home/>
    </GestureHandlerRootView>
  );
}

