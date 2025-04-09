import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Routes } from '../../../utils/routes';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../utils/colors';

const Card = ({ name, title, views, onClick }: any) => (
    <TouchableOpacity onPress={onClick}>
        <ImageBackground style={styles.cardContainer} src='https://t4.ftcdn.net/jpg/04/89/68/23/360_F_489682374_ckc0OVyT6Av0NGcuYbwBSCxy62blF4CQ.jpg'>
            <Image source={{ uri: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=batss' }} style={styles.cardImage} />
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
        </ImageBackground>
    </TouchableOpacity>
);

const DashboardScreen = ({ navigation }) => {
    const cards = [
        { id: '1', name: 'Suyash Vashishtha', title: 'Swift UI Developer' },
        { id: '2', name: 'John Doe', title: 'React Native Developer' },
        { id: '3', name: 'Jane Smith', title: 'Backend Developer' },
    ];

    return (

        <ScrollView style={{ backgroundColor: '#FFFFFF' }}
            contentContainerStyle={{ paddingBottom: 50, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={styles.container}>
                <Image
                    source={{ uri: `https://api.dicebear.com/9.x/fun-emoji/png?seed=suyassss` }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Suyash Vashishtha</Text>
                <Text style={styles.profileViews}>100 Views</Text>

                <Text style={styles.sectionTitle}>My Cards</Text>

            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ padding: 10, paddingTop: 0, width: '95%' }}
            >
                {
                    cards.map((card) => (
                        <Card
                            key={card.id}
                            name={card.name}
                            title={card.title}
                        // onClick={() => { navigation.navigate(Routes.app.cardDetails) }}
                        />
                    ))
                }


            </ScrollView>

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
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 8,
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
    cardContainer: {
        width: 300,
        height: 200,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 10,
        marginVertical: 10,
        overflow: 'hidden',
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 8,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 14,
        color: 'lightgray',
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

export default DashboardScreen;