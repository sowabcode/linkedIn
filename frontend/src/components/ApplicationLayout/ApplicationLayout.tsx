import { Outlet } from "react-router-dom";
import classes from "./ApplicationLayout.module.scss";
import { Header } from "../Header/Header";

export const ApplicationLayout = () => {
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.container}>
        <Outlet />
      </main>
    </div>
  );
};
