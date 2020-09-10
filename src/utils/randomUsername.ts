const MODIFIERS = ["Spicy", "Shio", "Shoyu", "Miso", "Tonkotsu", "Instant"];
const NOUNS = ["Tsukemen", "Ramen", "Udon"];

export default function randomUsername(): string {
  const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  return `${modifier} ${noun}`;
}
