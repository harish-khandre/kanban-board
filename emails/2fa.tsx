import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BreeditTFACodeEmailProps {
  token?: string;
}

export const TwoFA = ({ token }: BreeditTFACodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your 2FA code for Breedit</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://imgur.com/hgn8JNF.png`}
          width="42"
          height="42"
          alt="Linear"
          style={logo}
        />
        <Heading style={heading}>Your 2FA code for Breedit</Heading>
        <Text style={paragraph}>
          This link and code will only be valid for the next 15 minutes. If the
          link does not work, you can use the login verification code directly:
        </Text>
        <code style={code}>{token}</code>
        <Hr style={hr} />
        <Link href="https://breedit.co.in" style={reportLink}>
          Breedit
        </Link>
      </Container>
    </Body>
  </Html>
);

export default TwoFA;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
