import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import AppTextInput from '../../../../../components/input/textinput';
import PrimaryButton from '../../../../../components/buttons/primary';
import Card from '../../../../../components/card';
import { Colors } from '../../../../../utils/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { pick, types } from '@react-native-documents/picker'
import { doc, getDoc, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import useUser from '../../../../../redux/useStore';
import { User } from '../../../../../redux/slices/userSlice';
import LoadingModal from 'react-native-loading-modal';

const CreateCardScreen = ({ navigation }) => {

    const db = getFirestore()
    const user = useUser()

    useEffect(() => {
        getUserData()
    }, [])


    const [mainTitle, setMainTitle] = useState('');
    const [bio, setBio] = useState('');
    const [mainSkill, setMainSkill] = useState('');
    const [skills, setSkills] = useState('');
    const [projectLinks, setProjectLinks] = useState<string[]>([]);
    const [resume, setResume] = useState<DocumentPickerResponse | null>(null);
    const [portfolio, setPortfolio] = useState<string>('');


    const [isLoading, setIsLoading] = React.useState(false)
    const [userData, setUserData] = React.useState<User | null>(null)

    const getUserData = async () => {

        const docRef = doc(db, "Users", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data() as User
            setUserData(data)

        }

    }

    const handleSelectResume = async () => {
        pick({
            allowMultiSelection: false,
            type: [types.pdf],
        })
            .then((res) => {
                const allFilesArePdfOrDocx = res.every((file) => file.hasRequestedType)
                if (!allFilesArePdfOrDocx) {
                    Alert.alert('Please select only PDF or DOCX files')
                    return;
                }
                const file = res[0];
                console.log('Selected file:', file);

                setResume(file);
            })
            .catch((error => {
                console.log('Error selecting file:', error);
                // Alert.alert('Error selecting file:', error.message || 'Unknown error occurred');
            }));
    }


    const handleSubmit = async () => {
        if (mainTitle == '') {
            Alert.alert('Create Card', 'Please enter a title for your card');
            return;
        }

        if (bio == '') {
            Alert.alert('Create Card', 'Please enter a subtitle for your card');
            return;
        }

        if (mainSkill == '') {
            Alert.alert('Create Card', 'Please enter a main skill for your card');
            return;
        }

        if (skills == '') {
            Alert.alert('Create Card', 'Please enter skills for your card');
            return;
        }

        // if(projectLinks.length==0){
        //     Alert.alert('Create Card','Please enter project links for your card');
        //     return;
        // }

        // if(resume==null){
        //     Alert.alert('Create Card','Please upload a resume for your card');
        //     return;
        // }

        setIsLoading(true)

        let card = {
            title: mainTitle,
            bio: bio,
            mainSkill: mainSkill,
            skills: skills.split(','),
            projectLinks: projectLinks,
            resume: resume,
            id: new Date().getTime().toString(),
            portfolio: portfolio,
        }


        let profiles = userData?.profiles

        if (userData?.profiles) {
            profiles = userData.profiles
        }

        profiles?.push(card)

        const washingtonRef = doc(db, "Users", user.id);
        await updateDoc(washingtonRef, {
            profiles: profiles,
        })
            .then(() => {
                console.log('Document successfully written!');
                setIsLoading(false)
                Alert.alert('Create Card', 'Card created successfully!');
                navigation.goBack()
            })
            .catch((error) => {
                setIsLoading(false)
                console.error('Error writing document: ', error);
                Alert.alert('Create Card', 'Error creating card: ' + error.message);
            })


    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <LoadingModal modalVisible={isLoading} color={Colors.primary} />
            <Card
                name={userData?.name || user.name}
                title={mainTitle === '' ? 'Your Title will come here..' : mainTitle}
                views={100}
                onClick={() => { }}
                style={{
                    width: Dimensions.get('window').width - 40,
                    marginBottom: 30
                }}
            />

            <AppTextInput
                label='Card Title'
                placeholder="Ex- React Native Developer"
                value={mainTitle}
                onChangeText={setMainTitle}
            />
            <AppTextInput
                label='Bio'
                placeholder="Ex- I am a React Native Developer"
                value={bio}
                type='paragraph'
                onChangeText={setBio}
            />

            <AppTextInput
                label='Portfolio Link'
                placeholder="Ex- https://example.com"
                value={portfolio}
                onChangeText={setPortfolio}
            />


            <AppTextInput
                label='Main Skill'
                placeholder="Ex- React Native"
                value={mainSkill}
                onChangeText={setMainSkill}
            />

            <AppTextInput
                label='Skills'
                placeholder="Ex- React Native, NodeJS"
                value={skills}
                onChangeText={setSkills}
            />

            {
                skills !== '' && skills.split(',').length > 0 &&
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '95%',
                        flexWrap: 'wrap',
                        marginBottom: 10,
                    }}>


                    {skills.split(',').map((skill, index) => (
                        <View key={index} style={{
                            flexDirection: 'row', alignItems: 'center',
                            padding: 15,
                            paddingVertical: 5,
                            borderRadius: 50,
                            marginRight: 10,
                            marginBottom: 10,
                            backgroundColor: Colors.primary,
                        }}>
                            <Text style={{ marginRight: 10, color: 'white' }}>{skill}</Text>
                            <TouchableOpacity onPress={() => {
                                const newSkills = [...skills.split(',')];
                                newSkills.splice(index, 1);
                                setSkills(newSkills.join(','));
                            }}>
                                <Entypo name="cross" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            }
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
                    marginBottom: 10,
                    marginTop: 10,
                }}>
                Add Project Links
            </Text>

            <View
                style={{
                    marginTop: 0, paddingLeft: 10,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 5,
                    borderColor: '#F5F5F5',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                    paddingVertical: 5,
                }}
            >
                <Entypo name="link" size={20} color="black" style={{ marginRight: 10 }} />
                <TextInput
                    style={
                        {
                            marginTop: 0, fontSize: 14, paddingLeft: 10,
                        }}
                    placeholder={'https://example.com'}
                    placeholderTextColor={'gray'}
                    keyboardType={'default'}
                    value={projectLinks[0]}
                    onChangeText={(text) => {
                        const newLinks = [...projectLinks];
                        newLinks[0] = text;
                        setProjectLinks(newLinks);
                    }}
                />
            </View>

            <View
                style={{
                    marginTop: 0, paddingLeft: 10,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 5,
                    borderColor: '#F5F5F5',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                    paddingVertical: 5,
                }}
            >
                <Entypo name="link" size={20} color="black" style={{ marginRight: 10 }} />
                <TextInput
                    style={
                        {
                            marginTop: 0, fontSize: 14, paddingLeft: 10,
                        }}
                    placeholder={'https://example.com'}
                    placeholderTextColor={'gray'}
                    keyboardType={'default'}
                    value={projectLinks[1]}
                    onChangeText={(text) => {
                        const newLinks = [...projectLinks];
                        newLinks[1] = text;
                        setProjectLinks(newLinks);
                    }}
                />
            </View>

            <View
                style={{
                    marginTop: 0, paddingLeft: 10,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 5,
                    borderColor: '#F5F5F5',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                    paddingVertical: 5,
                }}
            >
                <Entypo name="link" size={20} color="black" style={{ marginRight: 10 }} />
                <TextInput
                    style={
                        {
                            marginTop: 0, fontSize: 14, paddingLeft: 10,
                        }}
                    placeholder={'https://example.com'}
                    placeholderTextColor={'gray'}
                    keyboardType={'default'}
                    value={projectLinks[2]}
                    onChangeText={(text) => {
                        const newLinks = [...projectLinks];
                        newLinks[2] = text;
                        setProjectLinks(newLinks);
                    }}
                />
            </View>

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
                    marginBottom: 10,
                    marginTop: 10,
                }}>
                Upload Resume
            </Text>


            <TouchableOpacity
                onPress={handleSelectResume}
                style={{
                    marginTop: 0, paddingLeft: 10,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 5,
                    borderColor: '#F5F5F5',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                    paddingVertical: 10,
                    marginBottom: 30,

                }}>
                <Entypo name="attachment" size={18} color="black" style={{ marginRight: 10 }} />
                {
                    resume ? (
                        <Text style={{ color: 'black' }}>{resume.name}</Text>
                    ) : (
                        <Text>Select File</Text>
                    )
                }

            </TouchableOpacity>



            <PrimaryButton title='Submit' onPress={handleSubmit} />




        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        paddingBottom: 50
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 16,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
    },
});


export default CreateCardScreen;