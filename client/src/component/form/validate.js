export default function Validate(input) {
  const errors = {};
  if (input.name < 2) errors.name = 'El nombre debe contener mas de una letra.';
  if (input.rating > 5 || input.rating < 0)
    errors.rating = 'El rating debe estar entre 0 y 5.';
  if (!input.description)
    errors.description = 'Se debe ingresar una descripcion.';
  return errors;
}
