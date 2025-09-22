import { ChangeEvent } from 'react';

import styles from './Checkbox.module.css';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  disabled?: boolean;
}

const Checkbox = ({
  checked,
  onChange,
  id,
  disabled = false,
}: CheckboxProps) => {
  return (
    <input
      type='checkbox'
      id={id}
      className={styles.checkbox}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Checkbox;
