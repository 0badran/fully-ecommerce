import { getUsers } from "@/server-functions/users";
import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return { users: data || null, isLoading, error };
}
