const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const truncateWord = (str, n, useWordBoundary = true) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};

const showSize = (text) => {
  text = parseInt(text);
  var kb = 1024;
  var mb = kb * 1000;
  var gb = mb * 1000;
  var roundedNormal = Math.round(text * 100) / 100;
  var roundedKb = Math.round((text / kb) * 100) / 100;
  var roundedMb = Math.round((text / mb) * 100) / 100;
  var roundedGb = Math.round((text / gb) * 100) / 100;
  if (roundedNormal < kb) {
    return roundedNormal + "B";
  } else if (roundedNormal >= kb && roundedNormal < mb) {
    return roundedKb + "Kb";
  } else if (roundedNormal > kb && roundedNormal >= mb && roundedNormal < gb) {
    return roundedMb + "Mb";
  } else if (roundedNormal > kb && roundedNormal > mb && roundedNormal >= gb) {
    return roundedGb + "Gb";
  }
};
export { truncateWord, decodeHtml, showSize };
