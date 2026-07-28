import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
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
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${subject}</title>
</head>

<body style="
margin:0;
padding:40px 20px;
background:#f3f4f6;
font-family:Arial,Helvetica,sans-serif;
">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tr>
<td align="center">

<table
role="presentation"
width="650"
cellpadding="0"
cellspacing="0"
style="
max-width:650px;
width:100%;
background:#ffffff;
border-radius:18px;
overflow:hidden;
border:1px solid #e5e7eb;
box-shadow:0 10px 30px rgba(0,0,0,.08);
">

<!-- Header -->

<tr>
<td
style="
background:#4F46E5;
padding:40px;
text-align:center;
">

<img
src="https://www.nitishmandal.site/logo.png"
width="75"
alt="Nitish Mandal"
style="display:block;margin:auto;"
>

<h1 style="
margin:18px 0 8px;
color:white;
font-size:30px;
font-weight:bold;
">
Nitish Mandal
</h1>

<p style="
margin:0;
color:#E0E7FF;
font-size:16px;
">
Full Stack Developer • Firebase • AI Systems
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:45px;">

<h2 style="
margin-top:0;
color:#4F46E5;
font-size:28px;
">
Thank you for contacting me 👋
</h2>

<p style="
font-size:17px;
line-height:1.8;
color:#374151;
margin-bottom:30px;
">
${message.replace(/\n/g, "<br>")}
</p>

<hr
style="
border:none;
border-top:1px solid #E5E7EB;
margin:35px 0;
">

<p style="
margin:0;
font-size:17px;
color:#6B7280;
">
Regards,
</p>

<h2 style="
margin:12px 0 5px;
color:#111827;
">
Nitish Mandal
</h2>

<p style="
margin:0;
color:#6B7280;
font-size:16px;
">
Full Stack Developer
</p>

<div style="margin-top:35px;">

<a
href="https://www.nitishmandal.site"
style="
display:inline-block;
padding:14px 28px;
background:#4F46E5;
color:white;
text-decoration:none;
border-radius:10px;
font-weight:bold;
font-size:16px;
">
Visit Portfolio →
</a>

</div>

</td>
</tr>

<!-- Footer -->

<tr>
<td
style="
background:#F9FAFB;
padding:30px;
text-align:center;
border-top:1px solid #E5E7EB;
">

<p style="
margin:0;
font-size:15px;
color:#6B7280;
">
© ${new Date().getFullYear()} Nitish Mandal
</p>

<p style="
margin:12px 0;
">

<a
href="https://www.nitishmandal.site"
style="
color:#4F46E5;
text-decoration:none;
margin:0 8px;
font-weight:bold;
">
Portfolio
</a>

|

<a
href="https://github.com/mandalnitish"
style="
color:#4F46E5;
text-decoration:none;
margin:0 8px;
font-weight:bold;
">
GitHub
</a>

|

<a
href="https://www.linkedin.com/in/mandalnitish/"
style="
color:#4F46E5;
text-decoration:none;
margin:0 8px;
font-weight:bold;
">
LinkedIn
</a>

</p>

<p style="
margin-top:15px;
font-size:13px;
color:#9CA3AF;
line-height:1.6;
">
This email was sent from the official website of
<strong>nitishmandal.site</strong>.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
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