import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Card, CardText, CardBody, Alert,
    CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class ContentManager{

    createCard(context,content) {
        return (
          <div  >
          <Card  color="warning" >
            <CardBody>
              <CardTitle className="fuenteInfo" align="center">{content.title.slice(0,30)}</CardTitle>
            </CardBody>
            <img width="380px" height="280px" src={content.thumbnail}/>
            <CardBody>
              <CardText className="fuenteInfo" align="center" >Precio : ${content.price} </CardText>
              <Link to={content.permalink}>Ver en MercadoLibre</Link>
            </CardBody>
          </Card>
          </div>
          );
      }
    
    goTo(context,link){
      context.props.history.push(link)
    }
    
      splitOn(context,number,tipo) {
        tipo = (tipo.tipo)
        const numberOfRows = Math.ceil((context.state[tipo] ? context.state[tipo].length : 0) / number);
        const splited = [];
        for (let i = 0; i < numberOfRows; i += 1) {
          splited.push(context.state[tipo].slice(i * number, number * (i + 1)));
        }
        return splited;
      }
      
      createRow(context,tipo) {
        return this.splitOn(context,3,tipo).map((list, i) => (
          <div className="card-deck" key={`card_${i}`} >
            {list.map(contenido => this.createCard(context,contenido))}
          </div>
        ));
      }

      renderList(context,tipo,titulo){
        if (context.state[tipo].length>0)
        { //id = "recomendados"
         return <Alert className="container-fluid" color="warning">
                <div align="left"><font className="fuenteTitulos">{titulo}</font></div>
                {this.createRow(context,{tipo})}
              </Alert>
        }
        else
        return <div></div>
      }
}