import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from './src/components/SplashScreen';
import HomeScreen from './src/components/HomeScreen';
import CartScreen from './src/components/CartScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import { CartProvider } from './src/components/CartContext'; // Import CartProvider
import ModelName from './src/screens/ModelName';
import HelpScreen from './src/components/HelpScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// Drawer Navigator with HomeScreen and other drawer items
const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Cart" component={CartScreen} />
  </Drawer.Navigator>
);

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ title: 'Product Details' }}/>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ModelName" component={ModelName} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisible(false), 3000); // Adjust splash duration
    return () => clearTimeout(timer);
  }, []);

   // return (
      //<//GestureHandlerRootView style={{ flex: 1 }}>
       // <//Kaso />
      //<//GestureHandlerRootView>
    //);

  return (
    // Wrap everything in the CartProvider
    <CartProvider>
      <NavigationContainer>
        {isSplashVisible ? (
          <SplashScreen onFinish={() => setSplashVisible(false)} />
        ) : (
          <Navigation/>
        )}
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
