import { serve } from "https://deno.land/std@0.199.0/http/server.ts";
import puppeteer from 'npm:puppeteer'

serve(async (req) => {
  try {
    console.log(`wss://chrome.browserless.io?token=344451d8-0055-4d61-b6f9-596da0bcdc3d`)
    // Visit browserless.io to get your free API token
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=344451d8-0055-4d61-b6f9-596da0bcdc3d`,
    })
    const page = await browser.newPage()

    const url = new URL(req.url).searchParams.get('url') || 'http://localhost:5173/'

    await page.goto(url)
    const screenshot = await page.screenshot()

    return new Response(screenshot, { headers: { 'Content-Type': 'image/png' } })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})