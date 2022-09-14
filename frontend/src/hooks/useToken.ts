import { useStorageState } from "react-use-storage-state";

export function useToken() {
  const [token, setToken] = useStorageState("token", "");
  return { token, setToken };
}

type Profile = { height: number; weight: number };

export function useProfile() {
  const [profile, setProfile] = useStorageState<Profile | null>(
    "profile",
    null
  );
  return { profile, setProfile };
}
