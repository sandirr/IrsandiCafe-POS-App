import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Picker,
  Icon,
} from 'native-base';

import {postProduct} from '../../redux/actions/Product';

class addProduct extends Component {
  state = {
    name: '',
    description: '',
    category: 0,
    price: '',
    stock: '',
  };

  onValueChange = value => {
    this.setState({
      category: value,
    });
  };

  onSubmit = async id => {
    await this.props.dispatch(postProduct(this.state));
    this.props.navigation.navigate('Dashboard');
  };

  choosePicture = () => {
    var options = {
      title: 'Choose Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.fileName);
        // this.setState({
        //   srcImg: {uri: response.uri},
        //   uri: response.uri,
        //   fileName: response.fileName,
        // });
      }
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <Form style={{marginRight: 10}}>
            <Item>
              <Input
                placeholder="Name"
                onChangeText={text => this.setState({name: text})}
                value={this.state.name}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                onChangeText={text => this.setState({description: text})}
                value={this.state.description}
              />
            </Item>
            <Item>
              <Button onPress={this.choosePicture}>
                <Text>Image</Text>
              </Button>
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
                <Picker.Item label="Choose Category" value={0} />
                <Picker.Item label="Food" value={1} />
                <Picker.Item label="Drink" value={2} />
              </Picker>
            </Item>
            <Item>
              <Input
                placeholder="Price"
                onChangeText={text => this.setState({price: text})}
                value={`${this.state.price}`}
              />
            </Item>
            <Item>
              <Input
                placeholder="Stock"
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

export default connect()(addProduct);
