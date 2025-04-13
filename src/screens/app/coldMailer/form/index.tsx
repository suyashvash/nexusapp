import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppTextInput from "../../../../components/input/textinput";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PrimaryButton from "../../../../components/buttons/primary";
import { Routes } from "../../../../utils/routes";
import { doc, getDoc, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import useUser from "../../../../redux/useStore";
import { User } from "../../../../redux/slices/userSlice";
import { Image } from "react-native";
import { Colors } from "../../../../utils/colors";
import LottieView from 'lottie-react-native';
import GeneratingModal from "../../../../components/generatingModal";
import { generateColdMail } from "../../../../configs/openai";

export default function ColdMailerForm({ navigation }: any) {

    const db = getFirestore()
    const user = useUser()

    useEffect(() => {
        getUserData()
    }, [])

    const [jobDescription, setJobDescription] = React.useState<string>('');
    const [receiverBio, setReceiverBio] = React.useState<string>('');
    const [profile, setProfile] = React.useState<any>(0);

    const [isLoading, setIsLoading] = React.useState(false)
    const [userData, setUserData] = React.useState<User | null>(null)

    const [isGenerating, setIsGenerating] = React.useState(false)

    const getUserData = async () => {

        const docRef = doc(db, "Users", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data() as User
            setUserData(data)
        }
        setIsLoading(false)

    }


    const onGenerate = async () => {

        if (jobDescription == '') {
            Alert.alert('Cold Mailer', 'Please enter job description')
            return
        }

        if (receiverBio == '') {
            Alert.alert('Cold Mailer', 'Please enter receiver bio')
            return
        }

        if (profile === null) {
            Alert.alert('Cold Mailer', 'Please select your profile')
            return
        }

        setIsGenerating(true)
        await generateColdMail(userData?.profiles[profile], jobDescription, receiverBio)
            .then((res: any) => {
                const parsedContent = JSON.parse(res);

                setIsGenerating(false)
 
                navigation.navigate(Routes.app.coldMailer.results, {
                    result: parsedContent,
                    jobDescription: jobDescription,
                })

            })

            .catch((error: any) => {
                console.error("Error generating email:", error);
                setIsGenerating(false)
                Alert.alert('Cold Mailer', 'Error generating email')
            })

    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'black' }}>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>

            <GeneratingModal
                isVisible={isGenerating}
            // onClose={() => setIsGenerating(false)}
            // title="Generating..."
            // description="Please wait while we generate your email."
            />

            <AppTextInput
                label="Enter Job Description"
                placeholder="React Native Developer..."
                type="paragraph"
                value={jobDescription}
                onChangeText={setJobDescription}
            />

            <AppTextInput
                label="About Receiver"
                placeholder="Software Engineer at Google"
                type="paragraph"
                value={receiverBio}
                onChangeText={setReceiverBio}
            />


            <Text
                style={{
                    fontSize: 14,
                    // position: 'absolute',
                    // top: -10,
                    color: 'black',
                    fontWeight: 'semibold',
                    // marginLeft: 10,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginBottom: 5,
                    marginTop: 20,
                }}>
                Select Your Profile
            </Text>
            <View style={{ width: '100%' }}>
                {
                    userData?.profiles.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={[styles.profileButton, { backgroundColor: profile === index ? Colors.accent : 'white' }]}
                                onPress={() => {
                                    setProfile(index)
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <FontAwesome5 name="user-circle" size={20} color="grey" /> */}
                                    <Image source={{ uri: user.profileImage }}
                                        style={{
                                            width: 40, height: 40, borderRadius: 20,
                                            borderWidth: 2, borderColor: profile === index ? 'white' : 'black'
                                        }} />
                                    <Text style={{
                                        marginLeft: 10, fontSize: 16,
                                        fontWeight: profile === index ? 'bold' : 'normal',
                                        color: profile === index ? 'white' : 'black'
                                    }}>{item.title}</Text>
                                </View>
                                {
                                    profile === index && <MaterialIcons name="check" size={20} color={'white'} />
                                }
                            </TouchableOpacity>
                        )
                    })
                }


            </View>

            {/* <Text
                style={{
                    fontSize: 14,
                    // position: 'absolute',
                    // top: -10,
                    color: 'black',
                    fontWeight: 'semibold',
                    // marginLeft: 10,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginBottom: 5,
                    marginTop: 20,
                }}>
                Select Tone
            </Text> */}

            {/* <View style={{
                width: '100%',


            }}>
                <TouchableOpacity style={styles.profileButton}>
                    <Text style={{ fontSize: 16, color: 'grey' }}>Funny / Humour</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.profileButton, { backgroundColor: 'whitesmoke' }]}>
                    <Text style={{ fontSize: 16, color: 'black' }}>Formal / Professional</Text>
                    <MaterialIcons name="check" size={20} color="black" />
                </TouchableOpacity>

            </View> */}

            <PrimaryButton
                title='Generate'
                style={{ marginTop: 30 }}
                onPress={onGenerate} />


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',

    },
    profileButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10,
        paddingVertical: 15,
        marginVertical: 5,
    }
})