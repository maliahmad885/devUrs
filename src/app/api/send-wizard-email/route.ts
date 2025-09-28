import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    console.log('Received form data:', data)
    console.log('Environment variables check:')
    console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER)
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)
    console.log('EMAIL_USER value:', process.env.EMAIL_USER)
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length)

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service not configured. Please contact support.' 
        },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "m.aliahmadm875@gmail.com",
        pass: "utik fsbb ookb irnw"
      }
    })

    // Format the email content
    const emailContent = `
New Client Project Consultation Request

=== BASIC INFORMATION ===
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'Individual/Freelancer'}

=== BUSINESS DETAILS ===
Business Type: ${data.businessType}
Industry: ${data.industry}
Team Size: ${data.teamSize}
Current Challenges: ${data.currentChallenges.join(', ')}

=== DEVELOPMENT GOALS & VISION ===
Development Goals: ${data.aiGoals.join(', ')}
Specific Use Case: ${data.specificUseCase}
Project Priority: ${data.automationPriority}

=== BUDGET & TIMELINE ===
Budget Range: ${data.budget}
Timeline: ${data.timeline}
Additional Information: ${data.additionalInfo}

=== SUBMISSION DETAILS ===
Submitted: ${new Date().toLocaleString()}
IP Address: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}

---
This email was sent from the DevUrs website project consultation wizard.
    `

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'maanali348@gmail.com',
      subject: `New Project Consultation Request - ${data.firstName} ${data.lastName} (${data.company || 'Individual'})`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7661FB; border-bottom: 2px solid #7661FB; padding-bottom: 10px;">
            New Client Project Consultation Request
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #F85B5D; margin-top: 0;">Basic Information</h3>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Company:</strong> ${data.company || 'Individual/Freelancer'}</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #F85B5D; margin-top: 0;">Business Details</h3>
            <p><strong>Business Type:</strong> ${data.businessType}</p>
            <p><strong>Industry:</strong> ${data.industry}</p>
            <p><strong>Team Size:</strong> ${data.teamSize}</p>
            <p><strong>Current Challenges:</strong> ${data.currentChallenges.join(', ')}</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #F85B5D; margin-top: 0;">Development Goals & Vision</h3>
            <p><strong>Development Goals:</strong> ${data.aiGoals.join(', ')}</p>
            <p><strong>Specific Use Case:</strong> ${data.specificUseCase}</p>
            <p><strong>Project Priority:</strong> ${data.automationPriority}</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #F85B5D; margin-top: 0;">Budget & Timeline</h3>
            <p><strong>Budget Range:</strong> ${data.budget}</p>
            <p><strong>Timeline:</strong> ${data.timeline}</p>
            <p><strong>Additional Information:</strong> ${data.additionalInfo}</p>
          </div>

          <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 12px; color: #6c757d;">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}</p>
            <p><strong>User Agent:</strong> ${request.headers.get('user-agent') || 'Unknown'}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <p style="color: #6c757d; font-size: 12px; text-align: center;">
            This email was sent from the DevUrs website project consultation wizard.
          </p>
        </div>
      `
    }

    // Send email
    console.log('Attempting to send email...')
    console.log('Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })
    
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    )
  }
}
