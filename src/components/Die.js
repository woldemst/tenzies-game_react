import React from "react";

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'
    }

    return(
        <>
            <div onClick={props.holdDice} className="die" style={styles}>
                <h2 className="die-num" >{props.value}</h2>
            </div>
        </>
    )
}