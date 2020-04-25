export type ActionObject<T, K> = { type: K; payload?: T | any }

export enum DataFetchActions {
	FETCH_INIT = "FETCH_INIT",
	FETCH_SUCCESS = "FETCH_SUCCESS",
	FETCH_FAILURE = "FETCH_FAILURE",
	CLEAR_ERROR = "CLEAR_ERROR",
	CLEAR_DATA = "CLEAR_CORDS",
}

export const dataFetchReducer = <T, N>(
	state: T,
	action: ActionObject<N, DataFetchActions>
): T => {
	switch (action.type) {
		case DataFetchActions.FETCH_INIT:
			return {
				...state,
				isLoading: true,
				isError: false,
			}
		case DataFetchActions.FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			}
		case DataFetchActions.FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case DataFetchActions.CLEAR_ERROR:
			return {
				...state,
				isLoading: false,
				isError: false,
			}
		case DataFetchActions.CLEAR_DATA:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: "",
			}
		default:
			throw new Error()
	}
}
