import React, { useState } from "react";
import { View, StyleSheet } from 'react-native'
import { SignUpForm } from '../../components/Form/SignUpForm'
import { SignupFormPayload } from "../../api";
import { signup } from '../../api/Auth'
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const onSubmit = async(payload: SignupFormPayload) => {
        try {
            const data = payload
            delete data['confirmPassword']
            console.log('Payload', data)
            const response = await signup(data)
            console.log('Response', response)
           navigation.goBack()
        } catch (error) {
            console.log("Data Error", error)
        }

    }

    return (
        <View style={styles.container}>
            <SignUpForm onSubmit={onSubmit} loading={isLoading}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SignUp