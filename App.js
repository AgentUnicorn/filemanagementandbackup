import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageUploadScreen from './screens/ImageUploadScreen';
import ImageDisplayScreen from './screens/ImageDisplayScreen';
import PrintToPDFScreen from "./screens/PrintToPDFScreen";
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen
                name="Upload"
                component={ImageUploadScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="cloud-upload" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Display"
                component={ImageDisplayScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="photo-library" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Print"
                component={PrintToPDFScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="picture-as-pdf" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
