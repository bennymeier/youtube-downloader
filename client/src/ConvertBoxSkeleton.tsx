import { Stack, Skeleton } from '@chakra-ui/react';

export default function ConvertBoxSkeleton() {
  return (
    <>
      <Stack mb="5" mt="5">
        <Skeleton height="28px" />
        <Skeleton height="28px" />
        <Skeleton height="28px" />
        <Skeleton height="28px" />
      </Stack>
    </>
  );
}
