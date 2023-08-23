import { Layout, LayoutProps } from "@/components";
import { LoginForm } from "@/components";
import { GetServerSideProps } from "next";
import { useMemo } from "react";

export default function Login() {
  const layoutProps: LayoutProps = useMemo(
    () => ({
      seoTitle: "Login",
    }),
    []
  );

  return (
    <Layout {...layoutProps}>
      <LoginForm />
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
