import React, { useState } from "react";
import { View, StyleSheet } from 'react-native'
import { LogInForm } from '../../components/Form/LoginForm'
import { LoginFormPayload } from "../../api";
import { useNavigation } from '@react-navigation/native';
import ScreenRoutesEnum from "../../constants/ScreenRoutesEnum";
import { login } from '../../api/Auth'

const LogIn = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const onSubmit = async(payload: LoginFormPayload) => {
        try {
            const response = await login(payload)
            console.log("Data", response.data)
        } catch (error) {
            console.log("Data Error", error)
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