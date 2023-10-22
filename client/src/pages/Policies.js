import React from 'react'
import Layout from '../components/Layout/Layout'

const Policies = () => {
    return (
        <Layout title={"Política de privacidade - The Mandalorian Store"}>
          <div className="row contactus">
            <div className="col-md-9">
              <h1 style={{ paddingTop: '50px' }}>Política de privacidade</h1>
              <div style={{ display: 'flex', gap: '50px' }}>
                <img
                  src="icons/mandalorianContact.jpg"
                  alt="contactus"
                  style={{ width: "300px", borderRadius: '20px' }}
                />
                <div className="col-md-4">
                  <p>Na "Jornada Mandaloriana," valorizamos e respeitamos a privacidade de nossos clientes. Esta política de privacidade descreve como coletamos, usamos e protegemos suas informações pessoais durante a sua interação conosco. Ao utilizar nossos serviços, você concorda com as práticas aqui descritas.</p>
                  <p>Coletamos informações pessoais apenas com seu consentimento e para fins específicos, como processar pedidos, fornecer suporte ao cliente e melhorar nossos serviços. Nunca vendemos ou compartilhamos suas informações com terceiros sem sua autorização.</p>
                  </div>
                  <div className="col-md-4">
                  <p>Utilizamos medidas de segurança avançadas para proteger suas informações contra acesso não autorizado. Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Entre em contato conosco para exercer esses direitos.</p>
                  <p>Nós podemos utilizar cookies e tecnologias similares para melhorar sua experiência em nosso site. Você pode optar por recusar cookies em seu navegador, mas isso pode afetar a funcionalidade do site.</p>
                  </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    };

export default Policies