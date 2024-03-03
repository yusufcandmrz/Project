import React, { useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import CommunityList from "./pages/CommunityList";
import Software from "./pages/communities/Software";
import Hardware from "./pages/communities/Hardware";

const App = () => {

  const Stack = createNativeStackNavigator();

  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => { setUserSession(!!user) });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userSession ?
          (<>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>)
          :
          (<>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
            <Stack.Screen name="CommunityList" component={CommunityList} />
            <Stack.Screen name="Software" component={Software} />
            <Stack.Screen name="Hardware" component={Hardware} />
          </>)
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;