import Button from "@mui/material/Button";
const SignupBtn = () => {
  return (
    <>
      <Button
        variant="outlined"
        size="large"
        sx={{
          color: "White",
          borderColor: "White",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
        href="signin"
      >
        Signin
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{ color: "White", fontWeight: "bold", fontSize: "1rem" }}
        href="/signup"
      >
        SignUp
      </Button>
    </>
  );
};

export default SignupBtn;
