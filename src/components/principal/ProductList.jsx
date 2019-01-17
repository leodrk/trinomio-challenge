import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '../../dist/css/App.css';
import React from 'react';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ContentManager from './ContentManager.jsx'

let contentManager = new ContentManager(this);

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products : []
    };
  }

componentDidMount() {
  this.getProducts();
}

getProducts = async () => {
  await axios
       .get('https://api.mercadolibre.com/sites/'+this.props.selectedCategory.slice(0,3)+'/search?category='+this.props.selectedCategory+'&official_store_id=all')
       .then(data => this.setState({ products: data.data }))
       .catch(err => {
           console.log(err);
           return null;
       });
 };

render() {
  return (
    <div id="portada" className="content-box row">
    {console.log(this.state)}
      {contentManager.renderList(this,'products')}
    </div>
  );
}
}