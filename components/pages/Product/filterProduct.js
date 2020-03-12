/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {getProducts} from '../../redux/reducers/Product';

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
  Text,
  Card,
  CardItem,
  Thumbnail,
  Badge,
  Icon,
  View,
  Item,
  Input,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {FlatList} from 'react-native-gesture-handler';
class filterProduct extends React.Component {
  render() {
    return (
      <Container>
        <Grid>
          <Col>
            <Content>
              <Text style={{marginLeft: 20, marginTop: 10}}>Category</Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  justifyContent: 'center',
                }}>
                <Button rounded small info style={{marginRight: 5}}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Food
                  </Text>
                </Button>
                <Button rounded bordered small info style={{marginLeft: 5}}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Drink
                  </Text>
                </Button>
              </View>
            </Content>
          </Col>
        </Grid>
      </Container>
    );
  }
}

export default connect()(filterProduct);
