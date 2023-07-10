import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

function NothingFoundAlert() {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Nothing found!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Unfortunately, we could not find anything under your entered search
        term. Try again!
      </AlertDescription>
    </Alert>
  );
}

export default NothingFoundAlert;
