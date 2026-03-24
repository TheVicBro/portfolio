import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  message: string;
};

const MAX_LEN = 5000;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  const { name, email, company, inquiry } = req.body ?? {};

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(company) ||
    !isNonEmptyString(inquiry)
  ) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  if (
    name.length > MAX_LEN ||
    email.length > MAX_LEN ||
    company.length > MAX_LEN ||
    inquiry.length > MAX_LEN
  ) {
    res.status(400).json({ message: 'Input too long' });
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    res.status(400).json({ message: 'Invalid email address' });
    return;
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASSWORD;
  if (!gmailUser || !gmailPass) {
    res.status(503).json({ message: 'Contact form is temporarily unavailable' });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const mailOptions = {
    from: gmailUser,
    to: gmailUser,
    subject: `New Contact Inquiry from ${name.trim()}`,
    text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nCompany: ${company.trim()}\n\nInquiry:\n${inquiry.trim()}`,
    replyTo: email.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
}
