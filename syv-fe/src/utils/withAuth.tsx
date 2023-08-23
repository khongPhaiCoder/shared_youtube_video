import { Container } from "@/components";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { ComponentType, FC, useContext, useEffect } from "react";

const withAuth = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent: FC<P> = (props) => {
    const router = useRouter();
    const { isLoggedIn } = useContext(AuthContext);

    // Check if the user is authenticated
    const isAuthenticated = isLoggedIn;

    useEffect(() => {
      // If not authenticated, redirect to the login page
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated]);

    // Render the protected page if authenticated, or a loading indicator
    return isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <Container
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Loading...
      </Container>
    );
  };

  return AuthenticatedComponent;
};

export default withAuth;
