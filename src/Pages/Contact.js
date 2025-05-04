import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_993oaji", // service id
        "template_q9tki6v", // template id
        form.current,
        "fl5TBkfPbmENU9RIc" // public key
      )
      .then(
        () => {
          setSubmitted(true);
          form.current.reset();
        },
        (error) => {
          console.error("could not send email", error);
        }
      );
  };

  return (
    <main className="contact-form">
      <h3 className="red-font big-font subheader-font">Contact</h3>
      <hr></hr>
      {submitted && (
        <p className="success-message">
          Thank you! Your message has been sent.
        </p>
      )}
      <form className="green-font less-big-font subheader-font" ref={form} onSubmit={sendEmail}>
        <label>
          name:
          <input className="input-field short-answer" type="text" name="name" required />
        </label>

        <label>
          email:
          <input className="input-field short-answer" type="email" name="email" required />
        </label>

        <label>
          message:
          <textarea className="input-field long-answer" name="message" required />
        </label>

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default Contact;
