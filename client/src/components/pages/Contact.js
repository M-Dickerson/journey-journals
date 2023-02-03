import { useState } from 'react';

export default function Contact() {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('form submitted');
        const response = await fetch('/api/email',
            {
                method: 'POST',
                body: JSON.stringify({ name, email, message }),
            });

        const body = response.json();
        console.log(body);
    }

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'message') {
            setMessage(inputValue)
        }
    };

    const handleOnBlur = (e) => {
        e.preventDefault();

        if (!message) {
            setErrorMessage('Message is required');
            return
        }

        setMessage('');
    };

    return (
        <div>
            <h2>Send a Message!</h2>
            <form>
                <div>
                    <label for='message'> Message </label>
                    <input
                        value={message}
                        name='message'
                        id='message'
                        onBlur={handleOnBlur}
                        onChange={handleInputChange}
                        rows={10}
                        cols={10}
                        placeholder='Message'
                    />
                </div>
                <button type='button' onClick={handleFormSubmit}>Submit</button>
            </form>
            {errorMessage && (
                <div>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    )
}