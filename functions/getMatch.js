// Keyword match function used in search

export function getMatch(target, keyword) {
  let a = null;
  let b = null;

  const charsToRemove = " -*+?.,\\^$|#";
  const regex = new RegExp(`[${charsToRemove}]`, "g");

  const reduce = (str) =>
    str
      .toLowerCase()
      .replace(regex, "")
      .replace(/-/g, "")
      .replace(/Ä/g, "ae")
      .replace(/ä/g, "ae")
      .replace(/Ö/g, "oe")
      .replace(/ö/g, "oe")
      .replace(/Ü/g, "ue")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/ç/g, "c")
      .replace(/ñ/g, "n");

  if (target) {
    a = reduce(target);
  }
  if (keyword) {
    b = reduce(keyword);
  }
  return a?.includes(b);
}
