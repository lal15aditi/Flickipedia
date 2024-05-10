import React, { useEffect, useRef, useState } from 'react'

import './style.scss';

function SwitchTabs({ data, onTabChange }) {
    const elm = useRef();

    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) => {
        setLeft(index*elm.current.offsetWidth);
        setSelectedTab(index);
        onTabChange(tab, index);
    }

    const observeWindow = () => {
        setTimeout(() => {
            if(elm.current){
                setLeft(selectedTab*elm.current.offsetWidth);
            }
            else{
                observeWindow();
            }
        }, 100);
    }

    useEffect(() => {
        window.addEventListener('resize', observeWindow)
    }, [selectedTab])

    return (
        <div className='switching-tabs'>
            <div className="tab-items">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tab-item ${
                            selectedTab === index ? 'active' : ''
                        }`}
                        onClick={() => activeTab(tab, index)}>
                        {tab}
                    </span>
                ))}
                <span ref={elm} className="moving-bg" style={{left}}/>
            </div>
        </div>
    )
}

export default SwitchTabs