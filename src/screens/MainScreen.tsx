import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Bell as NotificationsIcon,
  Mail as MessagesIcon,
  User as ProfileIcon,
} from "lucide-react-native";

import { HomeScreen } from "./HomeScreen";
import { SearchScreen } from "./SearchScreen";
import { NotificationsScreen } from "./NotificationsScreen";
import { MessagesScreen } from "./MessagesScreen";
import { ProfileScreen } from "./ProfileScreen";

const Tab = createBottomTabNavigator();

function getIconForRoute(routeName: string) {
  switch (routeName) {
    case "Home": {
      return HomeIcon;
    }
    case "Search": {
      return SearchIcon;
    }
    case "Notifications": {
      return NotificationsIcon;
    }
    case "Messages": {
      return MessagesIcon;
    }
    default: {
      return ProfileIcon;
    }
  }
}

export function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const Icon = getIconForRoute(route.name);
          return <Icon size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
