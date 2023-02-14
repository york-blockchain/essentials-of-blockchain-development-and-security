import React,{Component} from 'react';
import {Form,Button,Table} from 'react-bootstrap';
import './App.css';
import web3 from './web3';
import storeHash from './storeHash';
import ipfs from './ipfs';


export default class App extends Component{
  state={
    ipfsHash:null,
    buffer:'',
    ethAddress:'',
    blockNumber:'',
    transactionHash:'',
    gasUsed:'',
    txReceipt:''
  };

captureFile = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const file = e.target.files[0];
  let reader = new window.FileReader();
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => this.convertBuffer(reader);
};

convertBuffer = async(reader) =>{
  const buffer = await Buffer.from(reader.result);
  this.setState({buffer});
};

  onSubmit = async  (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    console.log("Submitting file from ", accounts[0]);
    const ethAddress = await storeHash.options.address;
    this.setState({ethAddress});

    await ipfs.add(this.state.buffer,(err,ipfsHash) => {
      console.log(err, ipfsHash);
      this.setState({ipfsHash:ipfsHash[0].hash})
      storeHash.methods.set(this.state.ipfsHash).send({
        from:accounts[0]
      },(error, transactionHash) => {
        console.log(transactionHash);
        this.setState({transactionHash});
      })
    })
  }
  onClick = async () => {
    try{
      this.setState({blockNumber:"fetching..."});
      this.setState({gasUsed:"fetching..."});
      await web3.eth.getTransactionReceipt(this.state.transactionHash, (err,res)=>{
        console.log(err,res);
        this.setState({txReceipt:res});
      })
      await this.setState({blockNumber: this.state.txReceipt.blockNumber});
      await this.setState({gasUsed:this.state.txReceipt.gasUsed});
    } catch(e){
      console.log(e);
    }
  }

render(){
  return (
    <div className="App">
      <header className="App-header">
        Welcome to IPFS DApp
      </header>
      <h3>Choose a file to send to IPS</h3>
      <Form onSubmit={this.onSubmit}>
    <input type="file" onChange={this.captureFile}/>
    <Button bsStyle="primary" type="submit" >Submit File</Button>
      </Form>
      <hr/>
      <Button onClick={this.onClick} >Transaction Receipt</Button>
      <Table bordered Responsive>
          <thead>
            <tr>
              <th>Tx Receipt cat</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IPFS hash set on contract</td>
              <td>{this.state.ipfsHash}</td>
            </tr>
            <tr>
            <td>Contract address</td>
            <td>{this.state.ethAddress}</td>
            </tr>
            <tr>
              <td>Trx Hash</td>
              <td>{this.state.transactionHash}</td>
            </tr>
            <tr>
              <td>Block #</td>
              <td>{this.state.blockNumber}</td>
            </tr>
            <tr>
              <td>Gas</td>
              <td>{this.state.gasUsed}</td>
            </tr>
          </tbody>
      </Table>
    </div>
  );
}
}
