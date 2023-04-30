import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import AuthStack from './AuthStack'
import ScreenRoutesEnum from '../constants/ScreenRoutesEnum';
import { useAppContext } from '../provider/UserProvider'
import isEmpty from 'lodash/isEmpty'
import AppStack from './AppStack';

const Stack = createStackNavigator();


export function AppNavigator({ }) {

    const appContext = useAppContext()
    const state = appContext && appContext.state


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
                    {!isEmpty(state.auth) ? <Stack.Screen name={ScreenRoutesEnum.DASHBOARD} component={AppStack} /> : <Stack.Screen name={ScreenRoutesEnum.AUTH} component={AuthStack} />}
                </Stack.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigator