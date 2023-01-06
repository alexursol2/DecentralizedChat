import React, { Component} from 'react';
import Web3 from 'web3';
import Shorter from './Shorter';

class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }

  componentDidMount() {
    this.getAddress();
  }

  async getAddress() {
    const web3 = new Web3(Web3.givenProvider);
    const address = await web3.eth.getAccounts();
    this.setState({ address: address[0] });
  }

  render() {
    return (
        <Shorter text={this.state.address} startChars={4} endChars={4} maxLength={11} /> 
    );
  }
}

export default Address;