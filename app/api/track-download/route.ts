import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = new Date().toISOString();
  
  // 1. Log the download. Netlify captures console.logs in your admin dashboard.
  console.log(`[DOWNLOAD SUCCESS] Fast Mouths APK requested at: ${timestamp}`);

  // 2. OPTIONAL: Want a free instant notification on your phone? 
  // You can uncomment this line later and paste a free Discord/Slack webhook URL:
  /*
  await fetch('YOUR_DISCORD_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: `🚀 Someone just downloaded Fast Mouths APK! (${timestamp})` })
  });
  */

  // 3. Seamlessly redirect the browser to pull the actual asset file
  // This points to your public folder asset location
  return NextResponse.redirect(new URL('/downloads/fast-mouths-client.apk', process.env.NEXT_PUBLIC_SITE_URL || 'https://caper-apps.netlify.app'));
}