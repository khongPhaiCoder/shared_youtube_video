import { Layout, LayoutProps, SignUpForm } from "@/components";
import { GetServerSideProps } from "next";
import { useMemo } from "react";

export default function SignUp() {
  const layoutProps: LayoutProps = useMemo(
    () => ({
      seoTitle: "Sign Up",
    }),
    []
  );

  return (
    <Layout {...layoutProps}>
      <SignUpForm />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const lan = locale ? locale : "en";

  const lngDict = await import(`../../public/lang/${lan}.json`);

  return {
    props: {
      lngDict: JSON.parse(JSON.stringify(lngDict)),
    },
  };
};
