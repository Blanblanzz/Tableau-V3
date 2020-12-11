import React from 'react'


class AppPHP extends React.Component {
    onClick() { 
        fetch("http://localhost/ping-pong.php")
            .then(res => res.json()) 
            .then((result) => { console.log(result); }) 
    }

    render() { 
        return ( 
            <button onClick={this.onClick} >Bonjjour</button> 
        ); 
    } 
}

export default AppPHP