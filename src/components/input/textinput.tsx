/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react';
import { View, TextInput, Text, TextInputProps, Platform } from 'react-native';
import { Colors } from '../../utils/colors';

interface AppTextInputProps {
    label: string;
    placeholder?: string;
    keyboardType?: TextInputProps['keyboardType'];
    onChangeText?: (text: string) => void;
    containerStyle?: any;
    props?: TextInputProps;
    value?: string;
    type?: 'phone' | 'email' | 'password' | 'text' | 'paragraph';
    leftIcon?: ReactNode | ReactNode[];
}

export default function AppTextInput(props: AppTextInputProps) {
    return (
        <View
            style={{
                width: '100%',
                // borderColor: 'lightgray',
                // borderWidth: 1,
                padding: 5,
                marginVertical: 5,
                paddingLeft: 0,
                // borderRadius: 8,
                marginBottom: 10,
                ...props.containerStyle,
            }}>
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
                }}>
                {props.label}
            </Text>

            {
                props.leftIcon ? (
                    <View
                        style={{
                            marginTop: 0, paddingLeft: 10,
                            backgroundColor: '#F5F5F5',
                            borderRadius: 5,
                            borderColor: '#F5F5F5',
                            borderWidth: 1,
                            height: props.type === 'paragraph' ? 100 : 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {props.leftIcon}
                        <TextInput
                            style={
                                {
                                    marginTop: 0, fontSize: 14, paddingLeft: 10,
                                    verticalAlign: props.type === 'paragraph' ? 'top' : 'center',
                                }}
                            secureTextEntry={props.type === 'password'}
                            placeholder={props.placeholder || 'Type here'}
                            placeholderTextColor={'gray'}
                            keyboardType={props.keyboardType || 'default'}
                            onChangeText={props.onChangeText}
                            value={props.value}
                            {...props.props}
                        />
                    </View>
                )
                    :
                    <TextInput
                        style={
                            {
                                marginTop: 0, fontSize: 14, paddingLeft: 10,
                                verticalAlign: props.type === 'paragraph' ? 'top' : 'center',
                                backgroundColor: '#F5F5F5',
                                borderRadius: 5,
                                borderColor: '#F5F5F5',
                                borderWidth: 1,
                                height: props.type === 'paragraph' ? 100 : 50,
                            }}
                        secureTextEntry={props.type === 'password'}
                        placeholder={props.placeholder || 'Type here'}
                        placeholderTextColor={'gray'}
                        keyboardType={props.keyboardType || 'default'}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        {...props.props}
                    />
            }


        </View>
    );
}