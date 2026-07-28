require("dotenv").config();

const { setGlobalOptions } = require("firebase-functions/v2");
const { onCall } = require("firebase-functions/v2/https");
const { Resend } = require("resend");

setGlobalOptions({
  maxInstances: 10,
});

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendReply = onCall(async (request) => {
  const { to, subject, message } = request.data;

  if (!to || !subject || !message) {
    throw new Error("Missing required fields.");
  }

  try {
    const result = await resend.emails.send({
      from: "Nitish Mandal <admin@nitishmandal.site>",
      to: [to],
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Hello,</h2>

          <p>${message.replace(/\n/g, "<br>")}</p>

          <hr style="margin:30px 0;" />

          <p>
            Regards,<br />
            <strong>Nitish Mandal</strong><br />
            Full Stack Developer
          </p>
        </div>
      `,
    });

    return {
      success: true,
      id: result.data?.id ?? null,
    };
  } catch (error) {
    console.error("Resend Error:", error);

    throw new Error("Unable to send email.");
  }
});