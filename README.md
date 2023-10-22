<div align='center'>

## **Teste para vaga de desenvolvedor Júnior na BTEN** 

</div>

> Esse repositório tem como objetivo provar os conhecimentos em JS, REACT, NEXTJS, MongoDB, Express, bem como a qualidade do código, afim de ser contratado para a vaga de desenvolvedor Junior na empresa BTEN
>> Status: Pronto para usar ✅

---------------------------------------------------------------------------------------------------------------------------------
## Como configurar e rodar o teste? 
---------------------------------------------------------------------------------------------------------------------------------
Para configurar e rodar o projeto é necessário
1) Clonar o repositório através do Git Hub
2) Instalar as dependências - Run: npm i (A lista de dependências encontram-se no final desse arquivo);
3) Configure as variáveis de DataBase no .env (já estão disponíveis no projeto);
4) Rodar o projeto através do terminal: npm run dev -  Esse passo vai rodar o server side e o client side;
5) Abrir o localhost; 
---------------------------------------------------------------------------------------------------------------------------------
## Como usar:
---------------------------------------------------------------------------------------------------------------------------------
1) Inicialmente você acessa o localhost como um site de uma loja normal;
2) Na homepage da loja não são exibidos todos os produtos, somente quando clicamos em ver mais na parte inferior da página;
3) É possível fazer todos os movimentos (Pesquisar equipamento, filtrar equipamento, ver categorias de equipamentos, <br>
saber mais sobre os equipamentos e colocar um equipamento no carrinho, ou seja, interagir com a lista de equipamentos;
4) Caso queira realizar uma compra, é necessário fazer LOGIN;
5) Caso não tenha CADASTRO é necessário realizar um para proceder com a compra;
6) Uma vez feito o cadastro é necessário fazer o login;
7) Ao fazer o login, você poderá finalizar a sua compra;
8) Para finalizar a compra é necessário colocar cartão de crédito pois foi feita a integração com gateway de pagamento;
   
    >> Info de cartão de crédito teste: Card Number: 4242 4242 4242 4242 / Expire Date: 12/23 / CVC: 123

    ### É importante salientar que o Usuário e o Administrador possuem Dashboards diferentes
    
10) Na dashboard de usuário é possível:
    - Editar o perfil;
    - Editar as informações de cadastro, menos o e-mail;
    - Verificar os Status do pedido.
11) Na dashboard de ADMIN é possível:
    - Criar/Editar/Deletar uma categoria;
    - Criar/Editar/Deletar um equipamento;
    - Verificar a lista de Equipamentos (Editar);
    - Verificar todos os pedidos feitos pelos usuários e editar detalhes de status dos pedidos.

   - Dados de acesso

     >> Dados de Usuário teste: Login - teste@teste.com.br // Senha - Teste <br>
     
     >> Dados de Administrador: Login - admin@gmail.com   // Senha - admin

---------------------------------------------------------------------------------------------------------------------------------
## Tecnologias e dependências utilizadas: 
---------------------------------------------------------------------------------------------------------------------------------
JavaScript <br>
ReactJS + NodeJS + NextJS + Express <br>
Mongoose - Mongo DB - Bando de dados não relacional <br>
Bootstrap 5 <br>
Antd <br>
Axios <br>
BCrypt <br>
Braintree <br>
concurrently <br>
Express-Formidable <br>
JWT - Json Web Token <br>
Moment <br>
Morgan <br>
Nodemon <br>
React-helmet <br>
React-hot-toast <br>
React-router-dom <br>
React-toastify <br>
React Icons <br>
Slugify

Todas as dependência e pacotes encontram-se no arquivo package.json

