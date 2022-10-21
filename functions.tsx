export const slugify = (text: string) => {
  var trMap: any = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  };
  for (var key in trMap) {
    text = text.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
  }
  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, "")
    .replace(/\s/gi, "")
    .replace(/[-]+/gi, "")
    .toLowerCase();
};
