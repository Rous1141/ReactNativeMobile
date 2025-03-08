import { router } from "expo-router";

export default function Index() {
  const redirect = () =>{
    router.replace("./(tabs)")
  }
  return (
      redirect()
  );
}
