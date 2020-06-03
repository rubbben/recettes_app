import React from 'react';

const Header = ({ pseudo }) => {

    const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`;
                                                    //pseudo[0] prend en compte la 1ere lettre


    return (
        <header>
            <h1>La boite à recette {formatPseudo(pseudo)}</h1>
        </header>
    )
}

export default Header;