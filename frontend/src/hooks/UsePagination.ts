import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import api from '../api/AxiosInstance';

    interface PaginationResponseData<T> {
        content: T[];
        nextCursor: number | null;
    }

    interface UsePaginationProps<T> {
        path: string;
        params?: Record<string, any>;
        limit?: number;
        enabled?: boolean;
    }

    function usePagination<T>({
        path,
        params = {},
        limit = 10,
        enabled = true,
    }: UsePaginationProps<T>) {
        const queryResultArrayData =  useInfiniteQuery<PaginationResponseData<T>>({
            queryKey: ['pagination', path, params, limit],
            queryFn: async ({ pageParam = null }: QueryFunctionContext) => {
            const res = await api.get(path, {
                params: { ...params, cursor: pageParam, limit },
            });
            return res.data;
            },
            getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
            initialPageParam: null, 
            enabled,
            staleTime: 1000 * 60 * 5,
        });
        
        const items =
            queryResultArrayData.data?.pages.flatMap((page) => page.content) ?? [];
            
        return {
            ...queryResultArrayData,     
            items, // 추가된 부분
        };
    }


export default usePagination;
