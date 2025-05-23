import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../utils/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle
  variant?: 'filled' | 'outline';
  textStyle?: TextStyle
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress, style,textStyle, variant = 'filled' }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' && styles.outlineButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, variant === 'outline' && styles.outlineButtonText,textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  outlineButtonText: {
    color: 'black',
  },
});

export default PrimaryButton;