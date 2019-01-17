import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '../../dist/css/App.css';
import React from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';

import ContentManager from './ContentManager.jsx'

let contentManager = new ContentManager(this);

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products : [],
      total : 0
    };
  }

componentDidMount() {
  this.getProducts();
}

getProducts = async () => {
  await axios
       .get('https://api.mercadolibre.com/sites/'+this.props.currentCategory.slice(0,3)+'/search?category='+this.props.currentCategory+'&official_store_id=all')
       .then(data => this.setState({ products: data.data.results, total : data.data.results}))
       .catch(err => {
           console.log(err);
           return null;
       });
 };


render() {
  return (
    <div id="portada" className="content-box row">
    {contentManager.renderList(this,'products', this.state.total.lenght)}
    </div>
  );
}
}
