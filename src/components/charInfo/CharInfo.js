import { Component } from 'react';
import './charInfo.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component{
    state = {
        character:null,
        loading: false,
        error: false
    }
    marvelService = new MarvelService();
    
    componentDidMount(){
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if(!charId){
            return
        }

        this.onCharLoading();

        this.marvelService.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    
    onCharLoaded = (char) => {
        this.setState({
            character : char,
            loading: false
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () =>{
        this.setState({
            error: true,
            loading: false
        })
    }

    render(){
        const {character, loading, error} = this.state;
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