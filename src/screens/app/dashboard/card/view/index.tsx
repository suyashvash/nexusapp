import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Colors } from '../../../../../utils/colors';
import PrimaryButton from '../../../../../components/buttons/primary';
import Card from '../../../../../components/card';
import Entypo from 'react-native-vector-icons/Entypo';

const CardDetailScreen = () => {


    const [skills, setSkills] = useState(['React Native', 'Swift UI', 'Java', 'Python', 'Node JS']);
    const [projects, setProjects] = useState(['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card
                name={'Suyash Vashishtha'}
                title={'React Native Developer'}
                views={100}
                onClick={() => { }}
                style={{
                    width: Dimensions.get('window').width - 40,
                }}
            />
            <View style={styles.card}>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={styles.subtitle}>Main Title</Text>
                    <Text style={styles.mainTitle}>Swift UI Developer</Text>
                </View>

                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={styles.subtitle}>Bio</Text>
                    <Text style={styles.mainTitle}> Hi, I am Swift UI Dev with 3 years working with startups and busines to build scalable apps-hi, I am Swift UI Dev with 3 years working with startups and busines to build scalable apps.</Text>
                </View>

                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={styles.subtitle}>Skills</Text>

                    {
                        skills.length > 0 &&
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                width: '95%',
                                flexWrap: 'wrap',
                                marginVertical: 10,
                            }}>


                            {skills.map((skill, index) => (
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
                    projects.length > 0 &&
                    <View style={{ width: '100%', marginBottom: 20 }}>
                        <Text style={styles.subtitle}>Projects</Text>


                        <View
                            style={{
                                width: '100%',
                                marginVertical: 10,
                            }}>


                            {projects.map((skill, index) => (
                                <TouchableOpacity key={index} style={{
                                    flexDirection: 'row', alignItems: 'center',
                                    width: '100%',
                                    paddingVertical: 10,
                                    borderRadius: 50,
                                    marginRight: 10,
                                    marginBottom: 10,
                                    justifyContent: 'space-between',
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Entypo name='link' size={22} color={'gray'} />
                                        <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: 'semibold' }}>Project {index + 1}</Text>
                                    </View>
                                    <Entypo name='chevron-right' style={styles.chevron} />
                                </TouchableOpacity>
                            ))}
                        </View>


                    </View>
                }

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


                <PrimaryButton
                    title="Call Suyash"
                    variant='outline'
                    onPress={() => { }}
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