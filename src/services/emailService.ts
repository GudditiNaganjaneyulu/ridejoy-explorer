
interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export const emailService = {
  sendEmail: (emailData: EmailData): boolean => {
    // This is a mock implementation - in a real app, you would integrate 
    // with an email service provider API like SendGrid, Mailgun, etc.
    console.log('Sending email:', emailData);
    
    // Store sent emails in localStorage for demo purposes
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    sentEmails.push({
      ...emailData,
      sentAt: new Date().toISOString()
    });
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
    
    // In a real implementation, you would return success based on the API response
    return true;
  },
  
  getSentEmails: (): (EmailData & { sentAt: string })[] => {
    const sentEmails = localStorage.getItem('sentEmails');
    return sentEmails ? JSON.parse(sentEmails) : [];
  }
};
