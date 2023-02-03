import { useState } from 'react';
import { Form, Button } from 'react';

export default function Contact() {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('form submitted');
        const response = await fetch('/api/email',
            {
                method: 'POST',
                body: JSON.stringify({ message }),
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
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        value={message}
                        name='message'
                        id='message'
                        onBlur={handleOnBlur}
                        onChange={handleInputChange}
                        rows={10}
                        cols={10}
                        placeholder='Message'
                    />
                </Form.Group>
            </Form>
            <Button
                type='submit'
                variant='success'>
                Submit
            </Button>
        </>
    );
};


