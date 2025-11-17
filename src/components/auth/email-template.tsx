import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  url: string;
}

const EmailTemplate = ({ firstName, url }: EmailTemplateProps) => {
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "24px",
        width: "100%",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "8px",
        }}
      >
        <tbody>
          <tr>
            <td style={{ padding: "24px", textAlign: "center" }}>
              <h1
                style={{ fontSize: "24px", margin: "0 0 16px", color: "#333" }}
              >
                Welcome, {firstName}!
              </h1>

              <p
                style={{
                  fontSize: "15px",
                  color: "#555",
                  margin: "0 0 20px",
                  lineHeight: "1.5",
                  textAlign: "left",
                }}
              >
                Click the button below to reset your password:
              </p>

              <a
                href={url}
                style={{
                  color: "#0066cc",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Reset your password
              </a>

              <p
                style={{
                  marginTop: "20px",
                  fontSize: "13px",
                  color: "#777",
                  textAlign: "left",
                  lineHeight: "1.4",
                }}
              >
                If you did not request a password reset, please ignore this
                email.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default EmailTemplate;
