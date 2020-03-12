/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {getProducts} from '../redux/actions/Product';
import {postCart} from '../redux/actions/Cart';

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
class Homescreen extends React.Component {
  state = {
    activePage: 1,
    sort: 'ASC',
    by: 'id',
    serachName: '',
    activeCategory: '',
  };

  async getProducts() {
    const data = {user: 'cashier'};
    await this.props.dispatch(getProducts(data));
  }

  searchProducts = text => {
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: text,
      sort: this.state.sort,
      by: this.state.by,
      user: 'cashier',
    };
    this.props.dispatch(getProducts(data));
  };

  logout = () => {
    AsyncStorage.removeItem('user-id');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('status');
    this.props.navigation.navigate('Login');
  };
  onRefreshing = () => {
    this.getProducts();
  };
  componentDidMount() {
    // if (AsyncStorage.getItem('token')) {
    //   this.props.navigation.navigate('Login');
    // }
    if (this.props.products.length < 1) {
      this.getProducts();
    }
  }

  addToCart = e => {
    var a;
    this.props.productsInCart.map(product => {
      if (parseInt(product.productId) === parseInt(e.id)) {
        a = 0;
        return alert('Already in cart');
      }
      return product;
    });
    if (a !== 0) {
      const data = {
        name: e.name,
        image: e.image,
        productId: e.id,
        price: e.price,
        stock: e.stock,
        quantity: 1,
      };
      this.props.dispatch(postCart(data));
    }
  };
  render() {
    return (
      <Container>
        <Header
          style={{
            flexDirection: 'row',
            backgroundColor: '#0275d8',
            padding: 10,
          }}>
          <Item
            rounded
            style={{flex: 9, backgroundColor: 'white', marginTop: 10}}>
            <Icon name="search" style={{color: '#d9d9d9'}} />
            <Input
              placeholder="Search"
              onChangeText={text => this.searchProducts(text)}
            />
          </Item>
          <Icon
            onPress={() => this.props.navigation.navigate('Filter')}
            name="options"
            style={{
              flex: 1,
              marginTop: 13,
              marginLeft: 18,
              color: 'white',
            }}
          />
        </Header>
        <Grid>
          <Col>
            <Content>
              <FlatList
                data={this.props.products}
                onRefresh={this.onRefreshing}
                renderItem={({item}) => (
                  <Card
                    style={{
                      marginBottom: -1,
                      marginTop: -1,
                    }}>
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
                        <Text
                          onPress={() => this.addToCart(item)}
                          style={{color: 'grey', fontSize: 18, marginLeft: 30}}>
                          +
                          <Icon
                            name="cart"
                            style={{color: 'grey', fontSize: 20}}
                          />
                        </Text>
                        <Text style={{fontSize: 10, color: 'grey'}}>
                          Qty: {item.stock}
                        </Text>
                      </Right>
                    </CardItem>
                  </Card>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </Content>
            <Footer>
              <FooterTab style={{backgroundColor: '#0275d8'}}>
                <Button active vertical>
                  <Icon name="home" />
                  <Text>Home</Text>
                </Button>
                <Button
                  badge
                  vertical
                  onPress={() => this.props.navigation.navigate('Cart')}>
                  <Badge>
                    <Text>{this.props.totalPurchase}</Text>
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

const mapStateToProps = state => {
  return {
    products: state.products.products,
    totalPurchase: state.cart.totalPurchase,
    productsInCart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Homescreen);
