import React from 'react';
 
import PropTypes from 'prop-types';



export default class Message extends React.Component{
    preRender = (isUser) => {
        if (isUser) { //si tu es l'utilisateur retourne juste le message
            return(
                <p className="user-message">
                  {this.props.details.message}
                </p>
            )
        }

        else{
            return(//si tu n'es pas l'utilisateur retourne moi le pseudo
                <p className="not-user-message">
                    <strong>
                        {this.props.details.pseudo}:{this.props.details.message}
                    </strong>
                </p>
            )
        }
    };


    render(){
        return(
            this.preRender(this.props.isUser(this.props.details.pseudo))
        )
    }
} 
Message.propTypes = {
    details: PropTypes.object.isRequired,

};