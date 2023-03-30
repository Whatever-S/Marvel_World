import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/spinner';

const RandomChar= ()=>{
    const [character, setCharacter] = useState({}),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false)
    
    const marvelService = new MarvelService();

    const onCharLoaded = (char) => {
        setCharacter(char)
        setLoading(false)
    }

    const onError = () =>{
        setLoading(false)
        setError(true)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)+1011000);

        marvelService.getCharacter(id)
        .then(onCharLoaded)
        .catch(onError)
    }

    useEffect(() => {
        updateChar();
    }, [])

    const onRandomButtonClick = (e) => {
        updateChar();

    }
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={character}/>: null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
            
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={onRandomButtonClick} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const View = ({char}) => {
    const {thumbnail, name, homepage, description, wiki} = char;
    let imgStyle = {'objectFit': 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit': 'contain'}
    }

    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}
export default RandomChar;