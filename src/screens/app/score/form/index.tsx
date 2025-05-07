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
import { getProfileAnalysis } from "../../../../configs/openai";

export default function ScoreForm({ navigation }: any) {

    const db = getFirestore()
    const user = useUser()

    useEffect(() => {
        getUserData()
    }, [])

    const [jobDescription, setJobDescription] = React.useState<string>('');
    const [selectedProfile, setProfile] = React.useState<any>(0);

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
            Alert.alert('Profile Analysis', 'Please enter job description')
            return
        }

        if(jobDescription.length < 20) {
            Alert.alert('Profile Analysis', 'Job description should be at least 20 characters long')
            return
        }

        if (selectedProfile === null) {
            Alert.alert('Profile Analysis', 'Please select your profile')
            return
        }

        setIsGenerating(true)
        await getProfileAnalysis(userData?.profiles[selectedProfile], jobDescription)
            .then((res: any) => {
                console.log(res)
                const data = JSON.parse(res)
                console.log(data);

                navigation.navigate(Routes.app.analysis.results, { result: data })
                setIsGenerating(false)
            })
            .catch((err: any) => {
                console.log(err)
                setIsGenerating(false)
                Alert.alert('Profile Analysis', 'Some error occurred')
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
                            <TouchableOpacity key={index} style={[styles.profileButton, { backgroundColor: selectedProfile === index ? Colors.accent : 'white' }]}
                                onPress={() => {
                                    setProfile(index)
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <FontAwesome5 name="user-circle" size={20} color="grey" /> */}
                                    <Image source={{ uri: user?.profileImage || ''}}
                                        style={{
                                            width: 40, height: 40, borderRadius: 20,
                                            borderWidth: 2, borderColor: selectedProfile === index ? 'white' : 'black'
                                        }} />
                                    <Text style={{
                                        marginLeft: 10, fontSize: 16,
                                        fontWeight: selectedProfile === index ? 'bold' : 'normal',
                                        color: selectedProfile === index ? 'white' : 'black'
                                    }}>{item.title}</Text>
                                </View>
                                {
                                    selectedProfile === index && <MaterialIcons name="check" size={20} color={'white'} />
                                }
                            </TouchableOpacity>
                        )
                    })
                }


            </View>

            <PrimaryButton
                title='Analyze'
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