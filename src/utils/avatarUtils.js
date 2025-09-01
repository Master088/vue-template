export const getAvatarLabel = (firstname, lastname) => {
  const sanitizeName = (name) => name?.replace(/[^a-zA-Z\s]/g, " ") || "";

  const sanitizedFirstName = sanitizeName(firstname);
  const sanitizedLastName = sanitizeName(lastname);

  const firstNameInitials =
    sanitizedFirstName
      .split(" ")
      .map((part) => part.charAt(0))
      .join("") || "";

  const lastNameInitial = sanitizedLastName.charAt(0) || "";

  const label = `${firstNameInitials}${lastNameInitial}`;

  return label.slice(0, 3);
};
