import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
        <h6 className="text-center">All right reserved - Teste de nivelamento para a Bten - Bruno Patricio @devbpatriciocosta </h6>
        <p className="text-center mt-3">
            <Link to="/about">Sobre</Link> | 
            <Link to="/contact">Contatos</Link> |
            <Link to="/policies">Política de privacidade</Link>
        </p>
    </div>
  )
}

export default Footer