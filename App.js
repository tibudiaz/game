import React from 'react';
import GameScreen from './screens/GameScreen';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [loaded] = useFonts({
    Roboto1: require('./assets/fonts/RobotoMono-Italic-VariableFont_wght.ttf'),
    Roboto2: require('./assets/fonts/RobotoMono-VariableFont_wght.ttf'),
  });
  if (!loaded) return <AppLoading />;

  return (
    <GameScreen />   
  );
}
