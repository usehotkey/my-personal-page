import React from 'react'
import styles from './Chat.css'
import { Button } from '../_blocks/Button'
import { sendMessage } from './sendMessage'

export class Chat extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            message: ''
        }
    }

    render() {
        const {isOpen} = this.state

        return (
            <div className={styles.fixedContainer}>
                {
                    isOpen
                        ? this.renderChat()
                        : <Button tertiary onClick={this.toggle}>Hire Me</Button>
                }
            </div>
        )
    }

    renderChat = () => {
        return (
            <div className={styles.chatContainer}>
                <div>Tell me what you want:</div>
                <textarea
                    rows={3}
                    className={styles.message}
                    onChange={this.changeMessage}
                    value={this.state.message}
                />
                <Button primary onClick={this.send}>Send!</Button>
            </div>
        )
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    send = () =>{
        sendMessage('Message from', this.state.message);
        this.toggle();
    }
}
