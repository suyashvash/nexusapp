/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TextInput,Text, TextInputProps, Platform } from 'react-native';

interface AppTextInputProps {
    label: string;
    placeholder?: string;
    keyboardType?: TextInputProps['keyboardType'];
    onChangeText?: (text: string) => void;
    containerStyle?: any;
    props?: TextInputProps;
    value?: string;
    type?: 'phone' | 'email' | 'password' | 'text';
}

export default function AppTextInput(props: AppTextInputProps) {
    return (
        <View
            style={{
                width: '100%',
                borderColor: 'lightgray',
                borderWidth: 1,
                padding: 5,
                marginVertical: 5,
                paddingLeft: 0,
                borderRadius: 8,
                marginBottom: 20,
                ...props.containerStyle,
            }}>
            <Text
                style={{
                    color: 'gray',
                    fontSize: 14,
                    position: 'absolute',
                    top: -10,
                  
                    marginLeft: 10,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                }}>
                {props.label}
            </Text>
            <TextInput
                style={[
                    { marginTop: 0, fontSize: 16, paddingLeft: 10, },
                 { paddingVertical: 10 },
                ]}
                secureTextEntry={props.type === 'password'}
                placeholder={props.placeholder || 'Type here'}
                placeholderTextColor={'gray'}
                keyboardType={props.keyboardType || 'default'}
                onChangeText={props.onChangeText}
                value={props.value}
                {...props.props}
            />
        </View>
    );
}