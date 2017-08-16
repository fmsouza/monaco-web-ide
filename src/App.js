import React from 'react';
import { Provider } from 'mobx-react';
import * as stores from 'common/stores';
import Editor from './components/editor';
import Header from './components/header';
import Sidebar from './components/sidebar';
import StatusBar from './components/statusBar';
import './App.css';
import src from './mock';

export default class App extends React.Component {

    state = { body : { width: 0, height: 0 } };

    updateDimensions() {
        const width = window.innerWidth;
        const height = window.innerHeight - 40;
        this.setState({ body: { width, height } });
    }

    componentWillMount() {
        window.addEventListener('resize', () => this.updateDimensions());
        this.updateDimensions();
        setImmediate(() => {
            this.refs.editor.view({
                name: 'App.js',
                language: 'javascript',
                src
            });
            this.refs.editor.view({
                name: 'App.test.js',
                language: 'javascript',
                src
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

    render() {
        const { body: { width, height } } = this.state;
        return (
            <Provider {...stores}>        
                <div className="App">
                    <Header />
                    <div className="body" style={{ width, height }}>
                        <Sidebar />
                        <Editor ref="editor" />
                    </div>
                    <StatusBar />
                </div>
            </Provider>
        );
    }
}