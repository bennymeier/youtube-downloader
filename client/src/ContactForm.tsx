import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Select,
    Textarea,
    Box,
    useToast,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { sendContactForm } from './utils/API';

function ContactForm({ handleClose }: { handleClose: () => void }) {
    const [email, setEmail] = useState('');
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');
    const toast = useToast();

    const reset = () => {
        setEmail("");
        setIssueType("");
        setDescription("");
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = { email, issueType, description };
            await sendContactForm(formData);
            toast({ status: "success", title: "Contact form successfully send.", isClosable: true })
            handleClose();
            setTimeout(() => {
                reset();
            }, 1000);
        } catch (error) {
            console.error('Failed to send form:', error);
            toast({ status: "error", title: "Contact form could not be send.", isClosable: true })
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired mb={4}>
                    <FormLabel htmlFor='email'>Mail</FormLabel>
                    <Input id='email' name="email" type='email' placeholder='Your mail' onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl isRequired mb={4}>
                    <FormLabel htmlFor='issueType'>Contact Type</FormLabel>
                    <Select id='issueType' name="issueType" placeholder='Your contact type' onChange={(e) => setIssueType(e.target.value)}>
                        <option value='Issue'>Issue</option>
                        <option value='Feature'>Feature</option>
                        <option value='Accessibility'>Accessibility</option>
                        <option value='Other'>Other</option>
                    </Select>
                </FormControl>

                <FormControl isRequired mb={4}>
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Textarea id='description' name="description" placeholder='Describe your problem, your feature or something else...' onChange={(e) => setDescription(e.target.value)} />
                </FormControl>

                <Button type='submit' colorScheme='blue'>Senden</Button>
            </form>
        </Box>
    );
}

export default ContactForm;
