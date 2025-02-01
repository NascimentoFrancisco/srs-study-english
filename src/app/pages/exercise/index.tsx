import { useState } from 'react';
import './style.css';
import { IoStopCircle } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa";
import { useSpeech } from "react-text-to-speech";
import { useVoiceToText } from "react-speakup";
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

type Props = {
    textToAadio: string,
    haandleExercisesUpdate: () => void,
}

function Exercise({textToAadio, haandleExercisesUpdate }: Props){
    const [textAnswers, setTextAnswers] = useState("");
    const [answered, setAnswered] = useState(false);
    const [hitsWithPontuation, setHitsWithPontuation] = useState(0);
    const [hitsWithoutPontuation, setHitsWithoutPontuation] = useState(0);
    const [colorHitsWithPont, setColorHitsWithPont] = useState("#344055");
    const [colorHitsWithoutPont, setColorHitsWithoutPont] = useState("#344055");
    const [exercisePronunciation, setExercisePronunciation] = useState(false);
    const [statusTextToVoice, setStatusTextToVoice] = useState(false);
    const [counterExercisePronuciation, setCounterExercisePronuciation ] = useState(3);

    const [averageRateVoiceExercise, SetAverageRateVoiceExercise] = useState(Array<number>);

    const { Text, speechStatus, start, stop, } = useSpeech({text: textToAadio, lang: "en"});
    const { startListening, stopListening, transcript, reset } = useVoiceToText({
        continuous: true,
        lang: "en-US",
    });

    const toRespond = () => {
        if (textAnswers && !answered){
            calculateHitRate();
            setAnswered(true);
        }
    }

    const onChageTextAnswers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextAnswers(value);
    }

    const sentenceWithoutPunctuation =  (phrase: string) => phrase.replace(/[.,!?;:]/g, '');

    const calculateHitRate = () => {
        const phraseTextAnswers =  textAnswers.toLowerCase();
        const phraseTextToAadio = textToAadio.toLowerCase();

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

    const calculateVoiceSuccess = () => {
        const textVoiveByUser =  transcript.toLowerCase();
        const textTextToAadio = textToAadio.toLowerCase();
        
        const phraseVoiveByUser = textVoiveByUser.split(" ").filter(item => item.trim() !== "");
        const phraseTextToAadio = sentenceWithoutPunctuation(textTextToAadio).split(" ");

        let countWordsCorrects = 0;
        phraseVoiveByUser.forEach((word, index) => {
            if (phraseTextToAadio[index] && phraseTextToAadio[index] == word){
                countWordsCorrects++;
            }
        });
        let avargeOld = averageRateVoiceExercise;
        const hitPercentage = (countWordsCorrects / phraseTextToAadio.length) * 100
        avargeOld.push(hitPercentage)

        SetAverageRateVoiceExercise(avargeOld);
        let oldCounter = counterExercisePronuciation;
        setCounterExercisePronuciation(oldCounter - 1);
        
    }

    const handleStatusVoiceToText = () => {

        if(statusTextToVoice && transcript){
            calculateVoiceSuccess();
            setStatusTextToVoice(false);
            return stopListening();
        }

        if(!statusTextToVoice && !transcript){
            setStatusTextToVoice(true);
            return startListening();
        }
    }

    const handleExerciseAgain = () => {
        if (transcript){
            setStatusTextToVoice(false);
            return reset();
        }
        return;
    }

    const handleFinishExercise = () => {
        //const avarge = averageRateVoiceExercise.reduce((accumulator, value) => accumulator + value, 0) / 3;
        //const avargeTotal = (avarge + hitsWithPontuation + hitsWithoutPontuation) / 3;

        //const levels = ["easy", "moderate", "reasonable", "difficult", "very_difficult"];
        //const index = Math.min(4, Math.floor((100 - avargeTotal) / 20));
        
        //const data = {"difficult": levels[index]}
        //Create requeste to send data

        haandleExercisesUpdate();
    }

    return (

        <div className="container_exerciser">
            { exercisePronunciation &&
                <div className="header_result">
                    {counterExercisePronuciation > 0 
                        ? 
                            <span>Você deve exercitar a pronúcia {counterExercisePronuciation} vezes</span>
                        :
                            <span>Parabéns, clique em finalizar para fazer o próximo exercício.</span>
                    }
                </div>
            }
                
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

                { exercisePronunciation &&

                    <div className="container_pronunciation">
                        <div className="header_pronuciation">
                            <Text />
                        </div>
                        <div className="divider"></div>
                        <div className="speak_pronunciation">
                            { averageRateVoiceExercise.length < 3
                                ?
                                    <div className="play_pause" onClick={handleStatusVoiceToText}>
                                        { statusTextToVoice 
                                            ?
                                                <IoStopCircle  size={34} />
                                            :
                                                <FaMicrophone  size={34} />
                                        }
                                    </div>
                                :   
                                <>
                                    <div className="header_result">
                                        <span>Exercício finalizado</span>
                                    </div>
                                    <Button
                                        children="Finalizar"
                                        onClick={handleFinishExercise}
                                    />
                                </>
                            }
                        </div>
                        { averageRateVoiceExercise.length < 3 &&
                            <div className="header_pronuciation">
                            {transcript}
                        </div>
                    }
                    
                    { transcript && averageRateVoiceExercise.length < 3 && 
                        <div className="button_pronunciation">
                            <Button
                                children="Exercitar novamente"
                                onClick={handleExerciseAgain}
                             />
                        </div>
                    }            
                </div>

            }

            { !exercisePronunciation &&
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
                { answered 
                    ?
                    <div className="button_answers">
                        <Button 
                            children="Exercitar pronuncia"
                            onClick={() => setExercisePronunciation(true)}
                         />
                    </div>
                    :
                    <div className="button_answers">
                        <Button 
                            children="Responder"
                            onClick={toRespond}
                         />
                    </div>
                }

            </div> 
            }
        </div>
    );
}

export default Exercise;
