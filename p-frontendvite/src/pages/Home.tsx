// import userFoto from "../assets/userimage.webp"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home(){

    // const imageSrc = "../assets/userimage.webp";

    return(
        <div className="flex flex-col justify-between">
            {/* <Header imageSrc={userFoto}/> */}
            <Header />
            <Footer />
        </div>
    )
    
}