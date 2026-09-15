/**
 * Fach-Auswahl: ein echtes <select> mit allen bekannten Fächern plus der
 * Möglichkeit, ein neues einzutippen.
 *
 * Ein <datalist> wäre kürzer, zeigt auf iPhone und iPad aber keine Liste –
 * darum hier ein Auswahlmenü, das überall funktioniert.
 */

import { el } from '../lib/dom.js';

const NEW_VALUE = '__new__';

/**
 * @param {{id: string, subjects: Array<{name: string}>, value?: string, onChange?: Function}} options
 * @returns {{element: Node, control: HTMLElement, getValue: Function}}
 */
export function subjectPicker({ id, subjects, value = '', onChange = () => {} }) {
  const known = subjects.map((subject) => subject.name);
  // Ein Fach, das es in der Liste (noch) nicht gibt, bleibt erhalten.
  const names = value && !known.some((name) => name.toLowerCase() === value.toLowerCase())
    ? [value, ...known]
    : known;

  const select = el('select', { class: 'select', id, name: 'subject' }, [
    el('option', { value: '', text: 'Fach wählen …', selected: !value }),
    ...names.map((name) => el('option', { value: name, text: name, selected: name === value })),
    el('option', { value: NEW_VALUE, text: '+ Neues Fach …' }),
  ]);

  const newInput = el('input', {
    class: 'input',
    id: `${id}-new`,
    type: 'text',
    placeholder: 'Name des neuen Fachs',
    maxLength: 40,
    autocomplete: 'off',
    hidden: true,
    style: { marginTop: 'var(--space-2)' },
  });

  const getValue = () => (select.value === NEW_VALUE ? newInput.value.trim() : select.value.trim());

  select.addEventListener('change', () => {
    const isNew = select.value === NEW_VALUE;
    newInput.hidden = !isNew;
    if (isNew) newInput.focus();
    else newInput.value = '';
    onChange(getValue());
  });

  newInput.addEventListener('input', () => onChange(getValue()));

  return {
    element: el('div', {}, [select, newInput]),
    control: select,
    getValue,
  };
}
