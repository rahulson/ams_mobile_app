import React, { useState } from "react";
import { View, StyleSheet } from 'react-native'
import { SignUpForm } from '../../components/Form/SignUpForm'
import { LoginFormPayload } from "../../api";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (payload: LoginFormPayload) => {
        try {
            
        } catch (error) {
            
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