import React, { useEffect, useState, useRef } from "react";

import colors from '../colors'

const Auto = (props) => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    useEffect(() => {
        setOptions(colors);
    }, []);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };

    const updatePokeDex = poke => {
        setSearch(poke);
        setDisplay(false);
    };
    const functionHandler = (data) => {

        props.passChildData(data);

    }
    useEffect(() => {
        functionHandler(search)
    })

    return (
        <div ref={wrapperRef}>
            <input
                onClick={() => setDisplay(!display)}
                placeholder="Type to search"
                value={search}
                onChange={event => setSearch(event.target.value)}
            />
            {display && (
                <div className="autoContainer">
                    {options
                        .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
                        .map((value, i) => {
                            return (
                                <div
                                    onClick={() => updatePokeDex(value.name)}
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                >
                                    <span>{value.name}</span>
                                    <div style={{ backgroundColor: value.name, width: '20px', height: '20px' }} />
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};
export default Auto