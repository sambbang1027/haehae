
    export interface PaginationState<T> {
        data: T[];
        cursor: number | null;
        loading: boolean;
        hasNext: boolean;
        error: Error | null;
    }

    export type PaginationAction<T> =
        | { type: 'FETCH_START' }
        | { type: 'FETCH_SUCCESS'; payload: { data: T[]; nextCursor: number | null } }
        | { type: 'FETCH_ERROR'; error: Error }
        | { type: 'RESET' };

    export function paginationReducer<T extends { id: number }>(
        state: PaginationState<T>,
        action: PaginationAction<T>
        ): PaginationState<T> {
        switch (action.type) {
            case 'FETCH_START':
            return { ...state, loading: true, error: null };
            case 'FETCH_SUCCESS': {
            const combined = [...state.data, ...action.payload.data];
            const unique = combined.filter(
                (item, index, self) => index === self.findIndex(t => t.id === item.id)
            );
            return {
                ...state,
                loading: false,
                data: unique,
                cursor: action.payload.nextCursor,
                hasNext: !!action.payload.nextCursor,
            };
            }
            case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.error };
            case 'RESET':
            return { data: [], cursor: null, loading: false, hasNext: true, error: null };
            default:
            return state;
    }
}
