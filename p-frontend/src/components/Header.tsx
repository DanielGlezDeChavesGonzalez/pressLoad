import logo from "../assets/logo.jpg"

interface ChildProps {
  imageSrc: string;
  altText?: string; // Opcional
}


export default function header({imageSrc, altText = "Image profile"}:ChildProps){
  return(
    <>
    <img src={imageSrc} alt={altText} className="w-40 h-40 object-cover rounded-lg" />
    <img src={logo} />
    </>
  )
}