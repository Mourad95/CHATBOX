import React from 'react';

export default class Connexion extends React.Component{

    goToChat=event=>{
        event.preventDefault(); //empêche le rafraichissement de la page
        const pseudo = this.pseudoInput.value; //on recupère le pseudo
        //changer l'url
        this.context.router.transitionTo('/pseudo/'+pseudo)
    }
    render(){
        return(
            <div className="connexionBox" onSubmit={(event)=>this.goToChat(event)}>
                <form className="connexion">
                
                <input 
                 type="text" 
                 placeholder="pseudo" 
                 required 
                 ref={(input)=>{this.pseudoInput=input}/*Sert de ref pour récupérer l'input*/}/>
                
                <button type="submit">GO</button>
                </form>
            </div>
        )
    } 
    static contextTypes={ //popur l'utilisation du router il faut lui dire que c'est un objet
        router: React.PropTypes.object
    }
}

