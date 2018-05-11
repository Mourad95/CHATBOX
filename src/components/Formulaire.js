import React from 'react';
import PropTypes from 'prop-types';


export default class Formulaire extends React.Component{
    
    state = {
        length: this.props.length
    }
    
    createMessage = (event) => {
        event.preventDefault();
        const message={
            message: this.message.value, //on recupere le message
            pseudo: this.props.pseudo
        };
        this.props.addMessage(message);
        //reset zone de text
        this.messageForm.reset();
        //reset nombre de caractères
        const length = this.props.length
        this.setState({length})
    }
    compteur = (event) => { // fonction de MàJ du nombre de caractères restant
        const currentLength = this.props.length - this.message.value.length
        //console.log(currentLength)
        this.setState({length: currentLength});
    }

    
    render(){
        
        return(

            <form 
                className="form"
                onSubmit={(event)=>{this.createMessage(event)}}
                ref={(input)=> this.messageForm = input}
            >
            <textarea 
                required 
                maxLength={this.props.length} 
                placeholder="Entrer le message"
                ref={(input) => this.message = input}
                onChange={(event)=> this.compteur(event)}
            >

            </textarea>

            <div className="info" >
                info {this.state.length /* MàJ du nombre de caractère*/}
            </div>

            <button type="submit">Envoyer!</button>
         
         </form>
           
        )
    }
   
} 


    Formulaire.propTypes = {
        addMessage: PropTypes.func.isRequired,
        pseudo: PropTypes.string.isRequired,
        length: PropTypes.number.isRequired,
    };


