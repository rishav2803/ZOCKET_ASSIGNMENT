import Input from "../Components/Input";
import Divider from "../UI/Divider";
import ColorPicker from "../Components/ColorPicker";
import { TemplateContext } from "../Contexts/TemplateContext";
import { useContext } from "react";

export default function CustomizationSection({}) {
  const { setImgUrl } = useContext(TemplateContext);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgUrl(imageUrl);
    }
  }

  return (
    <section className="w-full">
      <div>
        <h1 className="font-bold text-center mb-[.5rem] mt-[3rem] text-xl">
          Ad Customization
        </h1>
        <h2 className="text-center text-slate-400">
          Customise your ad and get the template accordingly
        </h2>
      </div>
      <div className="mt-10 ml-10">
        <input type="file" onChange={handleImageChange} />
      </div>
      <Divider />
      <Input label={"Ad Customization"} />
      <Input label={"CTA"} />
      <ColorPicker />
    </section>
  );
}
