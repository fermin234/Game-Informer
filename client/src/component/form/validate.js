export default function Validate(input) {
  const errors = {};
  if (input.name < 2)
    errors.name = "The name must contain more than one letter.";
  if (!input.description) errors.description = "A description must be entered.";
  if (
    input.rating > 5 ||
    input.rating < 0 ||
    input.rating === null ||
    input.rating === ""
  )
    errors.rating = "The rating must be between 0 and 5.";
  if (!input.genres.length)
    errors.genres = "Choose at least one genre for the video game.";
  return errors;
}
