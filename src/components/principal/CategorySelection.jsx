import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '../../dist/css/App.css';
import React from 'react';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap';
import ContentManager from './ContentManager.jsx'

let contentManager = new ContentManager(this);

export default class CategorySelection extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.renderProducts =this.renderProducts.bind(this)
    this.state = {
      dropdownOpen: false,
      categories : [],
      categorySelected : false,
      currentCategory : null,
      scrollValue : "Categorias",
      products : undefined,
      busqueda : false
    };
  }

componentDidMount() {
  this.getCategories();
}

toggle() {
  this.setState({
    dropdownOpen: !this.state.dropdownOpen
  });
  if (!this.state.dropdownOpen){
    this.setState({categorySelected : false})
  }
}

getCategories = async () => {
 await axios
      .get('https://cors-anywhere.herokuapp.com/api.mercadolibre.com/sites/'+ this.props.currentSite +'/categories')
      .then(data => this.setState({ categories: data.data }))
      .catch(err => {
          window.alert("Imposible acceder a las categorias de este site")
          return null;
      });
};

categoriesListRender(){
  if (this.state.categories[0] !== undefined){
    return this.state.categories.map((cat) =>(<DropdownItem onClick={() => this.select(cat.id, cat.name)} name={cat.name}>{cat.name}</DropdownItem>))
  }
}

select(category, name){
  this.state.currentCategory = category
  this.state.categorySelected = true
  this.handleClick()
  this.setState({dropdownOpen : !this.state.dropdownOpen, scrollValue : name})
  
}

renderProducts()
{
  if (this.state !== undefined){
  return(
    <div>
    {contentManager.renderList(this,'products')}
    </div>
    )
  }
  }

  handleClick = async () =>{
    await axios
    .get('https://api.mercadolibre.com/sites/'+this.state.currentCategory.slice(0,3)+'/search?category='+this.state.currentCategory+'&official_store_id=all')
    .then(data => {this.state.products= data.data.results})
    .catch(err => {
        console.log("se pudrio todo");
        return null;
    });
    this.setState({busqueda : true})
   }
  
render() {
  return (
    <div align="center" className="divStyle">
    <div align="center">Seleccione la categoría que desea listar.</div>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
        {this.state.scrollValue}
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
    {this.state.busqueda ? <this.renderProducts/> : <div/>}
  </div>
);
}

}
