import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import AuthStack from './AuthStack'
import ScreenRoutesEnum from '../constants/ScreenRoutesEnum';

const Stack = createStackNavigator();


export function AppNavigator({ }) {


    return (
        <NavigationContainer
            ref={navigationRef}>
            <Stack.Navigator
                
                screenOptions={({ navigation }) => {
                    return {
                        detachPreviousScreen: !navigation.isFocused(),
                        headerShown: false
                    };
                }}>
                     <Stack.Screen name={ScreenRoutesEnum.AUTH} component={AuthStack} />
                </Stack.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigator