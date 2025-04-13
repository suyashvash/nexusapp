
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
import Logo from '../../../assets/logo.png'
import auth from '@react-native-firebase/auth';
import LoadingModal from 'react-native-loading-modal';
import { setDoc, doc, getFirestore } from '@react-native-firebase/firestore';


const SignupScreen = ({ navigation }: any) => {

    const db =  getFirestore()

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

        if( !email.includes('@')) {
            Alert.alert('Sign Up', 'Email is invalid');
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

        setIsLoading(true)
        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {

                let user = userCredential.user;
                console.log('User created:', user.uid);
                // Create user in firestore

                await setDoc(doc(db, 'Users', user.uid), {
                    name: name,
                    email: email,
                    password: password,
                    createdAt: new Date(),
                    profiles: [],
                    id: user.uid,
                })
                    .then(() => {
                        console.log('User added to firestore:', user.uid);
                        Alert.alert('Sign Up', 'User created successfully');
                        setIsLoading(false)
                        navigation.goBack()
                    })
                    .catch((error) => {
                        console.log('Error adding user to firestore:', error);
                        setIsLoading(false)
                        Alert.alert('Sign Up', 'Error creating user in firestore');
                    });

              


            })
            .catch((error) => {
                console.log(error.code);
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        Alert.alert('Sign Up', 'Email already in use');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Sign Up', 'Invalid email address');
                        break;
                    case 'auth/weak-password':
                        Alert.alert('Sign Up', 'Weak password');
                        break;
                    default:
                        Alert.alert('Sign Up', error.message);
                }
                setIsLoading(false)
            }
            )




    };

    return (
        <SafeAreaView style={styles.container}>
            <LoadingModal modalVisible={isLoading} color={Colors.primary} />
            <Pressable style={styles.formContainer} onPress={() => Keyboard.dismiss()}>
                <Image
                    source={Logo}
                    style={{ width: 250, height: 100 }}
                    resizeMode='contain'
                />
                <Text style={{ marginBottom: 40 }}>Signup & Start using the app !</Text>
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