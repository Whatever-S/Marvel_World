

class MarvelService {

    _apiBase ='https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=c7b8afeda20f2a6fce245f778e3ceb1a';
    _baseOffset = 210
    getResource = async(url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) =>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) =>{
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        let {description} = character;
        if (!description){
            description = 'There is no info about this character :('
        } else if (description.length > 210){
            description = description.slice(0,210) +'...'
        }
        return {
            name: character.name,
            description: description,
            thumbnail: character.thumbnail.path + `.`+ character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            id: character.id,
            comics: character.comics.items
        }
    }
}

export default MarvelService