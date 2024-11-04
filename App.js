import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageUploadScreen from './ImageUploadScreen';
import ImageDisplayScreen from './ImageDisplayScreen';
import PrintToPDFScreen from "./PrintToPDFScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Upload" component={ImageUploadScreen} />
            <Tab.Screen name="Display" component={ImageDisplayScreen} />
            <Tab.Screen name="Print" component={PrintToPDFScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
