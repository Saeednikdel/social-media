const reUrl = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/gi;
const reHash = /(?:^|\s)(#[^\s#]+|[^\s#]+#)(?=$|\s)/g;
const reAt = /(?:\s|^)?@[A-Za-z0-9\-\.\_]+(?:\s|$)/g;

export default function (text, job) {
  const hash_url = job
    ? `${process.env.REACT_APP_API_URL}/jobs`
    : `${process.env.REACT_APP_API_URL}`;
  const at_url = `${process.env.REACT_APP_API_URL}/profile`;
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
      reAt,
      (at) =>
        `<a class="tag" href="${at_url}/${at
          .replace("@", "")
          .trim()}">${at}</a>`
    )
    .replace(
      reHash,
      (hash) =>
        `<a class="tag" href="${hash_url}?keyword=${hash
          .replace("#", "")
          .trim()}">${hash}</a>`
    );
}
