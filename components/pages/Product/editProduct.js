/* eslint-disable curly */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Picker,
} from 'native-base';

import {patchProduct} from '../../redux/actions/Product';

class editProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: '',
      category: 0,
      price: '',
      stock: '',
      imageName: '',
    };
  }

  chooseImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response, imageName: response.fileName});
      }
    });
  };

  onValueChange = value => {
    this.setState({
      category: value,
    });
  };

  componentDidMount() {
    const product = this.props.navigation.getParam('product');
    if (product.category === 'Food') this.setState({category: 1});
    else if (product.category === 'Drink') this.setState({category: 2});
    this.setState({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      id: product.id,
    });
  }

  onSubmit = async id => {
    var formData = new FormData();
    if (this.state.image.uri) {
      const file = {
        name: this.state.image.fileName,
        uri: this.state.image.uri,
        type: this.state.image.type,
      };
      formData.append('image', file);
    }
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('category', this.state.category);
    formData.append('price', parseInt(this.state.price));
    formData.append('stock', parseInt(this.state.stock));
    await this.props.dispatch(patchProduct(formData, id));
    this.props.navigation.navigate('Dashboard');
  };

  render() {
    console.log(this.state);
    return (
      <Container>
        <Content>
          <Form style={{marginRight: 10}}>
            <Item>
              <Input
                placeholder="name books"
                onChangeText={text => this.setState({name: text})}
                value={this.state.name}
              />
            </Item>
            <Item>
              <Input
                placeholder="description"
                onChangeText={text => this.setState({description: text})}
                value={this.state.description}
              />
            </Item>
            <Item style={{flexDirection: 'row'}}>
              <Button onPress={() => this.chooseImage()}>
                <Text>Image</Text>
              </Button>
              <Text>{this.state.imageName}</Text>
            </Item>
            <Item>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Category"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                style={{width: undefined}}
                selectedValue={this.state.category}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item label="Food" value={1} />
                <Picker.Item label="Drink" value={2} />
              </Picker>
            </Item>
            <Item>
              <Input
                placeholder="price"
                onChangeText={text => this.setState({price: text})}
                value={`${this.state.price}`}
              />
            </Item>
            <Item>
              <Input
                placeholder="stock"
                onChangeText={text => this.setState({stock: text})}
                value={`${this.state.stock}`}
              />
            </Item>
          </Form>
          <Button
            primary
            style={{margin: 10}}
            onPress={() => this.onSubmit(this.state.id)}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect()(editProduct);
