import React from 'react';

const ListItem = (props) => {
    return (
        <div>
            <img src={props.image} alt=""/>
            <h4 style={{ margin: "5px" }}>{props.name}</h4>
        </div>
    )
}

export default ListItem;
