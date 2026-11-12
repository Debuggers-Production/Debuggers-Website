const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Submits a contact/inquiry payload to Web3Forms.
 * Requires VITE_WEB3FORMS_ACCESS_KEY in the environment (.env).
 */
export async function submitToWeb3Forms({ subject, name, email, fields = {} }) {
  const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();

  if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    throw new Error(
      'Web3Forms access key is not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to .env or email debuggerstechs@gmail.com.'
    );
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: subject || 'New Inquiry — Debuggers Technologies',
      from_name: name || 'Website Visitor',
      replyto: email,
      name,
      email,
      ...fields,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(
      data?.message || 'Unable to send your inquiry right now. Please try again or email debuggerstechs@gmail.com.'
    );
  }

  return data;
}

