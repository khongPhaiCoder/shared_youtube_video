import Router from "next/router"

export const changeLanguage = (locale: string): void => {
  Router.push(
    { query: Router.query, pathname: Router.pathname },
    { query: Router.query, pathname: Router.pathname },
    { locale }
  )
}
