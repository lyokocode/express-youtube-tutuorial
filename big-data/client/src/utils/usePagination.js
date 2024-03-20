import useFetch from '../hooks/useFetch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const usePagination = (defaultPageSize, apiUrl) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const countUrl = `http://localhost:5000/api/${apiUrl}`;
    const { data: count } = useFetch(countUrl);
    const totalCount = count || 0;

    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || defaultPageSize;

    const totalPages = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);

    const handlePageChange = (newPage) => {
        searchParams.set('page', newPage);
        searchParams.set('pageSize', pageSize);
        navigate(`?${searchParams.toString()}`);
    };

    const paginationData = useMemo(() => ({
        page,
        pageSize,
        totalPages,
        handlePageChange,
    }), [page, pageSize, totalPages, handlePageChange]);

    return paginationData;
    // return { page, pageSize, handlePageChange, totalPages };
};