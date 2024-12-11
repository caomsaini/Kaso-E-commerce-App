import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ImageSliderSection from "./ImageSliderSection";
import ColorSelectorSection from "./ColorSelectorSection";

const Tab = createMaterialTopTabNavigator();

const ProductPage = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: "#000", height: 3 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#f9f9f9" },
        }}
      >
        <Tab.Screen name="Images" component={ImageSliderSection} />
        <Tab.Screen name="Colors" component={ColorSelectorSection} />
        {/* Add more sections here as per template */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ProductPage;
