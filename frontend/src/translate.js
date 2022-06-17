import React from "react";
import fa from "./assets/fa";
import so from "./assets/so";
import ku from "./assets/ku";
import tr from "./assets/tr";
import ar from "./assets/ar";
export default function translate(text) {
  let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "en";
  localStorage.getItem("lang") == null && localStorage.setItem("lang", "en");

  switch (lang) {
    case "fa":
      return fa[text];
    case "so":
      return so[text];
    case "ku":
      return ku[text];
    case "tr":
      return tr[text];
    case "ar":
      return ar[text];
    case "en":
      return text;
    default:
      return text;
  }
}
