import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '../../dist/css/App.css';
import React from 'react';
import axios from 'axios';
import CategorySelection from './CategorySelection';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SiteSelection extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      sites : [],
      selectedSite : null,
      siteSelected : false,
      selectedSiteName : "asd"
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
    (<DropdownItem onClick={() => this.select(i.id, i.name)} name={i.name}>{i.name}</DropdownItem>))
    }
  }

select(site, name){
  this.setState({siteSelected : true, dropdownOpem : !this.state.dropdownOpen, selectedSite : site, selectedSiteName : name})
}


handleClick(){
  this.setState({siteSelected : true})
}
  
render() {
  return (
    <div>
      <h1>Bienvenido</h1>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret name>
          Seleccione un País
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
  );
  }
}
