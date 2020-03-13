/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Icon,
  View,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {getProducts} from '../../redux/actions/Product';
class filterProduct extends React.Component {
  state = {
    activePage: 1,
    sort: 'ASC',
    by: 'id',
    serachName: '',
    activeCategory: '',
  };
  changeCategory = e => {
    console.log(e);
    this.setState({activeCategory: e});
    if (e === '') this.setState({activeCategory: ''});
    const data = {
      activePage: 1,
      activeCategory: e,
      serachName: '',
      sort: this.state.sort,
      by: this.state.by,
      user: 'cashier',
    };
    this.props.dispatch(getProducts(data));
  };
  changeSort = e => {
    this.setState({sort: e});
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: '',
      sort: e,
      by: this.state.by,
      user: 'cashier',
    };
    this.props.dispatch(getProducts(data));
  };
  changeBy = e => {
    this.setState({by: e});
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: '',
      sort: this.state.sort,
      by: e,
      user: 'cashier',
    };
    this.props.dispatch(getProducts(data));
  };
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
                  paddingTop: 10,
                  paddingBottom: 15,
                  paddingVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  borderStyle: 'solid',
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeCategory('')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    All
                  </Text>
                </Button>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeCategory('Food')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Food
                  </Text>
                </Button>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeCategory('Drink')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Drink
                  </Text>
                </Button>
              </View>
              <Text style={{marginLeft: 20, marginTop: 10}}>Sort</Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 10,
                  paddingBottom: 15,
                  paddingVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  borderStyle: 'solid',
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeSort('ASC')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Ascending
                  </Text>
                </Button>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeSort('DESC')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Descending
                  </Text>
                </Button>
              </View>
              <Text style={{marginLeft: 20, marginTop: 10}}>By</Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 10,
                  paddingBottom: 15,
                  paddingVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  borderStyle: 'solid',
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeBy('name')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Name
                  </Text>
                </Button>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeBy('price')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Price
                  </Text>
                </Button>
                <Button
                  rounded
                  bordered
                  small
                  info
                  style={{margin: 5}}
                  onPress={() => this.changeBy('date_added')}>
                  <Text style={{color: 'black', textTransform: 'capitalize'}}>
                    Date Added
                  </Text>
                </Button>
              </View>
              <Button
                onPress={() => this.props.navigation.navigate('Home')}
                rounded
                style={{
                  backgroundColor: '#0275d8',
                  marginHorizontal: 20,
                  marginTop: 50,
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>Show Products</Text>
              </Button>
            </Content>
          </Col>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
  };
};

export default connect(mapStateToProps)(filterProduct);
