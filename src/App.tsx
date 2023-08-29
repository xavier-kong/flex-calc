import './App.css'
import { useState } from 'react';

function App() {
    const [direction, setDirection] = useState<boolean>(false); // left is false, right is true
    const [divCount, setDivCount] = useState<number>(1);

    const handleDivCount = (offset: number) => {
        const currCount = divCount;
        let processedDivCount = currCount + (offset);
        if (processedDivCount <= 2) { processedDivCount = 2; }
        if (processedDivCount >= 10) { processedDivCount = 10; }
        setDivCount(processedDivCount);
    }

    return (
        <>
            <div className="main flex-col-centered">
                <div>
                    <p className="title">Flex Ratio Calculator</p>
                </div>
                <div className={!direction ? "flex-col-centered" : "flex-row-centered"} style={{ rowGap: 10, columnGap: 10 }}>
                    <div className="flex-row-centered toolbar">
                        <div className="flex-col-centered">
                            <div className="flex-col-centered">
                                <p className="tool-header-text">Flex Direction</p>
                            </div>
                            <div className="flex-row-centered">
                                <div className="flex-1" style={{ textAlign: 'right' }}>
                                    <p className="toggle-label">Row</p>
                                </div>
                                <div className="toggle-button-container flex-row-centered" onClick={() => setDirection(!direction)}>
                                    <div className={`toggle-circle ${!direction ? 'slideLeft' : 'slideRight'}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="toggle-label">Column</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-col-centered">
                            <div className="flex-col-centered">
                                <p className="tool-header-text">Div Count</p>
                            </div>
                            <div className="tool-body flex-row-centered">
                                <div className="count-button" onClick={() => handleDivCount(-1)}>
                                    <p>-</p>
                                </div>
                                <div className="flex-col-centered" style={{ width: 40, textAlign: 'center' }}>
                                    {divCount}
                                </div>
                                <div className="count-button" onClick={() => handleDivCount(1)}>
                                    <p>+</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="box-container flex-1">
                        <div className={!direction ? 'row-div' : 'col-div'}>
                            {
                                [...Array(divCount)].map(() => <div style={{ flex: 1, border: '1px solid black', resize: 'horizontal'}}></div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
