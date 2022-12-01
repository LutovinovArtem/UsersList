import React, { useState } from "react";

export const useToggleShowPassword = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  const toggleButton = (
    <button type="button" onClick={() => setPasswordShow(!passwordShow)}>
      {passwordShow ? "Cкрыть" : "Показать"}
    </button>
  );

  const passwordType = passwordShow ? "text" : "password";

  return [toggleButton, passwordType];
};
