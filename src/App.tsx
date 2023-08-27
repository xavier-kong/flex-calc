import './App.css'
import { useState } from 'react';
import LeftRightToggle from './components/LeftRightToggle';

function App() {
    const [direction, setDirection] = useState<'row' | 'col'>('row');


    return (
        <>
            <div className="main">
                <div className="title-container">
                    <p className="title">Flex Ratio Calculator</p>
                </div>
                <div className="toolbar">
                    <div className="toggle-container" style={{ justifyContent: 'left'}}>
                        <div className="toggle-circle" />
                    </div>
                </div>
                <div className="box-container">
                    {
                        direction === 'row'
                            ? <div className="row-div"></div>
                            : <div className="col-div"></div>
                    }
                </div>
            </div>
        </>
    )
}

export default App
