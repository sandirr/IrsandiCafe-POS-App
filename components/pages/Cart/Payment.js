/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Icon,
  View,
  Item,
  Input,
} from 'native-base';

import {Col, Row, Grid} from 'react-native-easy-grid';

import {FlatList} from 'react-native-gesture-handler';
import {} from 'react-native';
import {checkout} from '../../redux/actions/Cart';
import {getProducts} from '../../redux/actions/Product';

class Payment extends React.Component {
  state = {
    tPrice: 0,
    userPay: 0,
    change: 0,
    isDisabled: true,
  };
  userPay = e => {
    this.setState({
      pay: e,
    });
    if (parseInt(e) >= this.state.tPrice) {
      this.setState({
        change: e - this.state.tPrice,
        isDisabled: false,
      });
    } else {
      this.setState({change: 0, isDisabled: true});
    }
  };
  checkout = () => {
    alert('success');
    const data = {
      products: this.props.productsInCart,
    };
    this.props.dispatch(checkout(data));
    this.props.navigation.navigate('Home');
  };
  componentDidMount() {
    const productsInCart = this.props.navigation.getParam('products');
    var total = 0;
    productsInCart.forEach(e => {
      total += e.price * e.quantity;
    });
    this.setState({
      tPrice: total,
    });
  }
  componentDidUpdate() {
    this.props.dispatch(getProducts({}));
  }
  render() {
    return (
      <Container>
        <Grid>
          <Col>
            <Content>
              <FlatList
                data={this.props.productsInCart}
                onRefresh={this.onRefreshing}
                renderItem={({item}) => (
                  <Card style={{marginBottom: -2, marginTop: -2}}>
                    <CardItem>
                      <Left>
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>Rp. {item.price}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.quantity}</Text>
                          <Text> x {item.price}</Text>
                        </View>
                      </Right>
                    </CardItem>
                  </Card>
                )}
                keyExtractor={item => item.productId.toString()}
              />
              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <Text>Total: Rp. {this.state.tPrice}</Text>
                <Item>
                  <Input
                    placeholder="User Payment"
                    onChangeText={text => this.userPay(text)}
                    value={this.state.userPay}
                  />
                </Item>
                <Text>Change: {this.state.change}</Text>
              </View>
              <Button
                onPress={() => this.checkout()}
                info
                rounded
                disabled={this.state.isDisabled}
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 18,
                  marginTop: 10,
                }}>
                <Icon name="checkbox" />
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  Checkout
                </Text>
              </Button>
            </Content>
          </Col>
        </Grid>
      </Container>
    );
  }
}
const mapCart = state => {
  return {
    productsInCart: state.cart.cart,
    totalPurchase: state.cart.totalPurchase,
  };
};
export default connect(mapCart)(Payment);
