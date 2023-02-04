import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GET_EMAIL_USER } from '../utils/queries';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

export default function Contact({ recipientUsername }) {
    console.log(recipientUsername);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [getEmail, { loading, error, data }] = useLazyQuery(GET_EMAIL_USER);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (errorMessage) {
            return;
        } else {
            getEmail({ variables: { username: recipientUsername, message }, });
        }
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

    };

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Send a Message</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={5}
                        value={message}
                        name='message'
                        id='message'
                        onBlur={handleOnBlur}
                        onChange={handleInputChange}
                        placeholder='Message'
                    />
                </Form.Group>
            </Form>
            {errorMessage}
            <Button
                type='submit'
                variant='success'
                onClick={handleFormSubmit}
            >

                Send
            </Button>
        </>
    );
};
