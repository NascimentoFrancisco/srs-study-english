import Exercise from '../../components/exercise';
import './style.css';
import { IoMdAddCircle } from "react-icons/io";

function Home(){
    
    //Thank you so much for coming here to help me.
    return (
        <main>
            <div className="header_home">
                <h3>Exercícios pendentes</h3>
                <a className="add_icon">
                    <IoMdAddCircle size={30}/>
                </a>
            </div>
            
            <Exercise textToAadio="I love car." />
            
        </main>
    )
}

export default Home;
