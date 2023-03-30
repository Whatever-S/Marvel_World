import {useEffect, useState} from 'react'; 
import Spinner from '../spinner/spinner'; 
import ErrorMessage from '../errorMessage/ErrorMessage'; 
import MarvelService from '../../services/MarvelService'; 
import PropTypes from 'prop-types'; 
import './charList.scss'; 

const CharList = ({selectedChar, onCharSelected}) => { 

    const [charList, setCharList] = useState([]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false),
        [newCharLoading, setNewCharLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false)
    
    const marvelService = new MarvelService(); 

    useEffect(()=>{
        onRequest()
    },[])
    
    const onRequest = (offset) =>{ 
        onCharListLoading(); 
        marvelService.getAllCharacters(offset) 
            .then(onCharListLoaded) 
            .catch(onError) 
    } 

    const onCharListLoading = () => { 
        setNewCharLoading(true)
    } 

    const onCharListLoaded = (newCharList) => { 
        let ended = false 
        if (newCharList.length < 9) 
            ended = true 

        setCharEnded(ended)
        setCharList(charList => [...charList, ...newCharList])
        setLoading(false)
        setNewCharLoading(false)
        setOffset((offset)=>offset + 9)
    } 

    const onError = () => { 
        setLoading(true)
        setError(true)
    } 

    const renderItems = (arr)=> { 
        const items =  arr.map((item) => { 
            let imgStyle = {'objectFit' : 'cover'}

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') { 
                imgStyle = {'objectFit' : 'unset'}; 
            } 

            return ( 
                <li  
                    className={selectedChar !== item.id ? "char__item" : "char__item char__item_selected"} 
                    key={item.id} 
                    onClick={()=>{onCharSelected(item.id)}}> 
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/> 
                        <div className="char__name">{item.name}</div> 
                </li> 
            ) 
        }); 
        return ( 
            <ul className="char__grid"> 
                {items} 
            </ul> 
        ) 
    } 
    
        
        const items = renderItems(charList); 

        const errorMessage = error ? <ErrorMessage/> : null; 
        const spinner = loading ? <Spinner/> : null; 
        const content = !(loading || error) ? items : null; 

        return ( 
            <div className="char__list"> 
                {errorMessage} 
                {spinner} 
                {content} 
                <button className="button button__main button__long" 
                disabled={newCharLoading} 
                style={{'display': charEnded ? 'none': 'block'}} 
                onClick={()=>onRequest(offset)}> 
                    <div className="inner">load more</div> 
                </button> 
            </div> 
        ) 
} 

CharList.propTypes ={ 
    onCharSelected: PropTypes.func.isRequired 
} 

export default CharList;