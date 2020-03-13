/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AsyncStorage, Image} from 'react-native';
import {connect} from 'react-redux';

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

import {} from 'react-native';
import {manipulateQuantity, deleteFromCart} from '../redux/actions/Cart';
import Bg from '../../images/emptycart.png';
class Cart extends React.Component {
  logout = () => {
    AsyncStorage.removeItem('user-id');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('status');
    this.props.navigation.navigate('Login');
  };

  cekAuth = () => {
    if (!AsyncStorage.getItem('token')) {
      this.props.navigation.navigate('Login');
    }
  };
  onRefreshing = () => {
    this.getProducts();
  };
  componentDidMount() {
    this.cekAuth();
  }
  addQuantity = data => {
    if (data.quantity < data.stock) {
      data.quantity += 1;
      this.props.dispatch(manipulateQuantity(data));
    }
  };
  reduceQuantity = data => {
    if (data.quantity > 1) {
      data.quantity -= 1;
      this.props.dispatch(manipulateQuantity(data));
    }
  };
  deleteFromCart = id => {
    this.props.dispatch(deleteFromCart(id));
  };

  render() {
    const ViewCart = () => {
      if (this.props.productsInCart.length < 1) {
        return (
          <Content>
            <Image source={Bg} style={{flex: 1, width: 360}} />
          </Content>
        );
      } else {
        return (
          <Content>
            <FlatList
              data={this.props.productsInCart}
              onRefresh={this.onRefreshing}
              renderItem={({item}) => (
                <Card style={{marginBottom: -2, marginTop: -2}}>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{uri: item.image, width: 200, height: 200}}
                      />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>Rp. {item.price}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          name="trash"
                          style={{
                            color: 'grey',
                            marginRight: 20,
                            marginTop: 5,
                          }}
                          onPress={() => this.deleteFromCart(item.productId)}
                        />
                        <Button
                          small
                          rounded
                          info
                          onPress={() => this.reduceQuantity(item)}>
                          <Text>-</Text>
                        </Button>
                        <Button transparent small>
                          <Text
                            style={{
                              borderBottomColor: 'black',
                              paddingHorizontal: 10,
                            }}>
                            {item.quantity}
                          </Text>
                        </Button>
                        <Button
                          small
                          rounded
                          info
                          onPress={() => this.addQuantity(item)}>
                          <Text>+</Text>
                        </Button>
                      </View>
                    </Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item.productId.toString()}
            />
            <Button
              onPress={() =>
                this.props.navigation.navigate('Payment', {
                  products: this.props.productsInCart,
                })
              }
              info
              rounded
              style={{
                justifyContent: 'center',
                marginHorizontal: 18,
              }}>
              <Icon name="wallet" />
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Payment
              </Text>
            </Button>
          </Content>
        );
      }
    };
    return (
      <Container>
        <Grid>
          <Col>
            <ViewCart />
            <Footer>
              <FooterTab style={{backgroundColor: '#0275d8'}}>
                <Button
                  vertical
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <Icon name="home" />
                  <Text>Home</Text>
                </Button>
                <Button badge active vertical>
                  <Badge>
                    <Text>{this.props.productsInCart.length}</Text>
                  </Badge>
                  <Icon name="cart" />
                  <Text>Cart</Text>
                </Button>
                <Button
                  vertical
                  onPress={() => this.props.navigation.navigate('Dashboard')}>
                  <Icon name="people" />
                  <Text>Dash</Text>
                </Button>
                <Button vertical onPress={() => this.logout()}>
                  <Icon name="log-out" />
                  <Text>Logout</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Col>
        </Grid>
      </Container>
    );
  }
}

const mapCart = state => {
  return {
    productsInCart: state.cart.cart,
  };
};

export default connect(mapCart)(Cart);
