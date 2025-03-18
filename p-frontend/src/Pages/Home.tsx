import userFoto from "../assets/userimage.webp"
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Home(){

    // const imageSrc = "../assets/userimage.webp";

    return(
        <>
        <Header imageSrc={userFoto}/>
        <Footer />
        </>
    )
    
}