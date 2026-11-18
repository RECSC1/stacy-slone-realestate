import type { FormName } from '@/config/forms';

export function NetlifyFields({name}: {name: FormName}) {
  return <>
    <input type="hidden" name="form-name" value={name} />
    <p hidden aria-hidden="true">
      <label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
    </p>
  </>;
}
