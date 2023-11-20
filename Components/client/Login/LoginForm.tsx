import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../Navigation";

function LoginForm() {
  const router = useRouter();

  // Step 1: Define state variables
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState({ memberId: "", password: "" });

  const login = async (authCredentials: { memberId: string; password: string }) => {
    // Step 2: Use the setLoading state
    setLoading(true);

    const { memberId, password } = authCredentials;
    const credentialLogin = await signIn("credentials", {
      memberId,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/client/my`,
      redirect: false,
    });

    // Step 3: Use the setMessage state
    setLoading(false);
    if (credentialLogin?.error) setMessage("Invalid details provided.");

    if (credentialLogin?.url) {
      router.push(credentialLogin?.url);
    }
  };

  return (
    <Box
      width={["88vw", "25em"]}
      display="flex"
      flexDirection={"column"}
      padding={5}
      bg="white"
      rounded={"md"}
      shadow="lg"
    >
      <form>
        <Header />
        <Text color="primary.900" align={"center"}>
          Know how your account is performing
        </Text>
        <VStack mt={7}>
          {/* ... existing code ... */}
          <FormControl>
            <Button
              bg="primary.900"
              color="white"
              mt={3}
              width="100%"
              onClick={() => login(credentials)}
              _hover={{ background: "primary.700" }}
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
          </FormControl>
          <Text>Or</Text>
          <FormControl color="black.600">
            <Button
              as="a"
              href="/client/my"
              borderColor="primary.900"
              color="primary.900"
              width="100%"
              borderWidth={"0.5px"}
              _hover={{
                background: "primary.900",
                color: "white",
                border: "none",
              }}
            >
              Continue to Client Dashboard
            </Button>
          </FormControl>
        </VStack>
      </form>
    </Box>
  );
}

export default LoginForm;
