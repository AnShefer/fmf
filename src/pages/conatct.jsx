import { Helmet } from 'react-helmet-async';

import { ContactView } from 'src/sections/contact-us/view';


;

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Contact Us | Forever Messages </title>
      </Helmet>

      <ContactView />
    </>
  );
}
