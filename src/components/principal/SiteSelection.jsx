import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '../../dist/css/App.css';
import logo from '../../dist/Logo.png';
import React from 'react';
import axios from 'axios';
import CategorySelection from './CategorySelection';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap';

export default class SiteSelection extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      sites : [],
      currentSite : null,
      siteSelected : false,
      scrollValue : "Lista de Países disponibles"
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
    if (!this.state.dropdownOpen){
      this.setState({siteSelected : false})
    }
  }

componentDidMount() {
  this.getSites();
}

getSites = async () => {
   await axios
      .get("https://cors-anywhere.herokuapp.com/api.mercadolibre.com/sites")
      .then(data => this.setState({ sites: data.data }))
      .catch(err => {
          console.log(err);
          return null;
      });
};

sitesListRender(){
  if (this.state.sites[0] !== undefined){
    return this.state.sites.map((i) =>
    (<DropdownItem onClick={() => this.select(i.id,i.name)} name={i.name}>{i.name}</DropdownItem>))
    }
  }

select(site,name){
  this.setState({siteSelected : true, dropdownOpem : !this.state.dropdownOpen, currentSite : site, scrollValue : name})
}
  
render() {
  return (
    <div>    
      <div align="center" className="divStyle"><img src={logo} width="350px" height="200px" alt="logo" /></div>
      <h1 align="center">¡Bienvenido!</h1>
      <div align="center">Para comenzar su búsqueda, por favor seleccione un país.</div>
      <div align="center" className="divStyle">
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
          {this.sitesListRender()}
        </DropdownMenu>
      </ButtonDropdown>
      {this.state.siteSelected ? <CategorySelection {...this.state}/> : <div></div>}
    </div>
    </div>
  );
  }
}
