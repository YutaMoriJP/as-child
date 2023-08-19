import { Button } from "./button";

export const App = () => {
  return (
    <>
      <Button>Normal Button.</Button>

      <Button asChild>
        <a href="#">Link Button</a>
      </Button>
    </>
  );
};
