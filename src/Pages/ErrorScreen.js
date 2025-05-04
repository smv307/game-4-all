import React, { useEffect, useState } from "react";

const ErrorScreen = () => {
  const [isMobile, setIsMobile] = useState(false);

  // check if the device is mobile
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobile =
      /android|iphone|ipad/i.test(
        userAgent.toLowerCase()
      );
    setIsMobile(mobile);
  }, []);

  // if the device is not mobile, show website normally
  if (!isMobile) return null;

  // if the device is mobile, show the error screen
  return (
    <div
      className="centered"
      style={{
        backgroundColor: "var(--blue)",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section id="error-screen">
        <h1 className="header-font beige-font big-font">SORRY!</h1>
        <hr style={{ borderTop: "4px dashed var(--green)" }} />
        <h2 className="subheader-font red-font">
          our controller is only compatible with laptop/pc
        </h2>
      </section>
    </div>
  );
};

export default ErrorScreen;
