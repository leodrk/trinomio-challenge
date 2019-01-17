import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '../../dist/css/App.css';
import React from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class CategorySelection extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      categories : [],
      categorySelected : false,
    };
  }

componentDidMount() {
  this.getCategories();
}

toggle() {
  this.setState({
    dropdownOpen: !this.state.dropdownOpen
  });
}

getCategories = async () => {
 await axios
      .get('https://cors-anywhere.herokuapp.com/api.mercadolibre.com/sites/'+ this.props.selectedSite +'/categories')
      .then(data => this.setState({ categories: data.data }))
      .catch(err => {
          console.log(err);
          return null;
      });
};

categoriesListRender(){
  if (this.state.categories[0] !== undefined){
    return this.state.categories.map((cat) =>(<DropdownItem onClick={() => this.select(cat.id)} name={cat.name}>{cat.name}</DropdownItem>))
  }
}

select(category){
  this.setState({categorySelected : true, dropdownOpem : !this.state.dropdownOpen, selectedCategory : category})
}
  
render() {
  return (
    <div>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
        Seleccione una Categoría
      </DropdownToggle>
      <DropdownMenu 
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: (data) => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: 300,
                  },
                };
              },
            },
          }}>
        {this.categoriesListRender()}
      </DropdownMenu>
    </ButtonDropdown>
    {this.state.categorySelected ? <ProductList {...this.state}/> : <div></div>}
  </div>
);
}

}
