import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Home from './screens/Home';
import Settings from './screens/Settings';
import Search from './screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: (props) => getMenuIcon(props, 'settings'),
        }}
      />
      <Tab.Screen
        name="asd"
        component={Home}
        options={{
          tabBarIcon: (props) => getMenuIcon(props, 'block'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: (props) => getMenuIcon(props, 'search'),
        }}
      />
      <Tab.Screen
        name="Screen4"
        component={Home}
        options={{
          tabBarIcon: (props) => getMenuIcon(props, 'favorite-outline'),
        }}
      />
      <Tab.Screen
        name="Screen5"
        component={Home}
        options={{
          tabBarIcon: (props) => getMenuIcon(props, 'block'),
        }}
      />
    </Tab.Navigator>
  );
}

const getMenuIcon = (
  props: {
    focused: boolean;
    color: string;
    size: number;
  },
  name: MenuIcons
) => {
  return (
    <MaterialIcons
      color={props.color}
      size={props.focused ? props.size + 2 : props.size}
      name={name}
    />
  );
};

type MenuIcons = 'search' | 'settings' | 'favorite-outline' | 'block';

const tabOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: 'black',
  headerShown: false,
  tabBarIconStyle: { fontSize: 64 },
};
