const CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789";
const NUMBER_OF_CHARACTERS = CHARACTERS.length;

// Generates a random string with the given length. If no length is given, defaults to 4 characters.
export default function randomString(length = 4) {
  let string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * NUMBER_OF_CHARACTERS);
    string += CHARACTERS[randomIndex];
  }
  return string;
}
