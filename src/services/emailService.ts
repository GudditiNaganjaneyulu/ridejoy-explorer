
import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

// Configuration for Brevo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_USER || 'your-brevo-username',
    pass: process.env.BREVO_SMTP_PASSWORD || 'your-brevo-password',
  },
});

export const emailService = {
  sendEmail: async (emailData: EmailData): Promise<boolean> => {
    try {
      // For development/testing, console log the email
      console.log('Sending email:', emailData);
      
      // Local storage fallback for development
      if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASSWORD) {
        console.log('Email credentials not found, using localStorage fallback');
        const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
        sentEmails.push({
          ...emailData,
          sentAt: new Date().toISOString()
        });
        localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
        return true;
      }

      // Send email using Brevo SMTP
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@ridejoy.com',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.body,
      };

      await transporter.sendMail(mailOptions);
      
      // Store record of sent email in MongoDB (will be implemented in future)
      // This would typically be handled by a backend service
      
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  },
  
  getSentEmails: (): (EmailData & { sentAt: string })[] => {
    // This is a temporary fallback until MongoDB integration is complete
    const sentEmails = localStorage.getItem('sentEmails');
    return sentEmails ? JSON.parse(sentEmails) : [];
  }
};
