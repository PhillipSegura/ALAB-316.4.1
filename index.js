function validate(evt) {
  const nameVal = validateName();
  if (nameVal === false) {
    evt.returnValue = false;
    return false;
  }

  const emailVal = validateEmail();
  if (emailVal === false) {
    evt.returnValue = false;
    return false;
  }

  const countryVal = validateCountry();
  if (countryVal === false) {
    evt.returnValue = false;
    return false;
  }

  const zipVal = validateZipCode();
  if (zipVal === false) {
    evt.returnValue = false;
    return false;
  }

  const passwordVal = validatePassword();
  if (passwordVal === false) {
    evt.returnValue = false;
    return false;
  }

  alert(`Name: ${nameVal}
        Email: ${emailVal}
        Country: ${countryVal}
        Zip Code: ${zipVal}
        Password: ...that's a secret`);

  return true;
}
