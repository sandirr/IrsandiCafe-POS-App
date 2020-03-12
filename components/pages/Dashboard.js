/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {AsyncStorage, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getProducts, deleteProduct} from '../redux/actions/Product';
import {
  Picker,
  Form,
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
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }
  logout = () => {
    AsyncStorage.removeItem('user-id');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('status');
    this.props.navigation.navigate('Login');
  };
  async getProducts() {
    const data = {user: 'cashier'};
    await this.props.dispatch(getProducts(data));
  }
  componentDidMount() {
    this.getProducts();
  }
  onRefreshing = () => {
    this.getProducts();
  };
  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }
  deleteProduct = async id => {
    await this.props.dispatch(deleteProduct(id));
  };
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={{
            backgroundColor: '#0275d8',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            marginRight: 20,
            borderRadius: 8,
          }}
          onPress={() => navigation.navigate('addProduct')}>
          <Text style={{color: '#fff'}}>Add</Text>
        </TouchableOpacity>
      ),
    };
  };

  render() {
    const ManageProducts = selected => {
      console.log(selected);
      if (selected.e === 1) {
        return (
          <Grid style={{flex: 9}}>
            <Col>
              <Content>
                <FlatList
                  data={this.props.products}
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
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <TouchableOpacity
                                style={{marginLeft: 10}}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'editProduct',
                                    {
                                      product: item,
                                    },
                                  )
                                }>
                                <Text style={{fontSize: 17, color: 'orange'}}>
                                  Edit
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{marginLeft: 10}}
                                onPress={() => this.deleteProduct(item.id)}>
                                <Text style={{fontSize: 17, color: 'red'}}>
                                  Delete
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </Body>
                        </Left>
                        <Right>
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
            </Col>
          </Grid>
        );
      }
    };
    return (
      <Container>
        <Content style={{flex: 1}}>
          <Form>
            <Picker
              note
              mode="dropdown"
              style={{width: 120}}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="Product Management" value={1} />
              <Picker.Item label="Category Management" value={2} />
              <Picker.Item label="User Management" value={3} />
            </Picker>
          </Form>
        </Content>
        <ManageProducts e={this.state.selected} />
        <Footer>
          <FooterTab style={{backgroundColor: '#0275d8'}}>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
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
              active
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
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    totalPurchase: state.cart.totalPurchase,
  };
};

export default connect(mapStateToProps)(Dashboard);
