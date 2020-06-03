import React, { Component } from 'react';
import AjouterRecette from './AjouterRecette';
import recettes from '../recettes';
import AdminForm from './AdminForm';
import Login from './Login';
//Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import base, { firebaseApp } from '../base'


class Admin extends Component {
    state = {
        uid: null,
        chef: null
    }



    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.handleAuth({user});
            }
        })
    }



    handleAuth = async authData => {                                                //async va permettre d'appeler des await via firebase
        // console.log(authData);  
        const box = await base.fetch(this.props.pseudo, { context: this });         //await va pas passer a la suite tant qu'il n'a pas terminer sa tache. fetch() recupere les données dans la BDD
        
        if (!box.chef) {
            await base.post(`${this.props.pseudo}/chef`, { data: authData.user.uid });
        }

        this.setState({
            uid: authData.user.uid,
            chef: box.chef || authData.user.uid
        });
    }

    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider();

        firebaseApp.auth().signInWithPopup(authProvider).then(this.handleAuth);
    }

    logout = async () => {
        console.log('Deconnexion');
        await firebase.auth().signOut();
        this.setState({uid: null});
    }



    render() {
        const { recettes, ajouterRecette, majRecette, chargerExemple, supprimerRecette } = this.props ;

        const logout = <button onClick={this.logout}>Déconnexion</button>

        //Si l'utilisateur n'est pas connecté
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}></Login>
        }

        //Si c'est le chef ou pas
        if (this.state.uid !== this.state.chef) {
            return (
                <div>
                    <p>Tu n'es pas le chef de cette boite !</p>
                    {logout}
                </div>
            )
        }

        return (
            <div className="cards">

                <AjouterRecette ajouterRecette={ajouterRecette} />
                {
                    Object.keys(recettes).map(key => <AdminForm key={key} id={key} majRecette={majRecette} recettes={recettes} supprimerRecette={supprimerRecette} />)
                }
                
                <footer>
                    {logout}
                    <button onClick={chargerExemple}>Remplir</button>
                </footer>
            </div>
            
        )
    }
}

export default Admin;