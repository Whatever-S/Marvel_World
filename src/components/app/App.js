import { Component } from "react/cjs/react.production.min";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoudary from "../errorBoundary/ErrorBoudary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    onCharSelected = (id) =>{
        this.setState({
            selectedChar: id
        })
    }

    state ={
        selectedChar: null
    }

    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoudary>
                        <RandomChar/>
                    </ErrorBoudary>
                    <div className="char__content">
                        <ErrorBoudary>
                        <CharList selectedChar={this.state.selectedChar} onCharSelected={this.onCharSelected}/>
                        </ErrorBoudary>
                        <ErrorBoudary>
                            <CharInfo charId ={this.state.selectedChar}/>
                        </ErrorBoudary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;