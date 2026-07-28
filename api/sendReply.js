import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  try {
    const result = await resend.emails.send({
      from: "Nitish Mandal <admin@nitishmandal.site>",
      to,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:25px;border:1px solid #e5e7eb;border-radius:12px">

          <h2 style="color:#4F46E5;margin-bottom:20px">
            Reply from Nitish Mandal
          </h2>

          <p style="font-size:16px;line-height:1.7;color:#333">
            ${message.replace(/\n/g, "<br>")}
          </p>

          <hr style="margin:30px 0">

          <p style="font-size:15px;color:#666">
            Regards,
          </p>

          <h3 style="margin:0;color:#111827">
            Nitish Mandal
          </h3>

          <p style="margin:4px 0;color:#6B7280">
            Full Stack Developer
          </p>

          <a
            href="https://nitishmandal.site"
            style="
              display:inline-block;
              margin-top:18px;
              padding:10px 18px;
              background:#4F46E5;
              color:white;
              text-decoration:none;
              border-radius:8px;
            "
          >
            Visit Portfolio
          </a>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
      data: result,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to send email.",
      error: error.message,
    });
  }
}