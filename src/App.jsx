import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

function App() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formFinal = document.querySelector("form");
    const formInfo = new FormData(formFinal);

    fetch(
      "https://script.google.com/macros/s/AKfycbz6p_GyA3fTULBDF_fBSuNPPYIOWQOmG-yfUjCSPa5TO6ncomf1iRwxOptV2BPHALHO/exec",
      {
        method: "POST",
        body: formInfo,
      }
    );

    // EmailJs, service Id, template ID , public Key

    const serviceId = "service_ssquvgn";
    const templateId = "template_ahzq2v9";
    const publicKey = "n8h3fQNz_5V3LUjEH";

    // New object that contains dynamic template params

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: "Diego Martínez",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Felicitaciones! Se envio el correo", response);
        setformData({
          name: "",
          email: "",
          phone: "",
        });
      })
      .catch((error) => {
        console.error("Error, no se envio el mensaje", error);
      });
  };

  return (
    <div>
      <h1>Formulario </h1>
      <form onSubmit={submitHandler}>
        <label>
          Nombre
          <br />
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={formChangeHandler}
          />
        </label>
        <br />
        <label>
          Email
          <br />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={formData.email}
            onChange={formChangeHandler}
          />
        </label>
        <br />
        <label>
          Teléfono
          <br />
          <input
            type="text"
            name="phone"
            placeholder="Tu teléfono"
            value={formData.phone}
            onChange={formChangeHandler}
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
