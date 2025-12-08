import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS,
      toEmail: process.env.CONTACT_FORM_TO_EMAIL,
      bccEmail: process.env.CONTACT_FORM_BCC_EMAIL
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toEmail = process.env.CONTACT_FORM_TO_EMAIL || process.env.SMTP_TO;
    const bccEmail = process.env.CONTACT_FORM_BCC_EMAIL;

    if (!toEmail) {
      console.error('No recipient email configured');
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const mailData = {
      from: `The Innovator <${process.env.SMTP_USER}>`,
      to: toEmail,
      bcc: bccEmail,
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.firstName} ${body.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <div style="margin: 20px 0;">
            <div><strong>First Name:</strong> ${body.firstName || ''}</div>
            <div><strong>Last Name:</strong> ${body.lastName || ''}</div>
            <div><strong>Email:</strong> ${body.email || ''}</div>
            <div><strong>Company:</strong> ${body.company || ''}</div>
            <div><strong>Phone:</strong> ${body.countryCode || ''} ${body.phone || ''}</div>
            <div><strong>Budget Range:</strong> ${body.budget || ''}</div>
          </div>
          <div style="margin-top: 20px;">
            <strong>Message:</strong><br/>
            <p style="white-space: pre-wrap;">${body.message || ''}</p>
          </div>
          <hr style="margin: 20px 0;"/>
          <div style="color: #666; font-size: 12px;">
            This email was sent from the contact form at theinnovator.com.au
          </div>
        </div>
      `,
    };

    console.log('Attempting to send email to:', mailData.to);
    
    try {
      const info = await transporter.sendMail(mailData);
      console.log('Email sent successfully:', info.messageId);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Email sending error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to send email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}