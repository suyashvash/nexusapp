import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AppTextInput from '../../../components/input/textinput';
import PrimaryButton from '../../../components/buttons/primary';

const CreateCardScreen = () => {
    const [mainTitle, setMainTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [mainTitle2, setMainTitle2] = useState('');
    const [skills, setSkills] = useState('');
    const [projectLinks, setProjectLinks] = useState([]);
    const [bugLinks, setBugLinks] = useState([]);
    const [resume, setResume] = useState('');

    const handleAddProjectLink = () => {
        setProjectLinks([...projectLinks, '']);
    };

    const handleAddBugLink = () => {
        setBugLinks([...bugLinks, '']);
    };

    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <View style={styles.container}>
            <AppTextInput
                label='Main Title'
                placeholder="Ex- React Native Developer"
                value={mainTitle}
                onChangeText={setMainTitle}
            />
            <AppTextInput
                label='Bio'
                placeholder="Ex- I am a React Native Developer"
                value={subtitle}
                onChangeText={setSubtitle}
            />
            <AppTextInput
                label='Main Skill'
                placeholder="Ex- React Native"
                value={mainTitle2}
                onChangeText={setMainTitle2}
            />

            <AppTextInput
                label='Skills'
                placeholder="Ex- React Native, NodeJS"
                value={skills}
                onChangeText={setSkills}
            />

            <AppTextInput
                label='Project Link 1'
                placeholder=""
                value={projectLinks[0]}
                onChangeText={(text) => {
                    setProjectLinks([text]);
                }}
            />

            <AppTextInput
                label='Project Link 2'
                placeholder=""
                value={projectLinks[1]}
                onChangeText={(text) => {
                    setProjectLinks([text]);
                }}
            />

            <AppTextInput
                label='Project Link 3'
                placeholder=""
                value={projectLinks[2]}
                onChangeText={(text) => {
                    setProjectLinks([text]);
                }}
            />

            <PrimaryButton title='Submit' onPress={handleAddProjectLink} />




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingVertical: 40,
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