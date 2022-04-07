import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HopeProvider,
  Text,
  VStack,
} from "@hope-ui/solid";
import { Show } from "solid-js";
import useTranscribe from "./hooks/useTranscribe";
function App() {
  let fileInputRef = null;
  const { store, handleFileChange } = useTranscribe();
  return (
    <HopeProvider config={{ initialColorMode: "dark" }}>
      <Flex minH={"100vh"} direction="column" justifyContent={"center"}>
        <Container>
          <VStack spacing={"$6"}>
            <Heading
              fontSize={{ "@initial": "$4xl", "@sm": "$5xl" }}
              textAlign="center"
              maxW="$xl"
            >
              Transcribe Voice Using
              <Box as="span" color={"$primary10"}>
                {" "}
                Deepgram
              </Box>
            </Heading>

            <input
              type="file"
              name="file"
              id="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
            />
            <Button
              disabled={store.loading}
              loading={store.loading}
              onClick={() => fileInputRef.click()}
              size={"lg"}
              colorScheme="warning"
            >
              Select Local File
            </Button>
            <Show when={store.transcribe}>
              <Box bg={"$blackAlpha12"} p={"$6"} rounded="$xl">
                <Text fontSize={"$xl"}>
                  {store.transcribe}
                </Text>
              </Box>
            </Show>
          </VStack>
        </Container>
      </Flex>
    </HopeProvider>
  );
}

export default App;
