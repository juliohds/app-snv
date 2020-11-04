import React from 'react';
import { View, TextInput } from 'react-native';

const MyTextInput = (props) => {
  return <TextInput ref={props.fowardRef} autoCorrect={false} {...props} />;
}


export default MyTextInput;