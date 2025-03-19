// import userFoto from "../assets/userimage.webp"
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Home(){

    // const imageSrc = "../assets/userimage.webp";

    return(
        <div className="flex flex-col justify-between">
            {/* <Header imageSrc={userFoto}/> */}
            <Header />
            <div className="flex flex-grow mb-auto h-100vh text-amber-50">
                User info
            </div>
            <Footer />
        </div>
    )
    
}