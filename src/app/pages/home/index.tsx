import { useState } from 'react';
import './style.css';
import { IoMdAddCircle } from "react-icons/io";
import { IoStopCircle } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { useSpeech } from "react-text-to-speech";
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

function Home(){
    const [textToAadio, setTextToAudio] = useState("Thank you so much for coming here to help me.");
    const [textAnswers, setTextAnswers] = useState("");
    const [answered, setAnswered] = useState(false);
    const [hitsWithPontuation, setHitsWithPontuation] = useState(0);
    const [hitsWithoutPontuation, setHitsWithoutPontuation] = useState(0);
    const [colorHitsWithPont, setColorHitsWithPont] = useState("#344055");
    const [colorHitsWithoutPont, setColorHitsWithoutPont] = useState("#344055");

    const { Text, speechStatus, start, stop, } = useSpeech({text: textToAadio, lang: "en"});

    const toRespond = () => {
        if (textAnswers && !answered){
            calculateHitRate();
            setAnswered(true);
        }
    }

    const onChageTextAnswers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTextAnswers(value);
    }

    const calculateHitRate = () => {
        const phraseTextAnswers = textAnswers.toLowerCase();
        const phraseTextToAadio = textToAadio.toLowerCase();

        const sentenceWithoutPunctuation =  (phrase: string) => phrase.replace(/[.,!?;:]/g, '');

        const phraseTextAnswersWords = phraseTextAnswers.split(" ");
        const phraseTextToAadioWords = phraseTextToAadio.split(" ");

        // Obtaining the number of hits considering the sentence score
        let correctsWithPunctuation = 0;
        phraseTextAnswersWords.forEach((word, index) => {
            if (phraseTextToAadioWords[index]  && phraseTextToAadioWords[index] === word){
                correctsWithPunctuation++;
            }
        });

        //Obtaining the number of correct answers without considering the sentence punctuation
        const phraseTextAnswersWordsNoPontuation = sentenceWithoutPunctuation(phraseTextAnswers).split(" ");
        const phraseTextToAadioWordsNoPontuation = sentenceWithoutPunctuation(phraseTextToAadio).split(" ");

        let correctsWithoutPunctuation = 0;
        phraseTextAnswersWordsNoPontuation.forEach((word, index) => {
            if(phraseTextToAadioWordsNoPontuation[index] && phraseTextToAadioWordsNoPontuation[index] === word){
                correctsWithoutPunctuation ++;
            }
        });


        const hitRateWithPontuation = (correctsWithPunctuation / phraseTextToAadioWords.length) * 100
        const hitRateWithoutPontuation = (correctsWithoutPunctuation / phraseTextToAadioWords.length) * 100

        setHitsWithPontuation(hitRateWithPontuation);
        setHitsWithoutPontuation(hitRateWithoutPontuation);

        handleColoResults(hitRateWithPontuation, hitRateWithoutPontuation);

    }

    const handleColoResults = (valueHitsWithPont: number, valueHitsWithoutPont: number) => {
        const colors = [
            "#990000", "#B31B00", "#CC3300", "#E64D00", "#FF6600", 
            "#CCA300", "#99CC00", "#66B300", "#339900", "#008000"
        ];
        let value = valueHitsWithPont / 10;
        let valueNo = valueHitsWithoutPont / 10;
        console.log(value);
        console.log(valueNo);

        setColorHitsWithPont(value > 0 ? colors[value-1] : colors[0])
        setColorHitsWithoutPont(valueNo > 0 ? colors[valueNo-1]: colors[0]);
    }

    return (
        <main>
            <div className="header_home">
                <h3>Exercícios pendentes</h3>
                <a className="add_icon">
                    <IoMdAddCircle size={30}/>
                </a>
            </div>
            
            <div className="container_home">
                <div className="container_exerciser">
                    <div className="controls_audio">
                        { speechStatus === "started"
                            ?
                                <div className="play_pause" onClick={stop}>
                                        <IoStopCircle size={34} />
                                </div> 
                            :
                                <div className="play_pause" onClick={start}>
                                    <HiSpeakerWave size={34} />
                                </div>
                        }
                    </div>

                    <div className="containser_answers">
                        { !answered &&
                            <TextInput 
                                label='Sua resposta' 
                                value={textAnswers}
                                onChange={onChageTextAnswers}
                                type='text'
                                error={false}
                                placeholder='Transcreva o que você ouvio no áudio...'
                            />
                        }
                        
                        { answered &&
                            <>
                                <div className='ansewrs'>
                                    <b>Texto correto:</b> <Text />
                                </div>
                                <div className='ansewrs'>
                                    <b>Sua resposta:</b> { textAnswers }
                                </div>

                                <div className="divider"></div>

                                <div className="results">
                                    <div className="header_result">
                                        <span>Taxas de acerto</span>
                                    </div>
                                    <div className="datas_result">
                                        Considarando a pontuação:
                                        <span style={{color: colorHitsWithPont}}> { hitsWithPontuation }%</span>
                                    </div>
                                    <div className="datas_result">
                                        Desconsidarando a pontuação: 
                                        <span style={{color: colorHitsWithoutPont}}> { hitsWithoutPontuation }%</span> 
                                    </div>
                                </div>
                            </>
                        }
                        { !answered &&
                            <div className="button_answers">
                                <Button 
                                    children="Responder"
                                    onClick={toRespond}
                                 />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;
