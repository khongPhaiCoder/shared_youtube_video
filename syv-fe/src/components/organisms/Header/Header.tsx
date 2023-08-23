import React, { useCallback, useEffect, useContext, useState } from "react";
import { HeaderProps } from "./Header.types";
import { Button, Container } from "@/components/atoms";
import Link from "next/link";
import {
  HeaderContainer,
  Logo,
  MenuButton,
  RouteContainer,
  Row,
} from "./Header.styled";
import { HeaderItem } from "@/components/molecules";
import { AuthContext } from "@/contexts/authContext";
import { ThemeContext } from "@/contexts/themeContext";
import { LangContext } from "@/contexts/langContext";
import { useI18n } from "next-localization";
import { LANG } from "@/constants";
import { useRouter } from "next/router";
import { ClickAwayListener } from "@mui/material";

const Header: React.FC<HeaderProps> = ({}) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { theme, themeToggle } = useContext(ThemeContext);
  const { lang, changeLang } = useContext(LangContext);
  const { t } = useI18n();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(true);

  const onChangeLangHandler = useCallback(() => {
    if (lang === "en") {
      changeLang("vi");
    } else {
      changeLang("en");
    }
  }, [lang, changeLang]);

  const onLogoutHandler = useCallback(() => {
    logout();
    router.push("/");
  }, []);

  const handleClick = useCallback(() => {
    setOpenMenu((openMenu) => !openMenu);
  }, []);

  const handleClickAway = useCallback(() => {
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <HeaderContainer>
        <Container
          width="80%"
          lgMaxWidth="1200px"
          xsMargin="0 auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Row>
            <Link href="/">
              <Logo>Share Youtube Video</Logo>
            </Link>
            <MenuButton>
              <Button type="button" onClick={handleClick}>
                Menu
              </Button>
            </MenuButton>
            {openMenu && (
              <RouteContainer>
                <Button onClick={themeToggle}>
                  {theme === "light" ? t(LANG.DARK) : t(LANG.LIGHT)}
                </Button>
                <Button onClick={onChangeLangHandler}>
                  {lang === "en" ? "VI" : "EN"}
                </Button>
                {!isLoggedIn && (
                  <HeaderItem link="/signup" title={t(LANG.SIGN_UP)} />
                )}
                {!isLoggedIn && (
                  <HeaderItem link="/login" title={t(LANG.LOG_IN)} />
                )}
                {isLoggedIn && (
                  <HeaderItem link="/dashboard" title={t(LANG.DASHBOARD)} />
                )}
                {isLoggedIn && (
                  <Button variant="text" onClick={onLogoutHandler}>
                    {t(LANG.LOG_OUT).toUpperCase()}
                  </Button>
                )}
              </RouteContainer>
            )}
          </Row>
        </Container>
      </HeaderContainer>
    </ClickAwayListener>
  );
};

export default Header;
