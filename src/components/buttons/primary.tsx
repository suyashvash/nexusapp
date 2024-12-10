import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../utils/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'filled' | 'outline';
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress, style, variant = 'filled' }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' && styles.outlineButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, variant === 'outline' && styles.outlineButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
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