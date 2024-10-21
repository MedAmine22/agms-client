import ContactForm from "components/ContactSection/ContactForm";
import PageHeader from "components/HeaderSections/PageHeader";
import React from "react";

export default function Contact() {
  return (
    <div>
      <PageHeader title="Contact" home="Home" currentLink="Contact" />
      <ContactForm />
    </div>
  );
}
