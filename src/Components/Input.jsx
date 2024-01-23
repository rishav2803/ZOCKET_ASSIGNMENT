import { useContext, useState } from "react";
import { TemplateContext } from "../Contexts/TemplateContext";
import { templateData } from "../Utils/template";

export default function Input({ label }) {
  const { setCta, setCaption } = useContext(TemplateContext);

  function changeHandler(e) {
    let val = e.target.value;
    if (label === "CTA") {
      setCta(val);
    } else {
      setCaption(val);
    }
  }

  return (
    <div className="mt-4 relative w-[90%] mx-auto">
      <input
        id="adContent"
        type="text"
        className={`shadow appearance-none border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline ${"border-gray-300"}`}
        placeholder=" "
        onChange={changeHandler}
      />
      <label
        htmlFor="adContent"
        className={`absolute left-3 transition-all  ${"top-0 text-sm text-slate-400"}`}
      >
        {label}
      </label>
    </div>
  );
}
