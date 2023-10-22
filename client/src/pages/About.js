import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"Sobre nós - The Mandalorian Store"}>
      <div className="row contactus " >
        <div className="col-md-8">
          <h1 style={{ paddingTop:'50px' }}>Sobre nós: A jornada Mandaloriana</h1>
          <div style={{ display:'flex', gap:'50px' }}>
            <img
                  src="icons/mandalorianContact.jpg"
                  alt="contactus"
                  style={{ width: "300px", borderRadius: '20px' }}
            />
          <p className="text-justify mt-2">
          Bem-vindo à nossa loja de equipamentos Mandalorianos, um lugar onde os guerreiros mais destemidos e apaixonados pela galáxia encontram tudo o que precisam para enfrentar desafios, desbravar fronteiras e manter a tradição viva. Aqui na "Jornada Mandaloriana," estamos dedicados a fornecer o melhor em tecnologia, armaduras e acessórios que uma alma guerreira precisa para seguir a trilha da honra e da resistência.

Nossa história é uma saga de determinação e compromisso inquebrantável com a cultura Mandaloriana. Fundada por um grupo de entusiastas que compartilham um amor profundo pela honra, pela lealdade e pela força, a "Jornada Mandaloriana" nasceu da paixão de manter viva a tradição e o espírito guerreiro Mandaloriano em tempos de mudança na galáxia.

O que nos diferencia é a nossa dedicação em trazer os melhores produtos Mandalorianos disponíveis. Trabalhamos incansavelmente para garantir que nossa seleção de equipamentos, armaduras, armas e artefatos esteja de acordo com os mais altos padrões de qualidade. Cada peça que oferecemos é cuidadosamente selecionada para garantir a autenticidade e durabilidade, não importa se você é um caçador de recompensas, um guardião da paz ou um amante da cultura Mandaloriana.

Na "Jornada Mandaloriana," acreditamos na importância da tradição e na capacidade de se adaptar às demandas do presente. É por isso que oferecemos uma gama de equipamentos que combina o artesanato atemporal com tecnologia de ponta, garantindo que você esteja sempre preparado para qualquer desafio que a galáxia possa oferecer.

Nossa equipe é composta por especialistas em cultura Mandaloriana, apaixonados por compartilhar seu conhecimento e ajudá-lo a encontrar o equipamento perfeito para suas necessidades. 
          </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Layout.defaultProps = {
  title: 'The Mandalorian Store',
  description: 'Teste de nível',
  keywords: 'React, JS, MONGODB',
  author: 'Bruno Patrício'
}

export default About;