// utils/email.js
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOTPEmail(toEmail, toName, otpCode) {
  const fromName  = process.env.EMAIL_FROM_NAME || 'Road Rock Holdings Admin';
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  const { error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to:   [toEmail],
    subject: 'Your Road Rock Holdings Admin OTP Code',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { margin:0; padding:0; background:#0a0a0a; font-family:'Segoe UI',Arial,sans-serif; }
    .wrap { max-width:520px; margin:40px auto; background:#111; border:1px solid rgba(201,168,76,0.2); }
    .header { background:linear-gradient(135deg,#c9a84c,#9a7a30); padding:28px 36px; }
    .header h1 { margin:0; font-size:18px; font-weight:900; color:#0a0a0a; letter-spacing:2px; text-transform:uppercase; }
    .body { padding:36px; }
    .body p { color:rgba(255,255,255,0.7); font-size:14px; line-height:1.7; margin:0 0 16px; }
    .otp-box { background:#1a1a1a; border:1px solid rgba(201,168,76,0.3); padding:24px; text-align:center; margin:28px 0; }
    .otp-code { font-size:42px; font-weight:900; color:#c9a84c; letter-spacing:10px; display:block; }
    .otp-label { font-size:11px; color:rgba(255,255,255,0.4); letter-spacing:3px; text-transform:uppercase; margin-top:8px; display:block; }
    .expiry { background:rgba(201,168,76,0.06); border-left:3px solid #c9a84c; padding:14px 16px; font-size:13px; color:rgba(255,255,255,0.6); }
    .footer { border-top:1px solid rgba(255,255,255,0.06); padding:20px 36px; font-size:11px; color:rgba(255,255,255,0.25); }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>Road Rock Holdings — Admin Access</h1>
    </div>
    <div class="body">
      <p>Hello <strong style="color:#fff">${toName}</strong>,</p>
      <p>You requested a password reset for your admin account. Use the code below to continue:</p>
      <div class="otp-box">
        <span class="otp-code">${otpCode}</span>
        <span class="otp-label">One-Time Password</span>
      </div>
      <div class="expiry">
        ⏱ This code <strong style="color:#c9a84c">expires in 10 minutes</strong> and is valid for one use only.
      </div>
      <p style="margin-top:24px">If you did not request this, please ignore this email and contact your system administrator immediately.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Road Rock Holdings. This is an automated security email — do not reply.
    </div>
  </div>
</body>
</html>`,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error(error.message);
  }
  console.log(`📧 OTP email sent to ${toEmail}`);
}

async function sendPendingNotification(toEmail, toName, authorName, page) {
  const fromName  = process.env.EMAIL_FROM_NAME || 'Road Rock Holdings Admin';
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to:   [toEmail],
    subject: `Action Required: ${authorName} submitted changes for approval`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family:'Segoe UI',Arial,sans-serif; background:#0a0a0a; margin:0; padding:0; }
    .wrap { max-width:520px; margin:40px auto; background:#111; border:1px solid rgba(201,168,76,0.2); }
    .header { background:linear-gradient(135deg,#c9a84c,#9a7a30); padding:24px 32px; }
    .header h1 { margin:0; font-size:16px; font-weight:900; color:#0a0a0a; letter-spacing:1px; text-transform:uppercase; }
    .body { padding:32px; color:rgba(255,255,255,0.75); font-size:14px; line-height:1.7; }
    .info { background:#1a1a1a; border-left:3px solid #c9a84c; padding:16px 20px; margin:20px 0; }
    .info span { color:#c9a84c; font-weight:700; }
    .footer { border-top:1px solid rgba(255,255,255,0.06); padding:16px 32px; font-size:11px; color:rgba(255,255,255,0.25); }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header"><h1>Pending Changes — Approval Required</h1></div>
    <div class="body">
      <p>Hello <strong style="color:#fff">${toName}</strong>,</p>
      <p><strong style="color:#fff">${authorName}</strong> has submitted changes that require your review and approval before they are published.</p>
      <div class="info">
        <p style="margin:0"><span>Submitted by:</span> ${authorName}</p>
        <p style="margin:8px 0 0"><span>Page:</span> ${page}</p>
      </div>
      <p>Please log in to the admin panel to review, approve, or reject these changes.</p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Road Rock Holdings Admin System</div>
  </div>
</body>
</html>`,
  });
}

module.exports = { sendOTPEmail, sendPendingNotification };