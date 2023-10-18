import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout title={"Página não encontrada - The Mandalorian Store"}>
        <div className="pnf">
            <h1 className="pnf-title">404</h1>
            <h2 className="pnf-heading">Rodamos a República galáctica e não encontramos essa página</h2>
            <Link to="/" className="pnf-btn">
                Voltar de Millenium Falcon
            </Link>
            <div className="pnf-icon">
                <img src="icons/milleniumFalcon.png" alt="Icon" width="350" height="270" style={{ borderRadius: '20px' }} />
            </div>
        </div>
    </Layout>
  )
}

export default PageNotFound