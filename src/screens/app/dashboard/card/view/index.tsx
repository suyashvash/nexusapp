import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Linking, Share, Alert } from 'react-native';
import { Colors } from '../../../../../utils/colors';
import PrimaryButton from '../../../../../components/buttons/primary';
import Card from '../../../../../components/card';
import Entypo from 'react-native-vector-icons/Entypo';
import { User } from '../../../../../redux/slices/userSlice';
import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import useUser from '../../../../../redux/useStore';

const CardDetailScreen = ({ navigation, route }) => {

    const id = route.params.id
    const db = getFirestore()
    const user = useUser()

    useEffect(() => {
        getUserData()
    }, [])

    const [isLoading, setIsLoading] = React.useState(true)
    const [userData, setUserData] = React.useState<User | null>(null)

    const getUserData = async () => {
        setIsLoading(true)
        const docRef = doc(db, "Users", user?.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data() as User
            setUserData(data)
            setIsLoading(false)
        }

    }

    const thisCard = userData?.profiles.find((card: any) => card.id === id)

    const onShareCard = () => {
        Share.share({
            message: `Check out my Nexus card to view my professional journey ! \n\n https://nexuscard.web.app?cardId=${thisCard?.id}`,
            title: `${user?.name || ''} - ${thisCard?.title}`,
            // url: `https://nexuscard.web.app?cardId=${thisCard?.id}`,
        })
            .then((result) => console.log(result))
            .catch((error) => console.log('Error sharing card:', error));

    }

    const onDeleteCard = async () => {
        Alert.alert(
            "Delete Card",
            "Are you sure you want to delete this card?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        setIsLoading(true)
                        const userRef = doc(db, "Users", user?.id);

                        const newProfiles = userData?.profiles.filter((card: any) => card.id !== id)

                        await updateDoc(userRef, {
                            profiles: newProfiles,
                        })
                            .then(() => {
                                console.log("Document successfully updated!");
                                Alert.alert('Card Deleted', 'Card deleted successfully!')
                                setIsLoading(false)
                                navigation.goBack()
                            })
                            .catch((error) => {
                                console.error("Error updating document: ", error);
                                setIsLoading(false)
                                Alert.alert('Error', 'Error deleting card!')
                            });
                    }
                }
            ]
        )
    }


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={{ marginTop: 10, fontSize: 16 }}>Loading...</Text>
            </View>
        )
    }


    if (thisCard == undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginTop: 10, fontSize: 16 }}>No Profile Found !</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card
                bgUrl={thisCard.theme}
                title={thisCard.title}
                views={100}
                onClick={() => { }}
                style={{
                    width: Dimensions.get('window').width - 40,
                }}
            />
            <View style={styles.card}>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={styles.subtitle}>Main Title</Text>
                    <Text style={styles.mainTitle}>{thisCard.title}</Text>
                </View>

                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={styles.subtitle}>Bio</Text>
                    <Text style={styles.mainTitle}>{thisCard.bio}</Text>
                </View>

                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={styles.subtitle}>Skills</Text>

                    {thisCard.skills.length > 0 &&
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                width: '95%',
                                flexWrap: 'wrap',
                                marginVertical: 10,
                            }}>


                            {thisCard.skills.map((skill, index) => (
                                <View key={index} style={{
                                    flexDirection: 'row', alignItems: 'center',
                                    padding: 15,
                                    paddingVertical: 5,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    marginBottom: 10,
                                    backgroundColor: Colors.primary,
                                }}>
                                    <Text style={{ color: 'white' }}>{skill}</Text>
                                </View>
                            ))}
                        </View>

                    }

                </View>
                {
                    thisCard.projects?.length > 0 &&
                    <View style={{ width: '100%', marginBottom: 20 }}>
                        <Text style={styles.subtitle}>Projects</Text>


                        <View
                            style={{
                                width: '100%',
                                marginVertical: 10,
                            }}>


                            {thisCard.projects.map((project, index) => (
                                <TouchableOpacity key={index} style={{
                                    flexDirection: 'row', alignItems: 'center',
                                    width: '100%',
                                    paddingVertical: 10,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    marginBottom: 10,
                                    justifyContent: 'space-between',
                                }}
                                    onPress={() => {

                                        Linking.openURL(project.link)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Entypo name='link' size={22} color={'gray'} />
                                        <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: 'semibold' }}>{project.name}</Text>
                                    </View>
                                    <Entypo name='chevron-right' style={styles.chevron} />
                                </TouchableOpacity>
                            ))}
                        </View>


                    </View>
                }

                {
                    thisCard.resume &&
                    <View style={{ width: '100%', marginBottom: 20 }}>
                        <Text style={styles.subtitle}>Documents</Text>
                        <View
                            style={{
                                width: '100%',
                            }}>
                            <TouchableOpacity style={{
                                flexDirection: 'row', alignItems: 'center',
                                width: '100%',
                                paddingVertical: 10,
                                borderRadius: 50,
                                marginRight: 10,
                                marginBottom: 10,
                                justifyContent: 'space-between',
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'semibold' }}>Download Resume</Text>
                                </View>
                                <Entypo name='download' style={styles.chevron} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }




                <PrimaryButton
                    title="Delete Card"
                    variant='outline'
                    onPress={onDeleteCard}
                    textStyle={{ color: 'red' }}
                    style={{ marginTop: 0, borderColor: 'red', marginBottom: 20 }}
                />


                <PrimaryButton
                    title="Share Card"
                    // variant='outline'
                    onPress={onShareCard}
                    style={{ marginTop: 0 }}
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {

        paddingVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '100%',
        maxWidth: 400,
    },
    profileImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: 'black',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 4,
    },
    mainTitle2: {
        fontSize: 16,
        marginTop: 16,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginTop: 40,
    },
    section: {
        marginTop: 12,
    },
    projectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    projectTitle: {
        fontSize: 16,
    },
    chevron: {
        fontSize: 20,
        color: '#666',
    },
    resumeButton: {
        backgroundColor: '#000',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
    },
    resumeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    callButton: {
        backgroundColor: '#000',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 12,
    },
    callButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CardDetailScreen;