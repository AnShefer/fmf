/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

function Terms() {
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
            About the App and Website
          </Typography>
          {/* About Us Section */}
          {/* <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px' },
              color: '#000',
            }}
          >
            Condition
          </Typography> */}
          <Typography paragraph sx={{ fontSize: '18px', fontWeight: 300, color: '#000' }}>
            Welcome to Forever Messages (Forever Messages). Forever Messages provides customers with
            the ability to record videos, upload photos, and send text messages to be accessed by
            others at a later point in time (the ‘Services’).
          </Typography>
          <Typography paragraph sx={{ fontSize: '18px', fontWeight: 300, color: '#000' }}>
            Forever Messages is operated by Flash Innovations Pty Ltd ABN 50 619 618 870 (Flash
            Innovations). Access to and use of Forever Messages, or any of its associated products
            or Services (including the app and website), is provided by Flash Innovations. Please
            read these terms and conditions (the ‘Terms’) carefully. By using Forever Messages, this
            signifies that you have read, understood and agree to be bound by the Terms. If you do
            not agree with the Terms, you must cease usage of Forever Messages, or any of Services,
            immediately.
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', mb: '40px', fontWeight: 300, color: '#000' }}
          >
            (c) Flash Innovations reserves the right to review and change any of the Terms by
            updating this page at its sole discretion. When Flash Innovations updates the Terms, it
            will use reasonable endeavours to provide you with notice of updates to the Terms. Any
            changes to the Terms take immediate effect from the date of their publication. Before
            you continue, we recommend you keep a copy of the Terms for your records.
          </Typography>
          {/* Our Vision Section */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Acceptance of the Terms
          </Typography>
          {/* <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Secure Infrastructure:
          </Typography> */}
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            You accept the Terms by visiting or using Forever Messages. You may also accept the
            Terms by clicking to accept or agree to the Terms where this option is made available to
            you in the user interface.
          </Typography>
          {/* Main Features Section */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '20px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Registration to use the Services
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
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            In order to access the Services, you must first register for an account through the app
            or website (the 'Account').
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            As part of the registration process, or as part of your continued use of the Services,
            you may be required to provide personal information about yourself (such as
            identification or contact details), including:
          </Typography>{' '}
          {/* Feature 3 */}
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            (i) Email address; <br />
            (ii) Preferred username; <br />
            (iii) Telephone number; <br />
            (iv) Date of birth; <br />
            (v) Password. <br />
          </Typography>
          {/* Feature 3 */}
          {/* <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Compliance:
          </Typography> */}
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            You warrant that any information you give to Flash Innovations in the course of
            completing the registration process will always be accurate, correct and up to date.{' '}
            <br />
            Once you have completed the registration process, you will be a registered member of
            Forever Messages ('Member') and agree to be bound by the Terms. <br />
            You may not use the Services and may not accept the Terms if:
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            i. you are not of legal age to form a binding contract with Infinity Lawyers Pty Ltd;{' '}
            <br />
            ii. you are a person barred from receiving the Services under the laws of Australia or
            other countries including the country in which you are resident or from which you use
            the Services.
          </Typography>
          {/* Feature 4 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Your obligations as a Member
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            (i) As a Member, you agree to comply with the following: <br />
            you will use the Services only for purposes that are permitted by:
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pt: '20px', pb: '20px', color: '#000' }}
            >
              (A) the Terms; and <br />
              (B) any applicable law, regulation or generally accepted practices or guidelines in
              the relevant jurisdictions;
            </Typography>
            (ii) you have the sole responsibility for protecting the confidentiality of your
            password and/or email address. Use of your password by any other person may result in
            the immediate cancellation of the Services; <br />
            (iii) any use of your registration information by any other person, or third parties, is
            strictly prohibited. You agree to immediately notify Flash Innovations of any
            unauthorised use of your password or email address or any breach of security of which
            you have become aware; <br />
            (iv) access and use of Forever Messages is limited, non-transferable and allows for the
            sole use of Forever Messages by you for the purposes of Flash Innovations providing the
            Services; <br />
            (v) you will not use Forever Messages or Forever Messages’ Services in connection with
            any commercial endeavours except those that are specifically endorsed or approved by the
            management of Flash Innovations; <br />
            (vi) you will not use Forever Messages or Forever Messages’ Services for any illegal
            and/or unauthorised use which includes collecting email addresses of Members by
            electronic or other means for the purpose of sending unsolicited email or unauthorised
            framing of or linking to Forever Messages; <br />
            (vii) you agree that commercial advertisements, affiliate links, and other forms of
            solicitation may be removed from Forever Messages without notice and may result in
            termination of the Services. Appropriate legal action will be taken by Flash Innovations
            for any illegal or unauthorised use of the Forever Messages; <br />
            (viii) you acknowledge and agree that you are over the age of 18 years; and <br />
            (ix) you acknowledge and agree that any automated use of Forever Messages or Forever
            Messages’ Services is prohibited.
          </Typography>
          {/* Feature 5 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Payment
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            All payments made in the course of your use of the Services are made using either credit
            card, Paypal, Stripe, Google Pay or Apple Pay. In using Forever Messages, the Services
            or when making any payment in relation to your use of the Services, you warrant that you
            have read, understood and agree to be bound by the terms and conditions of the payment
            provider which are available on their respective websites. <br /> You acknowledge and
            agree that where a request for a payment is returned or denied, for whatever reason, by
            your financial institution or is unpaid by you for any other reason, then you are liable
            for any costs, including banking fees and charges, associated with the fee.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Refund Policy
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '40px', color: '#000' }}
          >
            Flash Innovations will only provide you with a refund in the event they are unable to
            continue to provide the Services or if Flash Innovations makes a decision, at its
            absolute discretion, that it is reasonable to do so under the circumstances. Where this
            occurs, the refund will be in the proportional amount of any fees that remains unused by
            the Member (the ‘Refund’). <br /> Any benefits set out in these Terms may apply in
            addition to consumer's rights under the Australian Consumer Law.
          </Typography>
          {/* Advantages Section */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '20px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Copyright and Intellectual Property
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, pb: '20px', color: '#000' }}
          >
            Forever Messages, the Services and all of the related products of Flash Innovations are
            subject to copyright. The material on Forever Messages is protected by copyright under
            the laws of Australia and through international treaties. Unless otherwise indicated,
            all rights (including copyright) in the Services and compilation of Forever
            Messages(including but not limited to text, graphics, logos, button icons, video images,
            audio clips, code, scripts, design elements and interactive features) or the Services
            are owned or controlled for these purposes, and are reserved by Flash Innovations or its
            contributors. <br />
            All trademarks, service marks and trade names are owned, registered and/or licensed by
            Flash Innovations, who grants to you a worldwide, non-exclusive, royalty-free, revocable
            license whilst you are a Member to:
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pt: '20px', color: '#000' }}
            >
              (i) use Forever Messages pursuant to the Terms; <br />
              (ii) copy and store material contained in Forever Messages in your device's cache
              memory; <br />
              (iii) print pages from Forever Messages for your own personal and non-commercial use.
            </Typography>
            Flash Innovations does not grant you any other rights whatsoever in relation to Forever
            Messages or the Services. All other rights are expressly reserved by Flash Innovations.{' '}
            <br /> Flash Innovations retains all rights, title and interest in and to Forever
            Messages and all related Services. Nothing you do on or in relation to Forever Messages
            will transfer any:
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pt: '20px', color: '#000' }}
            >
              (i) to you.business name, trading name, domain name, trade mark, industrial design,
              patent, registered design or copyright <br />
              (ii) a right to use or exploit a business name, trading name, domain name, trade mark
              or industrial design <br />
              (iii) a thing, system or process that is the subject of a patent, registered design or
              copyright (or an adaptation or modification of such a thing, system or process),
            </Typography>
            You may not, without the prior written permission of Flash Innovations and the
            permission of any other relevant rights owners: broadcast, republish, up-load to a third
            party, transmit, post, distribute, show or play in public, adapt or change in any way
            the Services or third party Services for any purpose, unless otherwise provided by these
            Terms. This prohibition does not extend to materials on Forever Messages, which are
            freely available for re-use or are in the public domain.
          </Typography>
          {/* Advantage 2 */}
          <Typography
            sx={{
              fontWeight: '600',
              mb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Privacy
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Flash Innovations takes your privacy seriously and any information provided through your
            use of Forever Messages and/or Services are subject to our Privacy Policy, which is
            available on <Link to="/privacy">Privacy Policy</Link>.
          </Typography>
          {/* Advantage 3 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            General Disclaimer
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            Nothing in the Terms limits or excludes any guarantees, warranties, representations or
            conditions implied or imposed by law, including the Australian Consumer Law (or any
            liability under them) which by law may not be limited or excluded.
            <br />
            Subject to this clause, and to the extent permitted by law:
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pt: '20px', pb: '20px', color: '#000' }}
            >
              (i) all terms, guarantees, warranties, representations or conditions which are not
              expressly stated in the Terms are excluded; <br />
              (ii) Flash Innovations will not be liable for any special, indirect or consequential
              loss or damage (unless such loss or damage is reasonably foreseeable resulting from
              our failure to meet an applicable Consumer Guarantee), loss of profit or opportunity,
              or damage to goodwill arising out of or in connection with the Services or these Terms
              (including as a result of not being able to use the Services or the late supply of the
              Services), whether at common law, under contract, tort (including negligence), in
              equity, pursuant to statute or otherwise.
            </Typography>
            Use of Forever Messages and the Services and anything that you post or upload is done so
            at your own risk. Forever Messages will not take responsibility for any breach of
            security. You acknowledge that in using Forever Messages, you take full responsibility
            to ensure that any content uploaded or shared by you is done so in a secure manner.
            Forever Messages does not condone the posting, sharing or uploading of sensitive
            material and you acknowledge that should you choose to do so, you do so at your own
            risk. Everything on Forever Messages and the Services is provided to you "as is" and "as
            available" without warranty or condition of any kind. None of the affiliates, directors,
            officers, employees, agents, contributors and licensors of Flash Innovations make any
            express or implied representation or warranty about the Services or any products or
            Services (including the products or Services of Flash Innovations) referred to on
            Forever Messages. This includes (but is not restricted to) loss or damage you might
            suffer as a result of any of the following:
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pt: '20px', pb: '20px', color: '#000' }}
            >
              (i) failure of performance, error, omission, interruption, deletion, defect, failure
              to correct defects, delay in operation or transmission, computer virus or other
              harmful component, loss of data, communication line failure, unlawful third party
              conduct, or theft, destruction, alteration or unauthorised access to records; <br />
              (ii) the accuracy, suitability or currency of any information on Forever Messages, the
              Services, or any of its Services related products (including third party material and
              advertisements on Forever Messages) <br />
              (iii) costs incurred as a result of you using Forever Messages, the Services or any of
              the products of Flash Innovations; <br />
              (iv) the Services or operation in respect to links which are provided for your
              convenience.
            </Typography>
          </Typography>
          {/* Advantage 4 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Limitation of liability
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            (a) Flash Innovations’ total liability arising out of or in connection with the Services
            or these Terms, however arising, including under contract, tort (including negligence),
            in equity, under statute or otherwise, will not exceed the resupply of the Services to
            you. <br />
            (b) You expressly understand and agree that Flash Innovations, its affiliates,
            employees, agents, contributors and licensors shall not be liable to you for any direct,
            indirect, incidental, special consequential or exemplary damages which may be incurred
            by you, however caused and under any theory of liability. This shall include, but is not
            limited to, any loss of profit (whether incurred directly or indirectly), any loss of
            goodwill or business reputation and any other intangible loss.
          </Typography>
          {/* Advantage 5 */}
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Competitors
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            If you are in the business of providing similar Services for the purpose of providing
            them to users for a commercial gain, whether business users or domestic users, then you
            are a competitor of Flash Innovations. Competitors are not permitted to use or access
            any information or content on Forever Messages. If you breach this provision, Flash
            Innovations will hold you fully responsible for any loss that we may sustain and hold
            you accountable for all profits that you might make from such a breach.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Termination of Contract
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            The Terms will continue to apply until terminated by either you or by Flash Innovations
            as set out below. <br />
            If you want to terminate the Terms, you may do so by:
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pb: '20px', pt: '20px', color: '#000' }}
            >
              (i) notifying Flash Innovations of your intention to terminate; <br />
              (ii) closing your accounts for all of the services which you use, where Flash
              Innovations has made this option available to you.
            </Typography>
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pb: '20px', color: '#000' }}
            >
              Your notice should be sent, in writing, to the email address{' '}
              <span style={{ textDecoration: 'underline', color: '#137EF2' }}>
                info@forevermessages.com.au.
              </span>
            </Typography>
            <Typography
              paragraph
              sx={{ fontSize: '18px', fontWeight: 300, pb: '20px', color: '#000' }}
            >
              Flash Innovations may at any time, terminate the Terms with you if: <br /> <br />
              (i) you have breached any provision of the Terms or intend to breach any provision;{' '}
              <br />
              (ii) Flash Innovations is required to do so by law; <br />
              (iii) the provision of the Services to you by Flash Innovations is, in the opinion of
              Flash Innovations, no longer commercially viable. <br /> <br />
              Subject to local applicable laws, Flash Innovations reserves the right to discontinue
              or cancel your membership at any time and may suspend or deny, in its sole discretion,
              your access to all or any portion of Forever Messages or the Services without notice
              if you breach any provision of the Terms or any applicable law or if your conduct
              impacts Flash Innovations’ name or reputation or violates the rights of those of
              another party.
            </Typography>
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Indemnity
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            You agree to indemnify Flash Innovations, its affiliates, employees, agents,
            contributors, third party content providers and licensors from and against: <br />
            <br />
            (a) all actions, suits, claims, demands, liabilities, costs, expenses, loss and damage
            (including legal fees on a full indemnity basis) incurred, suffered or arising out of or
            in connection with your content;
            <br />
            (b) any direct or indirect consequences of you accessing, using or transacting on
            Forever Messages or attempts to do so; and/or <br />
            (c) any breach of the Terms.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Dispute Resolution
            <Typography
              sx={{
                fontWeight: '600',
                pb: '10px',
                fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
              }}
            >
              Compulsory:
            </Typography>
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            If a dispute arises out of or relates to the Terms, either party may not commence any
            Tribunal or Court proceedings in relation to the dispute, unless the following clauses
            have been complied with (except where urgent interlocutory relief is sought).
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Notice:
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            A party to the Terms claiming a dispute (the ‘Dispute’) has arisen under the Terms, must
            give written notice to the other party detailing the nature of the Dispute, the desired
            outcome and the action required to settle the Dispute.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Resolution:
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            (a) On receipt of that notice (the ‘Notice’) by that other party, within 28 days of the
            Notice, the parties to the Terms (the ‘Parties’) must endeavour in good faith to resolve
            the Dispute expeditiously by negotiation or such other means upon which they may
            mutually agree. <br />
            (b) If for any reason whatsoever, 28 days after the date of the Notice, the Dispute has
            not been resolved, the Parties must either agree upon selection of a mediator or request
            that an appropriate mediator be appointed by the Australian Mediation Association.
            <br />
            (c) The Parties are equally liable for the fees and reasonable expenses of a mediator
            and the cost of the venue of the mediation and without limiting the foregoing undertake
            to pay any amounts requested by the mediator as a precondition to the mediation
            commencing. The Parties must each pay their own costs associated with the mediation.
            <br />
            (d) The mediation will be held in Sydney, Australia.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Confidential
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            All communications concerning negotiations made by the Parties arising out of and in
            connection with this dispute resolution clause are confidential and to the extent
            possible, must be treated as "without prejudice" negotiations for the purpose of
            applicable laws of evidence.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Termination of Mediation:
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            If 2 months have elapsed after the start of a mediation of the Dispute and the Dispute
            has not been resolved, either Party may ask the mediator to terminate the mediation and
            the mediator must do so.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Venue and Jurisdiction
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            The Services offered by Flash Innovations are intended to be provided to residents of
            Australia. In the event of any Dispute arising out of or in relation to Forever
            Messages, you agree that the exclusive venue for resolving any Dispute shall be in the
            courts of New South Wales, Australia.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Governing Law
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            The Terms are governed by the laws of New South Wales, Australia. Any dispute,
            controversy, proceeding or claim of whatever nature arising out of or in any way
            relating to the Terms and the rights created hereby shall be governed, interpreted and
            construed by, under and pursuant to the laws of New South Wales, Australia, without
            reference to conflict of law principles, notwithstanding mandatory rules. The validity
            of this governing law clause is not contested. The Terms shall be binding to the benefit
            of the parties hereto and their successors and assigns.
          </Typography>
          <Typography
            sx={{
              fontWeight: '600',
              pb: '10px',
              fontSize: { xs: '18px', sm: '22px', md: '26px', color: '#000' },
            }}
          >
            Severance
          </Typography>
          <Typography
            paragraph
            sx={{ fontSize: '18px', fontWeight: 300, mb: '30px', color: '#000' }}
          >
            If any part of these Terms is found to be void or unenforceable by a Court of competent
            jurisdiction, that part shall be severed and the rest of the Terms shall remain in
            force.
          </Typography>
        </Box>
      </Container>
      <Box>
        <img src="/assets/about.svg" alt="" />
      </Box>
    </>
  );
}

export default Terms;
