import PageHeader from "components/HeaderSections/PageHeader";
import Projects from "components/Landing/Projects/Projects";
import React from "react";

export default function Projects_() {
  return (
    <div>
      <PageHeader title="Projects" home="Home" currentLink="Projects" />
      <div className="container">
        <Projects />
      </div>
    </div>
  );
}
