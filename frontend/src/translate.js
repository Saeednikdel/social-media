import React from "react";
import fa from "./assets/fa";
export default function translate(text) {
  let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "en";
  if (localStorage.getItem("lang") == null) {
    localStorage.setItem("lang", "en");
  }
  switch (lang) {
    case "en":
      return text;
    case "fa":
      return fa[text];
    default:
      break;
  }
}
