import React from 'react';

import Formulaire from './Formulaire';
import Message from './Message';
import base from '../BDD';
//CSS
import ReactCSSTRansitionGroup from 'react-addons-css-transition-group';
import '../animation.css';
//propTypes
import PropTypes from 'prop-types';



export default class App extends React.Component{
    state={
        messages:{}
    }
    //cycle de vie react
    componentWillMount(){
        this.ref= base.syncState('/',{//synchronisation avec firebase
            context:this,
            state: 'messages' 
        }) 
    }
    componentDidUpdate(){ //dès que c'est mis à jour tu scroll vers le bas
        //mettre le scrol vers le bas
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    addMessage = (message) => {
         //copier le state
         const messages = {...this.state.messages}; // les ... signifie récupère tous ce que tu trouve dans ce state
         //On ajoute le message avec une cle timestamp
         const timestamp = Date.now(); //fonction JS recupère l'instant t en mms
         messages[`message-${timestamp}`] /*version ES6*/ = message;  //concaténation message-timestamp
         //on supprime message le plus vieux si plus de 10 messages
         Object.keys(messages).slice(0,-10)/*slice coupe et garde les 10 derniers messages*/
         .map(key => messages[key] = null/*(key => messages[key] = null) null supprime le message sélectionné*/ ) 
         //mettre à jour notre state
         this.setState({messages: messages});
    }
    isUser = (pseudo) => {
        return pseudo === this.props.params.pseudo //est-ce que le pseudo correspond à celui de l'URL
    }
    render(){
        const messages = Object
        .keys(this.state.messages)
        .map(key => <Message key={key} /*Itération sur les keys et renvoi le compponent message le key={key} correspond au fait qu'il faut qq chose d'unique à chaque itération ici le timestamp*/
        details={this.state.messages[key]} // recupération du message unique de chaque clé
        isUser={this.isUser}
        />) 
        
        return(

            <div className="box">
                <div>
                    <div className="messages" ref={input => this.messages=input} >
                        <ReactCSSTRansitionGroup
                            component="div" //on lui demande de se comporter comme une div
                            className="message"
                            transitionName="message"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            {messages /*retourne la constante messages*/} 
                        </ReactCSSTRansitionGroup>
                    </div>
                         <Formulaire 
                            addMessage={this.addMessage}
                            pseudo={this.props.params.pseudo}
                            length={180}
                    />
                </div>
               
            </div>
           
        )
    }
} 

App.propTypes = {
    params: PropTypes.object.isRequired,

};