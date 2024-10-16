/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

function Security() {
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
            Security
          </Typography>

          {/* About Us Section */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px' },
              color: '#000',
            }}
          >
            SECURITY
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            We take the security and privacy of our users very seriously. Our commitment to
            protecting your data is reflected in the comprehensive security measures we have
            implemented across our website. Here, we outline the various strategies and technologies
            we employ to ensure your information remains secure.
          </Typography>

          {/* Our Vision Section */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Our Commitment
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Secure Infrastructure:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            We use a trusted hosting provider known for its robust security features to protect our
            website from unauthorized access and potential threats.
          </Typography>

          {/* Main Features Section */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              pb: '20px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Data Protection:
          </Typography>

          {/* Feature: Scheduled Messages */}
          {/* <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Scheduled Messages
          </Typography> */}
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            All your data is handled with the utmost care, employing advanced encryption and
            security measures to ensure its confidentiality and integrity.
          </Typography>

          {/* Additional Features */}
          {/* Feature 2 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Industry Standards:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            We adhere to industry standards and best practices for security. Our security measures
            are regularly reviewed to ensure compliance with the latest regulations and standards,
            providing you with a secure environment.
          </Typography>

          {/* Feature 3 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Compliance:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Our platform complies with major data protection regulations, ensuring that your
            personal information is handled with care and in accordance with legal requirements.
          </Typography>

          {/* Feature 4 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Immediate Action:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            In the unlikely event of a security breach, our incident response team is prepared to
            take immediate action. We have a comprehensive incident response plan in place to
            quickly identify, contain, and mitigate any potential threats.
          </Typography>

          {/* Feature 5 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Our Security Culture
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Continuous Improvement:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            We believe that security is an ongoing process. We are actively committed to staying
            up-to-date with the latest security threats and advancements. Your security is our
            priority, and we take every measure to maintain and improve it continuously.
          </Typography>

          {/* Advantages Section */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              pb: '20px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Proactive Measures:
          </Typography>

          {/* Advantage 1 */}
          {/* <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Peace of Mind
          </Typography> */}
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, pb: '20px', color: '#000' }}
          >
            We take a proactive approach to security, regularly conducting audits and assessments to
            identify and mitigate potential vulnerabilities. This helps us stay ahead of potential
            threats and maintain the highest levels of security for our users.
          </Typography>

          {/* Advantage 2 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              mb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            User Responsibilities
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            To further safeguard your security, we recommend the following best practices:
          </Typography>

          {/* Advantage 3 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Protect Your Passwords:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Never share your passwords with anyone. Ensure your passwords are strong and unique to
            prevent unauthorized access.
          </Typography>

          {/* Advantage 4 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Be Aware of Phishing:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Be cautious of emails or messages that ask for your personal information or direct you
            to click on unfamiliar links. Always verify the source before responding or clicking..
          </Typography>

          {/* Advantage 5 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Use Secure Networks:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Avoid using public Wi-Fi networks for accessing sensitive information. Use a secure,
            private connection whenever possible.Your cooperation and vigilance are crucial in
            maintaining a secure environment. If you have any questions or concerns about security,
            please contact us directly. Thank you for trusting us with your data.
          </Typography>
        </Box>
      </Container>
      <Box>
        <img src="/assets/about.svg" alt="" />
      </Box>
    </>
  );
}

export default Security;
