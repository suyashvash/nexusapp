import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../../utils/colors';
import PrimaryButton from '../../../components/buttons/primary';

const CardDetailScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                {/* <Image
                    source={{
                        uri: 'https://via.placeholder.com/150',
                    }}
                    style={styles.profileImage}
                /> */}
                <Text style={styles.mainTitle}>Suyash Vashishtha</Text>
                <Text style={styles.subtitle}>Swift UI Developer</Text>
                <Text style={styles.mainTitle2}>
                    Hi, I am Swift UI Dev with 3 years working with startups and busines to build scalable apps-hi, I am Swift UI Dev with 3 years working with startups and busines to build scalable apps.
                </Text>
                <Text style={styles.sectionTitle}>Skills / Tech</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.projectItem}>
                        <Text style={styles.projectTitle}>Kitchen Cart iOS</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.projectItem}>
                        <Text style={styles.projectTitle}>Kitchen Cart iOS</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.projectItem}>
                        <Text style={styles.projectTitle}>Kitchen Cart iOS</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Projects</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.projectItem}>
                        <Text style={styles.projectTitle}>Some Blog</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.projectItem}>
                        <Text style={styles.projectTitle}>Some Blog 2</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.projectItem}>
                        <Text style={styles.projectTitle}>Something else</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>
                <PrimaryButton
                    title="Call Suyash"
                    variant='outline'
                    onPress={() => { }}
                    style={{marginTop: 50}}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    mainTitle2: {
        fontSize: 16,
        marginTop: 16,
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