import React, { useState } from "react";
import { templateData } from "../Utils/template";

export const TemplateContext = React.createContext();

export function TemplateProvider({ children }) {
  const [caption, setCaption] = useState(templateData.caption.text);
  const [cta, setCta] = useState(templateData.cta.text);
  const [color, setColor] = useState("#0369A1");
  const [imgUrl, setImgUrl] = useState(
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1"
  );

  const value = {
    caption,
    cta,
    color,
    imgUrl,
    setCaption,
    setCta,
    setColor,
    setImgUrl,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}
