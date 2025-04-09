
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
    Keyboard,
} from 'react-native';
import AppTextInput from '../../../components/input/textinput';
import PrimaryButton from '../../../components/buttons/primary';
import { Colors } from '../../../utils/colors';
import { Routes } from '../../../utils/routes';
import { useAxios } from '../../../hooks/api/useAxios';
import { ApiCollection } from '../../../configs/envConfig';
import Logo from '../../../assets/logo.png'

interface SignupForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupScreen = ({ navigation }: any) => {

    const axios = useAxios()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (name.trim() == '') {
            Alert.alert('Sign Up', 'Name is required');
            return;
        }

        if (email.trim() == '') {
            Alert.alert('Sign Up', 'Email is required');
            return;
        }

        if (password.trim() == '') {
            Alert.alert('Sign Up', 'Password is required');
            return;
        }

        if (confirmPassword.trim() == '') {
            Alert.alert('Sign Up', 'Confirm Password is required');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Sign Up', 'Password and Confirm Password should be same');
            return;
        }

        await axios.post(ApiCollection.auth.register, { name, email, password })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
                Alert.alert('Sign Up', 'Something went wrong')
            })



    
    };

    return (
        <SafeAreaView style={styles.container}>
          
            <Pressable style={styles.formContainer} onPress={() => Keyboard.dismiss()}>
                      <Image
                                    source={Logo}
                                    style={{ width: 250, height: 100 }}
                                    resizeMode='contain'
                                />
                                <Text style={{marginBottom:40}}>Signup & Start using the app !</Text>
                <AppTextInput
                    label="Full Name"
                    placeholder='John Doe'
                    onChangeText={(text) => setName(text)}
                    value={name}
                    type="text"
                />

                <AppTextInput
                    label="Email"
                    placeholder='john@example.com'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    type="email"
                />

                <AppTextInput
                    label="Password"
                    placeholder='*******'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    type="password"
                />

                <AppTextInput
                    label="Confirm Password"
                    placeholder='*******'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    type="password"
                />

                <PrimaryButton
                    title="Create Account"
                    onPress={handleSubmit}
                    style={styles.signupButton}
                />

                <View style={styles.linksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate(Routes.auth.login)}>
                        <Text style={[styles.link, { color: 'gray' }]}>
                            Already have an account? <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    signupButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        marginTop: 20,
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    link: {
        color: Colors.primary,
        fontSize: 14,
    },
});

export default SignupScreen;