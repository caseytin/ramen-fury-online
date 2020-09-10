const CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789";

// Generates a random string with the given length. If no length is given, defaults to 4 characters.
export default function randomString(length: number = 4): string {
  let string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    string += CHARACTERS[randomIndex];
  }
  return string;
}
