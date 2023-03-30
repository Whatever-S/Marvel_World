import { useState, useEffect } from 'react';
import './charInfo.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = ({charId}) => {
    const [character, setCharacter] = useState(null),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(false);

    const marvelService = new MarvelService();
    
    useEffect(()=>{
        updateChar()
    },[charId])

    const updateChar = () => {
        if(!charId){return}

        onCharLoading();

        marvelService.getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError)
    }
    
    const onCharLoaded = (char) => {
        setCharacter(char)
        setLoading(false)
    }
    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () =>{
        setLoading(false)
        setError(true)
    }

        const skeleton = character || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !character) ? <View char={character}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
}
const View =({char})=>{
    const {thumbnail, name, homepage, description, wiki, comics} = char;
    let imgStyle = {'objectFit': 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit': 'contain'}
    }
    return(
        <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
                {comics.length > 0 ? null: 'There is no comics with this character'}
                <ul className="char__comics-list">
                    {
                        comics.slice(0, 9).map((item, i)=>{
                            return(
                            <li key={i} className="char__comics-item">
                                    {item.name}
                            </li>
                            )
                        })
                    }
                    <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    
                </ul>
        </>
    )
}

export default CharInfo;