
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
import { Routes } from '../../../utils/routes';
import { Colors } from '../../../utils/colors';
import { useAxios } from '../../../hooks/api/useAxios';
import Logo from '../../../assets/logo.png'


interface LoginForm {
    email: string;
    password: string;
}

const LoginScreen = ({ navigation }: any) => {

    const axios = useAxios()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        // if (email.trim() == '') {
        //     Alert.alert('Email is required');
        //     return;
        // }

        // if (password.trim() == '') {
        //     Alert.alert('Password is required');
        //     return;
        // }

        // await axios.post(ApiCollection.auth.login, { email, password })
        //     .then((res) => {
        //         console.log(res.data)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         Alert.alert('Invalid Credentials')
        //     })

        navigation.replace(Routes.app.tag);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <LoadingModal modalVisible={isLoading} color={Colors.primary} /> */}
            <Pressable style={styles.formContainer} onPress={() => Keyboard.dismiss()}>

                <Image
                    source={Logo}
                    style={{ width: 250, height: 100 }}
                    resizeMode='contain'
                />
                <Text style={{marginBottom:40,color:Colors.accent,fontWeight:'bold'}}>Making Job Hunt Efficient !</Text>
                    

                <AppTextInput
                    label="Email"
                    placeholder='johm@example.com'
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

                <TouchableOpacity onPress={() => navigation.navigate(Routes.auth.forgotPassword)}>
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>


                <PrimaryButton
                    title="Login"
                    onPress={handleSubmit}
                    style={styles.loginButton}
                />

                <View style={styles.linksContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate(Routes.auth.register)}>
                        <Text style={[styles.link, { color: 'gray' }]}>
                            Don't have an account ? <Text style={{ color: Colors.accent, fontWeight: 'bold' }}>Sign Up</Text>
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
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    link: {
        color: Colors.accent,
        fontSize: 14,
    },
});

export default LoginScreen;