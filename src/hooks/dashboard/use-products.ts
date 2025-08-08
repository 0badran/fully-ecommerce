import { getProducts } from "@/server-functions/products";
import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products: data || [], isLoading, error };
}
