import { getUsers } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return { users: data || null, isLoading, error };
}
