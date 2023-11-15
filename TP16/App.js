import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateScreen from './screens/CreateScreen';
import ReadScreen from './screens/ReadScreen';
import UpdateScreen from './screens/UpdateScreen';
import DeleteScreen from './screens/DeleteScreen';
import { Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ marginVertical: 5 }}>
      <Button title="Create" onPress={() => navigation.navigate('Create')} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Read" onPress={() => navigation.navigate('Read')} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Update" onPress={() => navigation.navigate('Update')} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Delete" onPress={() => navigation.navigate('Delete')} />
    </View>
  );
};

const ip = '192.168.100.10';

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus" color={color} size={size} />
            ),
          }}
        >
          {(props) => <CreateScreen {...props} ip={ip} />}
        </Tab.Screen>
        <Tab.Screen
          name="Read"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="list" color={color} size={size} />
            ),
          }}
        >
          {(props) => <ReadScreen {...props} ip={ip} />}
        </Tab.Screen>
        <Tab.Screen
          name="Update"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="pencil" color={color} size={size} />
            ),
          }}
        >
          {(props) => <UpdateScreen {...props} ip={ip} />}
        </Tab.Screen>
        <Tab.Screen
          name="Delete"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="trash" color={color} size={size} />
            ),
          }}
        >
          {(props) => <DeleteScreen {...props} ip={ip} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;