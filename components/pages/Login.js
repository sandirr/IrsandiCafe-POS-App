/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Item,
  Input,
  Label,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';

import {Col, Row, Grid} from 'react-native-easy-grid';

import 'react-native-gesture-handler';
import Bg from '../../images/irsandicafe.png';
import axios from 'axios';
class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = () => {
    axios
      .post(`http://192.168.1.12:8181/user/login`, this.state)
      .then(res => {
        if (res.data.error === 'Wrong Email') {
          return alert('Wrong Email');
        }
        AsyncStorage.setItem('token', res.data.result.token);
        AsyncStorage.setItem('user-id', res.data.result.id);
        AsyncStorage.setItem('status', res.data.result.status);
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        alert('Wrong Password');
      });
  };
  static navigationOptions = {
    title: 'Login',
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <>
        <Image source={Bg} style={{flex: 2, width: 360}} />
        <Container style={{flex: 3}}>
          <Content style={{paddingHorizontal: 20}}>
            <Item>
              <Icon active name="mail" />
              <Input
                placeholder="Email"
                onChangeText={text => this.setState({email: text})}
              />
            </Item>
            <Item>
              <Icon active name="key" />
              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => this.setState({password: text})}
              />
            </Item>
            <Button
              rounded
              style={{
                justifyContent: 'center',
                backgroundColor: '#0275d8',
                marginTop: 18,
              }}
              onPress={this.onSubmit}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Login</Text>
            </Button>
          </Content>
        </Container>
      </>
    );
  }
}

export default Login;
