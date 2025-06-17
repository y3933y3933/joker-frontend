import { useState } from "react";

type ApiRequestOptions<TArgs, TData> = {
  requestFn: (args: TArgs) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

export function useApiRequest<TArgs, TData>(
  options: ApiRequestOptions<TArgs, TData>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<TData | null>(null);

  const execute = async (args: TArgs) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await options.requestFn(args);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      options.onError?.(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
    execute,
  };
}
