import fetcher from "@/libs/fetcher";
import useSWR, { SWRConfiguration, KeyedMutator } from "swr";

interface DiscoveryMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type Responses = {
  page: number;
  total_pages: number;
  total_results: number;
  results: DiscoveryMovie[];
};

type Payload = {
  page: number;
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
};

export function useGetDiscoveryMovie(
  payload?: Payload | null,
  options?: SWRConfiguration
): {
  data?: Responses;
  error?: Error;
  isLoading: boolean;
  mutate: KeyedMutator<Responses>;
} {
  const urlPath = "api/discover/movie";
  const key = payload ? [urlPath, payload] : urlPath;

  const { data, error, isValidating, mutate } = useSWR<Responses>(
    key,
    async (url: string) => {
      return await fetcher<Payload, Responses>({
        url: url,
        method: "GET",
        payload: payload!,
      });
    },
    options
  );

  return {
    data,
    error,
    isLoading: !error && (data === undefined || isValidating),
    mutate,
  };
}
