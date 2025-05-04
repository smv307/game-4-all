import React from "react";

// setup step template
const SetupStep = ({ stepNumber, text, imageSrc, textColor }) => (
  <section className="instruction nextdoor-parent centered">
    <img
      className="nextdoor-child"
      src={imageSrc}
      alt={`Step ${stepNumber}`}
    />
    <p className={`${textColor} nextdoor-child big-font paragraph-font`}>
      {stepNumber}. {text}
    </p>
  </section>
);

const Setup = () => {
  return (
    <main id="setup-page">
      <section>
        {/* Steps */}
        <SetupStep
          stepNumber={1}
          text="Plug the console into your device's USB-C port."
          imageSrc="./images/setup-visuals/plug-in.jpg"
          textColor="red-font"
        />
        <SetupStep
          stepNumber={2}
          text="A popup like this will appear. Click 'allow' to finish connecting the console."
          imageSrc="./images/setup-visuals/popup.png"
          textColor="blue-font"
        />
      </section>
    </main>
  );
};

export default Setup;
