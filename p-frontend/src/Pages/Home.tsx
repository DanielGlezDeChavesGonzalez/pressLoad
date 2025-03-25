// import userFoto from "../assets/userimage.webp"
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import User from "./User";

export default function Home(){

    // const imageSrc = "../assets/userimage.webp";

    return(
        <div className="flex flex-col justify-between">
            {/* <Header imageSrc={userFoto}/> */}
            <Header />
            <User/>
            <Footer />
        </div>
    )
    
}