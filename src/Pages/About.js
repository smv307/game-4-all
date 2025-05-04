import React from "react";

const About = () => {
  return (
      <main id="about-page">
        <section id="about-controller" className="nextdoor-parent centered">
          <figure className="nextdoor-child">
            <img src="./public/images/placeholder.jpg" alt="Placeholder" />
          </figure>
          <article className="nextdoor-child">
            <h1 className="extra-big-font subheader-font green-font">
              MAKING VIDEOS GAMES ACCESSIBLE TO EVERYONE
            </h1>
            <hr />
            <p className="less-big-font paragraph-font blue-font">
              We collaborate with the Oakland Unified School District’s Special
              Education program to provide free, accessible gaming consoles. Our
              initiative is entirely student-driven—designed and developed by a
              group of high school students.
            </p>
          </article>
        </section>
      </main>
  );
};

export default About;
