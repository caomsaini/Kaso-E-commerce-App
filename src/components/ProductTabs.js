  // src/components/ProductTabs.js
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailsScreen from "./DetailsScreen";
import SpecificationsScreen from "./SpecificationsScreen";
import ReviewsScreen from "./ReviewsScreen";
import FAQsScreen from "./FAQsScreen";

const Tab = createMaterialTopTabNavigator();

const ProductTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarIndicatorStyle: { backgroundColor: "#000" },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Specifications" component={SpecificationsScreen} />
      <Tab.Screen name="Reviews" component={ReviewsScreen} />
      <Tab.Screen name="FAQs" component={FAQsScreen} />
    </Tab.Navigator>
  );
};

export default ProductTabs;
