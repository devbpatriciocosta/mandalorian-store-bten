import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Fale conosco! - The Mandalorian Store"}>
      <div className="row contactus ">
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Fale Conosco!</h1>
          <p className="text-justify mt-2">
           Em caso de dúvida ou problema com o seu produto, fale com a gente! Resolveremos em 24 horas. Preciso desse emprego.
          </p>
          <p className="mt-3">
            <BiMailSend /> : bpatriciocosta@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 85 99727-5152
          </p>
          <div className="col-md-6 mx-auto">
            <img
                src="icons/mandalorianContact.jpg"
                alt="contactus"
                style={{ width: "100%", borderRadius: '20px' }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;