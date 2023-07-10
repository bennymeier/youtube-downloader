import { Box, Stack, Skeleton, SimpleGrid } from '@chakra-ui/react';
export default function SuggestionsSkeleton() {
  return (
    <Box my="5">
      <SimpleGrid
        gridTemplateColumns="repeat(auto-fit, minmax(max(290px, 40%), 1fr))"
        spacing={10}
      >
        {[...Array(14)].map((_, index) => (
          <Stack key={index}>
            <Skeleton height="178px" />
            <Skeleton height="131px" />
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
