import { Button } from "../../../../components/Button/Button";
import classes from "./RightSidebar.module.scss";

export const RightSidebar = () => {
  return (
    <div className={classes.root}>
      <h3>Add to your feed</h3>

      <div className={classes.items}>
        <div className={classes.item}>
          <img
            src="https://i.pravator.cc/300"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.content}>
            <div className={classes.name}>Anis Doe</div>
            <div className={classes.title}>HR at Botify</div>
            <Button size="medium" outline className={classes.button}>
              + Follow
            </Button>
          </div>
        </div>
        <div className={classes.item}>
          <img
            src="https://i.pravator.cc/300"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.content}>
            <div className={classes.name}>Jana Corner</div>
            <div className={classes.title}>Software Engineer at BPNP</div>
            <Button size="medium" outline className={classes.button}>
              + Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
