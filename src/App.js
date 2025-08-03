import React, { useEffect, useState } from 'react';

export default function App() {
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [user, setUser] = useState({ name: "Ashish Kumar", email: "user@example.com" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setClientId(params.get('client_id'));
    setRedirectUri(params.get('redirect_uri'));
  }, []);

  const handleAllow = async () => {
    const response = await fetch("https://your-railway-sso-url/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1, // Hardcoded for demo
        client_id: clientId,
        redirect_uri: redirectUri,
        allow: "yes"
      })
    });

    const html = await response.text();
    document.write(html); // let the server emit the postMessage
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>{clientId} wants to access your profile</h2>
      <p>User: {user.name} ({user.email})</p>
      <button onClick={handleAllow}>Allow</button>
      <button onClick={() => window.close()}>Deny</button>
    </div>
  );
}
