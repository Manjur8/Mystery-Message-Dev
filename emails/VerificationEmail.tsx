import React from 'react';
import { Body, Container, Head, Html, Text } from '@react-email/components';

interface OTPEmailTemplateProps {
  otp: string;
  username: string;
}

const VerificationEmail = ({ otp, username }: OTPEmailTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={h1}>Welcome to Our Service, {username}!</Text>
        <Text style={p}>Thank you for registering with us. To complete your registration, please use the following One-Time Password (OTP):</Text>
        <Text style={otpCode}>{otp}</Text>
        <Text style={p}>This OTP is valid for the next 10 minutes. If you did not request this email, please ignore it.</Text>
        <Text style={p}>Best regards,<br />The Team</Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

const main: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f6f6f6',
  padding: '20px',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const h1: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
};

const p: React.CSSProperties = {
  fontSize: '16px',
  marginBottom: '10px',
  lineHeight: '1.5',
};

const otpCode: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '20px 0',
};
