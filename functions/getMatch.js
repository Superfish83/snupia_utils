// Keyword match function used in search

function reduce(str) {
  const charsToRemove = " -*+?.,\\^$|#";
  const regex = new RegExp(`[${charsToRemove}]`, "g");
  return str
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
}

export function getMatch(target, keyword) {
  let a = null;
  let b = null;

  if (target) {
    a = reduce(target);
  }
  if (keyword) {
    b = reduce(keyword);
  }
  return a?.includes(b);
}

export function getInstr(keyword) {
  return (
    getMatch(keyword, "교본") ||
    getMatch(keyword, "피아노") ||
    getMatch(keyword, "Inst")
  );
}
