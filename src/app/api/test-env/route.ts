import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS_EXISTS: !!process.env.EMAIL_PASS,
    EMAIL_PASS_LENGTH: process.env.EMAIL_PASS?.length,
    NODE_ENV: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('EMAIL'))
  })
}
