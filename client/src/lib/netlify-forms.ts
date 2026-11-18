import { FORM_ENDPOINT, FORM_FIELDS, type FormName } from '@/config/forms';

export async function submitInquiry(formName: FormName, values: Record<string,string>) {
  const payload = new URLSearchParams({
    'form-name': formName,
    'bot-field': values['bot-field'] ?? '',
    'page-url': window.location.origin + window.location.pathname,
    'submitted-at': new Date().toISOString(),
    'submission-id': crypto.randomUUID(),
  });
  for (const field of FORM_FIELDS[formName]) payload.set(field, values[field] ?? '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: payload.toString(),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('The inquiry was not accepted.');
    const body = await response.text();
    // A returned app shell or registration file is not a submission receipt.
    if (/id=["']root["']|data-form-registration/.test(body)) {
      throw new Error('The form service did not confirm the inquiry.');
    }
  } finally { clearTimeout(timer); }
}
