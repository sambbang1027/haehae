import { useState, useEffect } from 'react';
import api from '../api/AxiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

    interface CursorPaginationProps<T> {
            path: string;
            initialCursor?: number | null;
            limit?: number;
    }
    
    const usePagination = <T>({ path, initialCursor = null, limit = 10 }: CursorPaginationProps<T>) => {
    const [data, setData] = useState<T[]>([]); 
    const [cursor, setCursor] = useState(initialCursor);
    const [loading, setLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
        const response = await api.get(`${path}`, {
            params: {
                cursor,
                limit,
            },
        });
        const result = response.data;

        setData(prev => [...prev, ...result.content]);
        setCursor(result.nextCursor);
        setHasNext(!!result.nextCursor);
        console.log(hasNext);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            setData([]);
            setHasNext(true);
            setCursor(null); 
            fetchData();
    }, [path]);

    const loadMore = () => {
        if (hasNext && !loading && !isFetching) {
            setIsFetching(true); // 중복 호출 방지
        fetchData().finally(() => {
            setIsFetching(false);
            });
        }
    };

    return { data, loadMore, loading, hasNext };
    };

export default usePagination;
