import React, { Component } from 'react'

export class ContohPromise extends Component {
    state = {
        fullname: 'Text Here'
    }

    // getFirstName = (callback) => {
    //     setTimeout(() => {
    //         callback('Nikko ');
    //     }, 2000);
    // }

    // getLastName = (callback) => {
    //     setTimeout(() => {
    //         callback('Fe');
    //     }, 2000);
    // }

    // getFullName = () => {
    //     this.getFirstName((firstName) => {
    //         this.getLastName(lastName => {
    //             const first = firstName;
    //             const last = lastName;
    //             const name = first + last
    //             this.setState({
    //                 fullname: name
    //             })
    //         })
    //     })
    // }

    getFirstName = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Nikko ')
            }, 2000);
        })
    }

    // getLastName = () => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve('Fe')
    //         }, 2000);
    //     })
    // }

    getFullName = async () => {
        // const first = await this.getFirstName();
        // const last = await this.getLastName();
        // const name = first + last
        // this.setState({
        //     fullname: name
        // })

        // Promise.all(([this.getFirstName(), this.getLastName()])).then(([firstName, lastName]) => {
        //     const name = firstName + lastName
        //     this.setState({
        //         fullname: name
        //     })
        // })

        this.getFirstName().then(firstName => {
            return this.getLastName(firstName)
        }).then(fullName => {
            this.setState({
                fullname: fullName
            })
        })
    }

    getLastName = (firstName) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(firstName + 'Fe')
            }, 2000);
        })
    }

    render() {
        return (
            <center>
                <h1>Contoh Promise, async await</h1>
                <br />
                <br />
                <div>
                    <h3>{this.state.fullname}</h3>
                    <button onClick={this.getFullName}>Sumbit</button>
                </div>
            </center>
        )
    }
}

export default ContohPromise
