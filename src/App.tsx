import './App.css'
import { useState, useRef, useEffect } from 'react';

const colorNames = ['black', 'blue', 'fuchsia', 'gray', 'green', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'yellow']

const getPercentage = (containerWidth: number, distanceMoved: number) => {
    return (distanceMoved / containerWidth) * 100;
};

const limitNumberWithinRange = (
    value: number,
    min: number,
    max: number
): number => {
    return Math.min(Math.max(value, min), max);
};

const nearestN = (N: number, number: number) => Math.ceil(number / N) * N;
interface TagSectionProps {
    color: string;
    width: number;
    maxWidth: number;
    onSliderSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface ColumnTagSectionProps {
    color: string;
    height: number;
    minHeight: number;
    onSliderSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const TagSection = ({
    color,
    width,
    maxWidth,
    onSliderSelect }: TagSectionProps) => {
        return (
            <div
                className="tag"
                style={{
                    ...styles.tag,
                        background: color,
                        width: width + "%"
                }}
            >
                <span style={{ ...styles.tagText, fontSize: 20 }}>{Math.round(width / maxWidth)}</span>

                <div
                    style={styles.sliderButton}
                    onPointerDown={onSliderSelect}
                    className="slider-button"
                >
                    {
                        //<img src={"https://assets.codepen.io/576444/slider-arrows.svg"} height={"30%"} />
                    }
                </div>
            </div>
        );
    };

const ColumnTagSection = ({
    color,
    height,
    minHeight,
    onSliderSelect }: ColumnTagSectionProps) => {

        return (
            <div
                className="tag"
                style={{
                    ...styles.columnTag,
                        background: color,
                        height: height + "%",
                        display: 'flex',
                        flexDirection: 'column'
                }}
            >
                <span style={{ ...styles.tagText, fontSize: 20 }}>{Math.round(height / minHeight)}</span>

                <div
                    style={styles.columnSliderButton}
                    onPointerDown={onSliderSelect}
                    className="slider-button"
                >
                    {
                        //<img src={"https://assets.codepen.io/576444/slider-arrows.svg"} height={"30%"} />
                    }
                </div>
            </div>
        );
    };

const ColumnTagSlider = ({ divCount }: { divCount: number }) => {
    const [heights, setHeights] = useState<number[]>(
        new Array(divCount).fill(100 / divCount)
    );

    useEffect(() => {
        const newHeights = new Array(divCount).fill(100 / divCount);
        setHeights(newHeights);
    }, [divCount])
    const TagSliderRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ width: '100%', height: '100%' }}>

            <div
                ref={TagSliderRef}
                style={{
                    width: "100%",
                        display: "flex",
                        backgroundColor:'transparent',
                        height: '100%',
                        flexDirection: 'column'
                }}
            >
                {heights.map((height, index) => (
                    <ColumnTagSection
                        height={height}
                        minHeight={Math.min(...heights)}
                        key={index}
                        //noSliderButton={index === tags.length - 1}
                        onSliderSelect={(e) => {
                            e.preventDefault();
                            document.body.style.cursor = "ew-resize";

                            const startDragY = e.pageY;
                            const sliderHeight = TagSliderRef?.current?.offsetHeight;

                            const resize = (e: MouseEvent & TouchEvent) => {
                                e.preventDefault();
                                const endDragY = e.touches ? e.touches[0].pageY : e.pageY;
                                const distanceMoved = endDragY - startDragY;
                                const maxPercent = heights[index] + heights[index + 1];

                                const percentageMoved = nearestN(1, getPercentage(sliderHeight, distanceMoved))
                                // const percentageMoved = getPercentage(sliderWidth, distanceMoved);

                                const _heights = heights.slice();

                                const prevPercentage = _heights[index];

                                const newPercentage = prevPercentage + percentageMoved;
                                const currentSectionHeight = limitNumberWithinRange(
                                newPercentage,
                                    0,
                                    maxPercent
                            );
                                _heights[index] = currentSectionHeight;

                                const nextSectionIndex = index + 1;

                                const nextSectionNewPercentage =
                                    _heights[nextSectionIndex] - percentageMoved;
                                const nextSectionHeight = limitNumberWithinRange(
                                nextSectionNewPercentage,
                                    0,
                                    maxPercent
                            );
                                _heights[nextSectionIndex] = nextSectionHeight;

                                {/*if (tags.length > 2) {
                                    if (_widths[index] === 0) {
                                        _widths[nextSectionIndex] = maxPercent;
                                        _widths.splice(index, 1);
                                        setTags(tags.filter((t, i) => i !== index));
                                        removeEventListener();
                                    }
                                    if (_widths[nextSectionIndex] === 0) {
                                        _widths[index] = maxPercent;
                                        _widths.splice(nextSectionIndex, 1);
                                        setTags(tags.filter((t, i) => i !== nextSectionIndex));
                                        removeEventListener();
                                    }
                                }*/}

                                setHeights(_heights);
                            };

                            window.addEventListener("pointermove", resize);
                            window.addEventListener("touchmove", resize);

                            const removeEventListener = () => {
                                window.removeEventListener("pointermove", resize);
                                window.removeEventListener("touchmove", resize);
                            };

                            const handleEventUp = (e: Event) => {
                                e.preventDefault();
                                document.body.style.cursor = "initial";
                                removeEventListener();
                            };

                            window.addEventListener("touchend", handleEventUp);
                            window.addEventListener("pointerup", handleEventUp);
                        }}
                        color={colorNames[index]}
                    />
                ))}
            </div>
        </div>
    );
};


const RowTagSlider = ({ divCount }: { divCount: number }) => {
    const [widths, setWidths] = useState<number[]>(
        new Array(divCount).fill(100 / divCount)
    );

    useEffect(() => {
        const newWidths = new Array(divCount).fill(100 / divCount);
        setWidths(newWidths);
    }, [divCount])
    const TagSliderRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ width: '100%', height: '100%' }}>

            <div
                ref={TagSliderRef}
                style={{
                    width: "100%",
                        display: "flex",
                        backgroundColor:'transparent',
                        height: '100%'
                }}
            >
                {widths.map((width, index) => (
                    <TagSection
                        width={width}
                        maxWidth={Math.max(...widths)}
                        key={index}
                        //noSliderButton={index === tags.length - 1}
                        onSliderSelect={(e) => {
                            e.preventDefault();
                            document.body.style.cursor = "ew-resize";

                            const startDragX = e.pageX;
                            const sliderWidth = TagSliderRef?.current?.offsetWidth;

                            const resize = (e: MouseEvent & TouchEvent) => {
                                e.preventDefault();
                                const endDragX = e.touches ? e.touches[0].pageX : e.pageX;
                                const distanceMoved = endDragX - startDragX;
                                const maxPercent = widths[index] + widths[index + 1];

                                const percentageMoved = nearestN(1, getPercentage(sliderWidth, distanceMoved))
                                // const percentageMoved = getPercentage(sliderWidth, distanceMoved);

                                const _widths = widths.slice();

                                const prevPercentage = _widths[index];

                                const newPercentage = prevPercentage + percentageMoved;
                                const currentSectionWidth = limitNumberWithinRange(
                                newPercentage,
                                    0,
                                    maxPercent
                            );
                                _widths[index] = currentSectionWidth;

                                const nextSectionIndex = index + 1;

                                const nextSectionNewPercentage =
                                    _widths[nextSectionIndex] - percentageMoved;
                                const nextSectionWidth = limitNumberWithinRange(
                                nextSectionNewPercentage,
                                    0,
                                    maxPercent
                            );
                                _widths[nextSectionIndex] = nextSectionWidth;

                                {/*if (tags.length > 2) {
                                    if (_widths[index] === 0) {
                                        _widths[nextSectionIndex] = maxPercent;
                                        _widths.splice(index, 1);
                                        setTags(tags.filter((t, i) => i !== index));
                                        removeEventListener();
                                    }
                                    if (_widths[nextSectionIndex] === 0) {
                                        _widths[index] = maxPercent;
                                        _widths.splice(nextSectionIndex, 1);
                                        setTags(tags.filter((t, i) => i !== nextSectionIndex));
                                        removeEventListener();
                                    }
                                }*/}

                                setWidths(_widths);
                            };

                            window.addEventListener("pointermove", resize);
                            window.addEventListener("touchmove", resize);

                            const removeEventListener = () => {
                                window.removeEventListener("pointermove", resize);
                                window.removeEventListener("touchmove", resize);
                            };

                            const handleEventUp = (e: Event) => {
                                e.preventDefault();
                                document.body.style.cursor = "initial";
                                removeEventListener();
                            };

                            window.addEventListener("touchend", handleEventUp);
                            window.addEventListener("pointerup", handleEventUp);
                        }}
                        color={colorNames[index]}
                    />
                ))}
            </div>
        </div>
    );
};

type StylesType = { [key: string]: React.CSSProperties };

const styles: StylesType = {
    tag: {
        padding: 20,
        textAlign: "center",
        position: "relative",
        borderRightWidth: ".1em",
        borderRightStyle: "solid",
        borderRightColor: "white",
        boxSizing: "border-box",
        borderLeftWidth: ".1em",
        borderLeftStyle: "solid",
        borderLeftColor: "white"
    },
    columnTag: {
        padding: 20,
        textAlign: "center",
        position: "relative",
        borderBottomWidth: ".1em",
        borderBottomStyle: "solid",
        borderBottomColor: "white",
        boxSizing: "border-box",
        borderTopWidth: ".1em",
        borderTopStyle: "solid",
        borderTopColor: "white"
    },
    tagText: {
        color: "white",
        fontWeight: 700,
        userSelect: "none",
        display: "block",
        overflow: "hidden",
        fontFamily: "serif"
    },
    sliderButton: {
        width: "0.3em",
        height: "4em",
        backgroundColor: "white",
        position: "absolute",
        //borderRadius: "2em",
        right: "calc(-0.2em)",
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        margin: "auto",
        zIndex: 10,
        cursor: "ew-resize",
        userSelect: "none"
    },
    columnSliderButton: {
        width: "4em",
        height: "0.3em",
        backgroundColor: "white",
        position: "absolute",
        //borderRadius: "2em",
        bottom: "calc(-0.2em)",
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        margin: "auto",
        zIndex: 10,
        cursor: "ew-resize",
        userSelect: "none"
    }
};

function App() {
    const [direction, setDirection] = useState<boolean>(false); // left is false, right is true
    const [divCount, setDivCount] = useState<number>(2);

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
                            { !direction 
                                ? 
                                    <RowTagSlider divCount={divCount} /> 
                                    : <ColumnTagSlider divCount={divCount} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
