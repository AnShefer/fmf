/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

function AboutUs() {
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
              mb: '40px',
              background: 'linear-gradient(91deg, #014092 27.18%, #137EF2 58.73%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Us
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
            About Us
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            Welcome to Forever Message, an innovative platform designed to help you leave heartfelt
            and meaningful messages for your loved ones, ensuring your words and memories endure
            even after you are gone. At Forever Message, we understand the importance of staying
            connected with those you cherish, and we provide a secure and intuitive way to create
            and send personalized messages that will be accessed at just the right moment.
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
            Our Vision
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            Our vision is to offer a service that allows individuals to express their emotions,
            share memories, and provide guidance to their loved ones, no matter the circumstances.
            We believe in the power of words and the comfort they can bring, especially during
            significant moments in life.
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
            Main Features
          </Typography>

          {/* Feature: Scheduled Messages */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Scheduled Messages
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            With Forever Message, you can record and schedule text, audio, or video messages to be
            accessed at precisely the right time. Our unique searching bar feature allows users to
            type in important events or keywords. If a loved one has left a specific message for
            that event, it will pop up, creating a magical connection between the message and the
            moment.
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
            Personalization
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Make each message unique and special by adding photos, videos, and personal notes. Our
            platform allows for extensive personalization, ensuring that your messages reflect your
            true feelings and intentions.
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
            Encrypted Messages
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            We prioritize your privacy and confidentiality. All messages are encrypted to ensure
            that your last words remain secure and private, accessible only to the intended
            recipients.
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
            Notifications to Contacts
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Notify your trusted contacts or solicitor about the existence of your messages. Ensure
            that you leave their family name and a password to guarantee their delivery when the
            time comes.
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
            Digital Legacy
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            Create a digital legacy that your loved ones can keep and remember. Forever Message
            helps you to leave behind more than just words; it allows you to leave a lasting
            emotional connection.
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
            Advantages
          </Typography>

          {/* Advantage 1 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Peace of Mind
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, pb: '20px', color: '#000' }}
          >
            Provide peace of mind knowing that your thoughts, instructions, and feelings will be
            shared with your loved ones, even when you can no longer be there in person.
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
            Lasting Connection
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Maintain an emotional connection with your loved ones even after you are gone. Forever
            Message ensures that your presence is felt through your words and memories.
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
            Friendly Interface
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Our platform is designed to be user-friendly, with a step-by-step guide that makes it
            easy to create and schedule your messages. Whether you're tech-savvy or not, you'll find
            Forever Message easy to navigate and use.
            <br />
            <br /> We invite you to become part of our community. Help us in our mission to create
            lasting connections and provide comfort through words. Join us in funding greatness and
            ensuring that your messages of love and legacy live on forever.
            <br />
            <br /> Thank you for choosing Forever Message. We are honored to help you create
            something truly special for your loved ones.
          </Typography>
        </Box>
      </Container>
      <Box>
        <img src="/assets/about.svg" alt="" />
      </Box>
    </>
  );
}

export default AboutUs;
