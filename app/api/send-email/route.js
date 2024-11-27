// app/api/send-email/route.js

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
  const { email, locale } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Load the terms PDF based on locale
  const pdfPath = path.join(process.cwd(), 'public', `terms-${locale}.pdf`);

  // Check if the PDF file exists
  if (!fs.existsSync(pdfPath)) {
    return NextResponse.json({ error: 'Terms PDF not found' }, { status: 404 });
  }

  // Create a transporter object using SMTP credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Himalaya Investments" <tslilalon@gmail.com>',
      to: email,
      subject: 'Himalaya Investments Terms and Conditions',
      text: 'Please find the attached terms and conditions.',
      attachments: [
        {
          filename: `terms-${locale}.pdf`,
          path: pdfPath,
        },
      ],
    });

    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}