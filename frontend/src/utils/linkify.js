const reUrl = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/gi;
const reHash = /(?<!\S)#\S+|\S+#(?!\S)/g;
const reAt = /(?:\s|^)?@[A-Za-z0-9\-\.\_]+(?:\s|$)/g;
const hash_url = `${process.env.REACT_APP_API_URL}/search`;
const at_url = `${process.env.REACT_APP_API_URL}/profile`;

export default function (text) {
  return text
    .replace(reUrl, (url) => {
      let newUrl = url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .trim();
      return `<a target="_blank" class="tag" href="//${newUrl}">${newUrl}</a>`;
    })
    .replace(
      reHash,
      (hash) =>
        `<a class="tag" href="${hash_url}?hashtag=${hash
          .replace("#", "")
          .trim()}">${hash}</a>`
    )
    .replace(
      reAt,
      (at) =>
        `<a class="tag" href="${at_url}/${at
          .replace("@", "")
          .trim()}">${at}</a>`
    );
}
