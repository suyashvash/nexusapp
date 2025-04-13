import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { Routes } from '../../../../utils/routes';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../../utils/colors';
import Card from '../../../../components/card';
import useUser from '../../../../redux/useStore';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { User } from '../../../../redux/slices/userSlice';
import EmptyCard from '../../../../components/card/emptyCard';
import { useIsFocused } from '@react-navigation/native';


const OverviewScreen = ({ navigation }) => {

    const user = useUser()
    const db = getFirestore()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getUserData()
        }
    }, [isFocused])

    const [isLoading, setIsLoading] = React.useState(true)
    const [userData, setUserData] = React.useState<User | null>(null)

    const getUserData = async () => {
        // setIsLoading(true)
        const docRef = doc(db, "Users", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data() as User
            setUserData(data)
            setIsLoading(false)
        }

    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={{ marginTop: 10, fontSize: 16 }}>Loading...</Text>
            </View>
        )
    }

    if (userData == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>No Data Found</Text>
            </View>
        )
    }

    return (

        <ScrollView style={{ backgroundColor: '#FFFFFF' }}
            contentContainerStyle={{ paddingBottom: 50, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={styles.container}>
                <Image
                    source={{ uri: user.profileImage }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{userData.name}</Text>
                <Text style={styles.profileViews}>100 Views</Text>

                <Text style={styles.sectionTitle}>My Cards</Text>

            </View>
            {
                userData.profiles.length > 0 ?
                    userData.profiles.length == 1 ?

                        <View style={{ width: '90%', paddingTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Card
                                title={userData.profiles[0].title}
                                onClick={() => { navigation.navigate(Routes.app.dashboard.card.detail, { id: userData.profiles[0].id }) }}
                            />
                        </View>
                        :
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ padding: 5, paddingTop: 0, width: '95%' }}
                        >
                            {
                                userData.profiles.map((card, index) => (
                                    <Card
                                        key={card.id || index}
                                        style={index == userData.profiles.length - 1 ? { marginRight: 30 } : {}}
                                        title={card.title}
                                        onClick={() => { navigation.navigate(Routes.app.dashboard.card.detail, { id: card.id }) }}
                                    />
                                ))
                            }


                        </ScrollView>
                    :
                    <View style={{ width: '90%', paddingTop: 0 }}>
                        <EmptyCard />
                    </View>
            }


            <View
                style={{
                    borderColor: 'lightgray',
                    borderWidth: 0.5,
                    width: '90%',
                    marginVertical: 15,
                }}
            />

            <Text style={styles.sectionTitle}>Analytics</Text>
            <View style={styles.analyticsContainer}>
                <View style={styles.analyticsBox}>

                    <AntDesign name="eyeo" size={22} color={Colors.accent} />
                    <Text style={styles.analyticsLabel}>Card Views</Text>
                    <Text style={styles.analyticsValue}>100</Text>



                </View>
                <View style={styles.analyticsBox}>
                    <MaterialIcons name="ads-click" size={22} color={Colors.accent} />
                    <Text style={styles.analyticsLabel}>Card Clicks</Text>
                    <Text style={styles.analyticsValue}>50</Text>

                </View>
                <View style={styles.analyticsBox}>
                    <MaterialIcons name="download" size={22} color={Colors.accent} />
                    <Text style={styles.analyticsLabel}>Resume Downloads</Text>
                    <Text style={styles.analyticsValue}>20</Text>

                </View>
                <View style={styles.analyticsBox}>
                    <AntDesign name="link" size={22} color={Colors.accent} />
                    <Text style={styles.analyticsLabel}>Projects Viewed</Text>
                    <Text style={styles.analyticsValue}>10</Text>

                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 40,
    },
    profileImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginBottom: 8,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'black'
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    profileViews: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    analyticsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '90%',
        marginTop: 20,
    },
    analyticsBox: {
        width: '47%',

        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderColor: '#F0F0F0',
        borderWidth: 1,
    },
    analyticsLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 2,
        marginTop: 10,
    },
    analyticsValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },
    analyticsIconContainer: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    analyticsChange: {
        fontSize: 12,
        color: '#22C55E',
        fontWeight: '600',
    },
});

export default OverviewScreen;