/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

function Privacy() {
  return (
    <>
      <Container
        maxWidth="full"
        sx={{ backgroundColor: '#fff', px: { xs: '20px', sm: '30px', md: '50px', lg: '100px' } }}
      >
        <Box sx={{ py: { xs: '60px', sm: '70px', md: '177px' } }}>
          {/* About Us Heading */}
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: { xs: '30px', sm: '36px', md: '44px' },
              fontWeight: '700',
              mb: '30px',
              background: 'linear-gradient(91deg, #014092 27.18%, #137EF2 58.73%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PRIVACY POLICY
          </Typography>
          <Typography paragraph sx={{ fontSize: '18px', fontWeight: 300, color: '#000' }}>
            This Privacy Policy applies to all personal information collected by Flash Innovations
            Pty Ltd trading as Forever Messages ABN 50 619 618 870 (‘We, Us or Our’) via the website
            located at{' '}
            <span style={{ textDecoration: 'underline', color: '#137EF2' }}>
              www.forevermessages.com.au
            </span>{' '}
            (the ‘Website’) and/or the app known as Forever Messages (the ‘App’).
          </Typography>
          {/* Our Vision Section */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            What information do we collect?
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            The kind of Personal Information that We collect from you will depend on how you use the
            Website and/or the App. The Personal Information which We collect and hold about you may
            include: <br />
            <br />
            (i) name; <br />
            (ii) username; <br />
            (iii) date of birth; <br />
            (iv) password; <br />
            (v) address; <br />
            (vi) phone number; <br />
            (vii) email address.
          </Typography>
          {/* Main Features Section */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '20px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Types of information
          </Typography>

          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            The Privacy Act 1998 (Cth) (the ‘Privacy Act’) defines types of information, including
            Personal Information and Sensitive Information. Personal Information means information
            or an opinion about an identified individual or an individual who is reasonably
            identifiable: <br />
            <br />
            (a) whether the information or opinion is true or not; <br />
            (b) whether the information or opinion is recorded in a material form or not. <br />
            <br />
            If the information does not disclose your identity or enable your identity to be
            ascertained, it will in most cases not be classified as “Personal Information” and will
            not be subject to this privacy policy. Sensitive Information is defined in the Privacy
            Act as including information or opinion about such things as an individual's racial or
            ethnic origin, political opinions, membership of a political association, religious or
            philosophical beliefs, membership of a trade union or other professional body, criminal
            record or health information. Sensitive Information will be used by Us only: <br />
            <br />
            (a) for the primary purpose for which it was obtained;
            <br />
            (b) for a secondary purpose that is directly related to the primary purpose; <br />
            (c) with your consent or where required or authorised by law.
          </Typography>

          {/* Feature 4 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            How we collect your Personal Information
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            (a) We may collect Personal Information from you whenever you input such information
            into the Website and/or the App, or provide it to Us in any other way. <br />
            (b) We may also collect cookies from your computer/phone/device which enables Us to tell
            when you use the Website or the App and also to help customise your user experience. As
            a general rule, however, it is not possible to identify you personally from Our use of
            cookies. <br />
            (c) We generally don’t collect Sensitive Information, but when We do, We will comply
            with the preceding paragraph.
            <br />
            (d) Where reasonable and practicable We collect your Personal Information from you only.
            However, sometimes We may be given information from a third party, in cases like this We
            will take steps to make you aware of the information that was provided by a third party.
          </Typography>
          {/* Feature 5 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Purpose of collection
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            (a) We collect Personal Information to provide you with the best service experience
            possible and keep in touch with you about developments in Our business. <br />
            (b) We customarily only disclose Personal Information to Our service providers who
            assist Us in operating the Website and App. Your Personal Information may also be
            exposed from time to time to maintenance and support personnel acting in the normal
            course of their duties.
            <br />
            (c) By using Our Website or App, you consent to the receipt of direct marketing
            material. We will only use your Personal Information for this purpose if We have
            collected such information direct from you, and if it is material of a type which you
            would reasonably expect to receive from use. We do not use sensitive Personal
            Information in direct marketing activity. Our direct marketing material will include a
            simple means by which you can request not to receive further communications of this
            nature, such as an unsubscribe button link.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Security, Access and correction
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            (a) We store your Personal Information in a way that reasonably protects it from
            unauthorised access, misuse, modification or disclosure. When We no longer require your
            Personal Information for the purpose for which We obtained in, We will take reasonable
            steps to destroy and anonymise or de-identify it. Most of the Personal Information that
            is stored in Our client files and records will be kept for a maximum of 7 years to
            fulfill Our record keeping obligations. <br />
            (b) The Australian Privacy Principles: <br />
            <br />
            (i) permit you to obtain access to the Personal Information We hold about you in certain
            circumstances (Australian Privacy Principle 12); <br />
            (ii) allow you to correct inaccurate Personal Information subject to certain exceptions
            (Australian Privacy Principle 13).
            <br />
            <br />
            (c) Where you would like to obtain such access, please contact Us in writing on the
            contact details set out at the bottom of this privacy policy.
          </Typography>
          {/* Advantages Section */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '20px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Complaint procedure
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, pb: '20px', color: '#000' }}
          >
            If you have a complaint concerning the manner in which We maintain the privacy of your
            Personal Information, please contact Us as on the contact details set out at the bottom
            of this policy. All complaints will be considered by Us and We may seek further
            information from you to clarify your concerns. If We agree that your complaint is well
            founded, We will, in consultation with you, take appropriate steps to rectify the
            problem. If you remain dissatisfied with the outcome, you may refer the matter to the
            Office of the Australian Information Commissioner.
          </Typography>
          {/* Advantage 2 */}
          <Typography
            sx={{
              fontWeight: '600',
              mb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Overseas transfer
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Your Personal Information may be transferred overseas or stored overseas for a variety
            of reasons. It is not possible to identify each and every country to which your Personal
            Information may be sent. If your Personal Information is sent to a recipient in a
            country with data protection laws which are at least substantially similar to the
            Australian Privacy Principles, and where there are mechanisms available to you to
            enforce protection of your Personal Information under that overseas law, We will not be
            liable for a breach of the Australian Privacy Principles if your Personal Information is
            mishandled in that jurisdiction. If your Personal Information is transferred to a
            jurisdiction which does not have data protection laws as comprehensive as Australia's,
            We will take reasonable steps to secure a contractual commitment from the recipient to
            handle your information in accordance with the Australian Privacy Principles.
          </Typography>
          {/* Advantage 3 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            GDPR
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            In some circumstances, the European Union General Data Protection Regulation (GDPR)
            provides additional protection to individuals located in Europe. Where this is the case,
            there may be additional rights and remedies available to you under the GDPR if your
            Personal Information is handled in a manner inconsistent with that law.
          </Typography>
          {/* Advantage 4 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            How to contact Us about privacy
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            If you have any queries, or if you seek access to your Personal Information, or if you
            have a complaint about Our privacy practices, you can contact Us through
            <span style={{textDecoration: 'underline', color: '#137EF2'}} >info@forevermessages.com.au.</span>
          </Typography>
        </Box>
      </Container>
      <Box>
        <img src="/assets/about.svg" alt="" />
      </Box>
    </>
  );
}

export default Privacy;
