// Run this script to get your Spotify Refresh Token
// Usage: node scripts/get-spotify-token.js

const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your Spotify Client ID
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // Replace with your Spotify Client Secret
const REDIRECT_URI = 'http://localhost:3000/api/callback';

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ');

const params = new URLSearchParams({
  client_id: CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  scope: scopes,
});

console.log('\n🎵 Spotify Authorization Helper\n');
console.log('1. Open this URL in your browser:\n');
console.log(`https://accounts.spotify.com/authorize?${params.toString()}\n`);
console.log('2. After authorizing, you will be redirected to a URL like:');
console.log('   http://localhost:3000/api/callback?code=XXXXX\n');
console.log('3. Copy the "code" parameter from that URL and paste it below.\n');

// If running interactively
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter the code: ', async (code) => {
  if (!code) {
    console.error('❌ No code provided');
    readline.close();
    return;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (data.refresh_token) {
      console.log('\n✅ Success! Add these to your .env.local file:\n');
      console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    } else {
      console.error('❌ Error:', data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  readline.close();
});

