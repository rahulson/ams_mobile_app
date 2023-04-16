import React, { useState } from "react";
import { View, StyleSheet } from 'react-native'
import { LogInForm } from '../../components/Form/LoginForm'
import { LoginFormPayload } from "../../api";
import { useNavigation } from '@react-navigation/native';
import ScreenRoutesEnum from "../../constants/ScreenRoutesEnum";

const LogIn = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const onSubmit = (payload: LoginFormPayload) => {
        try {
            
        } catch (error) {
            
        }

    }

    const onNavigateToSignUp = () => {
        navigation.navigate(ScreenRoutesEnum.SIGNUP)
    }

    return (
        <View style={styles.container}>
            <LogInForm onSubmit={onSubmit} loading={isLoading} onNavigateToSignUp={onNavigateToSignUp}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default LogIn