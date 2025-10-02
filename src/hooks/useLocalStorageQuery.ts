
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
export function useLocalStorageQuery<T>(key: string, defaultValue: T) {
  const queryClient = useQueryClient();

  const query = useQuery<T>({
    queryKey: [key],
    queryFn: () => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    },
  });

  const mutation = useMutation<T, unknown, T>({
    mutationFn: async (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  return { ...query, setValue: mutation.mutate as (value: any) => void };
}
